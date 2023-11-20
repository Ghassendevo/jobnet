const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const User = require('./models/User');
const Job = require('./models/Job');
const { Server } = require('socket.io')
const Notification = require("./models/Notification")
const Bid = require('./models/Bid');
const server = http.createServer(app);
const fs = require("fs")
const multer = require("multer")
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb+srv://ghassen:ghassen@cluster0.albi7.mongodb.net/khademni?retryWrites=true&w=majority').then(res => {
    console.log('connected to khademni database ')
})

function generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000);
}
const AWS = require('aws-sdk');
const sns = new AWS.SNS({
    accessKeyId: 'AKIAQ4UPHVVNTVP5JJ7E',
    secretAccessKey: 'fGq224wi+orITjM92D1+jxlDFwMOWXEmL4IuUFBh',
    region: 'us-east-1', // Change this to your desired AWS region
});
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})


AWS.config.update({
    accessKeyId: 'AKIAQ4UPHVVNTVP5JJ7E',
    secretAccessKey: 'fGq224wi+orITjM92D1+jxlDFwMOWXEmL4IuUFBh',
    region: 'us-east-1', // Change this to your desired AWS region
})
const autousername = (fullname) => {
    const nickname = fullname.split(' ')[0];

    const randomNumbers = Math.floor(Math.random() * 100);

    const autoUsername = `${nickname}${randomNumbers}`;

    return autoUsername

}
io.on('connection', (socket) => {
    socket.on('send_notification', (data) => {
        let newdata = {...data, viewed: false }
        io.emit("receive_notification", newdata);
        const notification = new Notification(newdata)
        notification.save();
    })
})
app.post('/sign', async(req, res) => {
    const data = req.body.data;
    let username = autousername(req.body.data.fullname)
    const user = new User({
        fullname: data.fullname,
        username: username,
        password: data.password,
        phone: data.phonenumber,
        email: data.email,
        img: 'none',
    })
    await user.save().then(succ => {
        res.status(200).json({ user: succ })

    }).catch(err => {
        res.status(400).json({ msg: "sign in failed" + err })
    })
})
app.post("/verifyemail", async(req, res) => {
    const email = req.body.email;

    User.findOne({ email })
        .then((user) => {
            if (user) {
                console.log("Email exists");
                return res.send(true);
            } else {
                console.log("Email does not exist");
                return res.send(false);
            }
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).send("Server error");
        });

})
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'C:/Users/ABDELLAOUI GHASSEN/first-next/Profile_img/all')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })
app.post('/uploadimg', upload.single('file'), (req, res) => {
    const id = req.body.id
    if (!fs.existsSync('C:/Users/ABDELLAOUI GHASSEN/first-next/Profile_img/' + [id])) {
        // if not create directory
        fs.mkdirSync('C:/Users/ABDELLAOUI GHASSEN/first-next/Profile_img/' + [id]);
    }
    fs.rename('C:/Users/ABDELLAOUI GHASSEN/first-next/Profile_img/all/' + req.file.filename, 'C:/Users/ABDELLAOUI GHASSEN/first-next/Profile_img/' + id + '/' + req.file.filename, function(err) {
        if (err) {
            return console.error(err);
        }
        res.json({});
    });
    User.updateOne({ _id: id }, { $set: { image: `/Profile_img/${id}/${req.file.filename}` } }, (err, result) => {
        if (err) console.log(err)
    })
})
app.post('/login', (req, res) => {
    const data = req.body.data;
    User.find({
        $or: [
            { username: data.email },
            { email: data.email },
        ],
        password: data.password
    }).then(succ => {
        if (succ.length > 0) res.send({ msg: true, user: succ[0] });
        else res.send({ msg: false });
    });


})
app.post('/getInfo', (req, res) => {
    const id = req.body.data;
    User.findOne({ _id: id }).then(succ => {
        res.send(succ)
    })

})
app.post('/addPost', (req, res) => {
    const e = req.body.data;
    const job = new Job({
        user: e.user,
        fullname: e.fullname,
        title: e.title,
        budgetFrom: e.budgetFrom,
        budgetTo: e.budgetTo,
        bids: 0,
        city: e.place,
        description: e.description,
        star: 0,
        categorie: e.categorie,
        date: Date(),

    })

    job.save().then(succ => {
        res.send(succ)
        console.log(succ)
    })
})
app.post('/deleteAll', async(req, res) => {
    let id = req.body.data;
    Job.deleteMany({ userid: id }).then(succ => {
        res.send(true);
    })
})
app.post("/sendcode", (req, res) => {
    let code = generateRandomCode();
    const params = {
        Message: `Bonjour ${req.body.name}\nVotre code est: ${code}`,
        PhoneNumber: `+216${req.body.phone}`,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                DataType: 'String',
                StringValue: 'JobNet',
            },
        },
    };
    // sns.publish(params, (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).json({ error: 'Failed to send SMS' });
    //     } else {
    //         console.log('SMS sent successfully:', data.MessageId);
    //         res.json({ code: code });
    //     }
    // });
    console.log(code + " " + req.body.phone)
    res.status(200).json({ code: code });
})
app.post('/myallpost', async(req, res) => {
    let id = req.body.data;
    Job.find({ user: id }).sort({ _id: -1 }).then(succ => {
        res.send(succ);
    })
})
app.post('/getPost', async(req, res) => {
    const e = req.body.data;
    Job.find({}).sort({ _id: -1 }).then(succ => {
        if (succ.length > 0) {
            res.json(succ);
        } else {
            res.send(false);
        }
    })
})
app.post('/deleteone', async(req, res) => {
    const id = req.body.data;
    Job.findOneAndDelete({ _id: id }).then(succ => {
        res.send(true);
    })
})
app.post('/search', async(req, res) => {
    let e = req.body.data;
    Job.find({ title: { $regex: e, $options: 'i' } }).limit(5).then(succ => {
        if (succ.length > 0) res.send(succ);
        else res.send(false);
    });
})
app.post('/searchForid', async(req, res) => {
    let e = req.body.data;
    Job.find({ title: { $regex: e.title, $options: 'i' }, user: e.id, }).limit(5).then(succ => {
        if (succ.length > 0) res.send(succ), console.log(succ);
        else res.send([]);
    });
})
app.post('/getone', async(req, res) => {
    let e = req.body.data;
    Job.findOne({ _id: e }).then(succ => {
        res.send(succ);
    })
})
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

app.post('/bid', async(req, res) => {
    try {
        let e = req.body.data;
        let email = e.email;

        const bid = new Bid({
            userid: e.userId,
            postid: e.jobId,
            amount: e.budget,
            days: e.days,
            desc: e.description,
            fullname: e.userFullname,
        });

        await bid.save();
        await Job.updateOne({ _id: e.jobId }, { $push: { bid: bid } });
        await Job.findOneAndUpdate({ _id: e.jobId }, { $inc: { bids: 1 } });

        const emailParams = {
            Destination: {
                ToAddresses: ["sihem.ghassen@gmail.com"],
            },
            Message: {
                Body: {
                    Html: {
                        Data: `
                          <html>
                            <head>
                              <style>
                                body {
                                  font-family: 'Arial', sans-serif;
                                  background-color: #f4f4f4;
                                  color: #333;
                                  padding: 20px;
                                }
                                h1 {
                                  color: #0066cc;
                                }
                                p {
                                  font-size: 16px;
                                }
                              </style>
                            </head>
                            <body>
                              <h1>Hi, One new person (${e.userFullname}) submit a proposal for your Job </h1>
                              <p><span style="font-weight: bold;">JobId:</span> ${e.jobId}</p>
                              <p><span style="font-weight: bold;">Description:</span> ${e.description}</p>
                            </body>
                          </html>
                        `,
                    },
                    Text: {
                        Data: 'Your plain text message here.',
                    },
                },
                Subject: {
                    Data: 'Job bid',
                },
            },
            Source: 'ghassendevo@gmail.com',
        };

        // await ses.sendEmail(emailParams).promise();
        // console.log('Email sent successfully');
        res.send(true);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/getproposal', async(req, res) => {
    let e = req.body.data;
    Job.find({ "bid.userid": e }).then(succ => {
        res.send(succ);
    })
})
app.post('/updatepost', async(req, res) => {
    let e = req.body.data;
    Job.findByIdAndUpdate({ _id: e.id }, {
        $set: {
            title: e.title,
            budgetFrom: e.budgetfrom,
            budgetTo: e.budgetto,
            description: e.description,
            city: e.city,
            categorie: e.categorie,
        }
    }).then(succ => {
        res.send(true)
    }).catch(err => {
        console.log(err)
    })
})
app.post('/updatepassword', async(req, res) => {
    let e = req.body.data;
    User.findByIdAndUpdate({ _id: e.id }, { $set: { password: e.password } }).then(succ => { res.send(true) })
})
app.post('/updateinfo', async(req, res) => {
    let e = req.body.data;
    Job.findByIdAndUpdate({ _id: e.id }, {
        $set: {
            fullname: e.fullname,
            username: e.username,
            email: e.email,
            phone: e.phone,
            city: e.city
        }
    }).then(succ => {
        res.send(true)
    })
})
server.listen(3001, () => {
    console.log('server running')
})