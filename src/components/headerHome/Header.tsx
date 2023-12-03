"use client";
import {
  BackpackIcon,
  BellIcon,
  CubeIcon,
  HomeIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { usePathname } from "next/navigation";
import { Input, LinkIcon, Spinner, Textarea } from "@nextui-org/react";
import io from "socket.io-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next-nprogress-bar";
import { Badge, Avatar } from "@nextui-org/react";
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { getNotification } from "@/APIs/APIS";
import Link from "next/link";
import { login } from "@/redux/slices/sessionSlice";
import axios from "axios";
import { Toast } from "@radix-ui/react-toast";
import { useToast } from "../ui/use-toast";
import { Sheet, SheetContent, SheetFooter, SheetHeader } from "../ui/sheet";
import { ThreeDots } from "react-loader-spinner";
interface sessionData {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  _id: string;
}

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [dataselected, setdataselected] = useState();
  const [userData, setUserData] = useState<sessionData>();
  const [notification, setNotification] = useState([]);
  const usersession = useSelector((state: RootState) => state.session.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = localStorage.getItem("session");
    const fetchNoti = async (id: string) => {
      let data = await getNotification(id);
      // if (data.length > 0) {
      //   const notificationExists = notification.some((n) => n._id === data._id);
      //   if (!notificationExists && data.length > 0) {
      //     setNotification((prev) => [...prev, data]);
      //   }
      // }
    };
    if (data) {
      const n = JSON.parse(data);
      dispatch(login({ data: n, loggedin: true }));
      setUserData(n);
      fetchNoti(n._id);
    } else {
      router.push("/login");
    }
    const socket = io("http://localhost:3001");
    const handleNotification = (d) => {
      if (d.user === JSON.parse(data)._id) {
        setNotification((prevNotification) => [...prevNotification, d]);
        console.log(notification.length);
      }
    };
    socket.on("receive_notification", handleNotification);
    return () => {
      socket.off("receive_notification", handleNotification);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("session");
  };
  const notiNotView = () => {
    let noti = notification.filter((notification) => !notification.viewed);
    return noti;
  };
  const viewNotification = () => {
    setNotification((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        viewed: true,
      }))
    );
  };
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [dataLoading, setDataloading] = useState(false);
  const [isopen, setisopen] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setDataloading(true);
    axios
      .post("http://localhost:3001/search", {
        type: position,
        value: search,
      })
      .then((res) => {
        setDataloading(false);
        setSearchData(res.data);
      })
      .catch((err) => {
        setDataloading(false);
        toast({
          title: "Error",
          variant: "destructive",
          description: "An error was accurated please try again",
        });
      });
  };
  const [position, setPosition] = React.useState("jobs");
  return (
    <div className="shadow-sm h-16 flex justify-between md:pl-36  pl-5 pr-5  md:pr-36 items-center">
      <div className="logo">
        <h3 className="text-black">JobNet</h3>
      </div>
      <AnimatePresence>
        {search.length > 0 && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="shadow-md p-5 z-1 bg-white rounded-sm text-center absolute top-[60px] left-[23%] w-[45vh]"
          >
            <div className="">
              {(dataLoading && <Spinner size="sm" />) ||
                (position == "jobs" &&
                  ((searchData.length == 0 && "No jobs") ||
                    searchData.map((val, index) => {
                      return (
                        <div className="flex flex-row hover:bg-gray-100 rounded-sm p-2 ">
                          <div
                            onClick={(e) => {
                              setdataselected(val), setisopen(true);
                            }}
                            className="w-full text-left flex flex-col gap-0 cursor-pointer"
                          >
                            <p className="font-semibold">{val.title} </p>
                            <p className="text-sm">{val.description}</p>
                          </div>
                        </div>
                      );
                    }))) ||
                (searchData.length == 0 && "No Talents") ||
                searchData.map((val, index) => {
                  return (
                    <div className="flex flex-row hover:bg-gray-100 rounded-sm p-2 ">
                      <Link
                        href={"/profile?id=" + val._id}
                        className="w-full text-left flex flex-col gap-0"
                      >
                        <p className="font-semibold">{val.fullname} </p>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <div className="menu flex flex-row md:w-[60%] w-[95%]  justify-between gap-4">
        <div className="search flex items-center  justify-center">
          <Input
            size="md"
            type="email"
            variant="bordered"
            onChange={(e) => handleChange(e)}
            placeholder="Search..."
            className="w-full"
            endContent={
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-lg w-[15vh]"
                    size={"sm"}
                  >
                    for {position}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Search type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={(e) => {
                      setPosition(e), setSearchData([]);
                    }}
                  >
                    <DropdownMenuRadioItem value="jobs">
                      Jobs
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="talents">
                      Talents
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            }
          />
        </div>
        <div className="icons flex items-center justify-between  w-[50%] gap-4">
          <Link href={"/"}>
            <m.div
              whileHover={{
                borderBottom: "3px solid #facc15",
              }}
              className={[
                "pb-2 pt-2 border-3 border-none cursor-pointer ",
                pathname == "/" ? "border-b-yellow-400" : "",
              ].join(" ")}
            >
              <HomeIcon className="text-black h-6 w-6 dark:text-white" />
            </m.div>
          </Link>
          <Link href={"/work"}>
            <m.div
              whileHover={{
                borderBottom: "3px solid #facc15",
              }}
              className={[
                "pb-2 pt-2 border-3  cursor-pointer border-none  ",
                pathname == "/jobs" ? "border-b-yellow-400" : "",
              ].join(" ")}
            >
              <BackpackIcon className="text-black h-6 w-6 dark:text-white" />
            </m.div>
          </Link>
          <Menubar className="border-none shadow-none">
            <MenubarMenu>
              <MenubarTrigger>
                <m.div
                  onClick={viewNotification}
                  whileHover={{
                    borderBottom: "3px solid #facc15",
                  }}
                  className={[
                    "pb-2 pt-2 border-3  cursor-pointer border-none",
                    pathname == "/notification" ? "border-b-yellow-400" : "",
                  ].join(" ")}
                >
                  <Badge
                    content={
                      notiNotView().length != 0 ? notiNotView().length : null
                    }
                    color="danger"
                  >
                    <BellIcon className="text-black h-6 w-6 dark:text-white" />
                  </Badge>
                </m.div>
              </MenubarTrigger>
              <MenubarContent>
                {(notification.length > 0 &&
                  notification
                    .slice()
                    .reverse()
                    .map((val, index) => {
                      const timeAgo = formatDistanceToNow(new Date(val.date), {
                        addSuffix: true,
                      });
                      return (
                        <>
                          <MenubarItem
                            key={index}
                            className="p-5 hover:cursor-pointer"
                          >
                            <Link href={`/job?id=${val._id}`}>
                              {" "}
                              <div className=" flex flex-row justify-between  gap-5">
                                <div className="flex flex-col gap-2">
                                  <p>
                                    {val.userFullname} applied for your job{" "}
                                  </p>
                                  <p className="text-gray-600 text-xs">
                                    Job ID: #{val._id}
                                  </p>
                                  <p className="text-gray-600 text-xs">
                                    {/* {timeAgo} */}
                                  </p>
                                </div>
                                <span className="bg-blue-600 w-[8px] h-[8px] text-blue-600 rounded-full">
                                  {""}
                                </span>
                              </div>
                            </Link>
                          </MenubarItem>
                          {index != notification.length - 1 && (
                            <MenubarSeparator />
                          )}
                        </>
                      );
                    })) || <p className="p-5 text-center">No notification</p>}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <div className="avatar">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>{userData?.username}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/profile?id=" + usersession._id}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/setting"}>Setting</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem("session"), router.push("/login");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isopen && (
        <Sheetjobs data={dataselected} isopen={isopen} close={setisopen} />
      )}
    </div>
  );
};

export default Header;
interface job {
  fullname: string;
  title: string;
  budgetFrom: string;
  budgetTo: string;
  bids: number;
  user: string;
  description: string;
  bid: [];
  star: string;
  categorie: string;
  _id: string;
  date: Date;
  __v: number;
}
const Sheetjobs = ({
  isopen,
  data,
  close,
}: {
  isopen: boolean;
  data: job;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const timeAgo = formatDistanceToNow(new Date(data.date), {
    addSuffix: true,
  });
  const socket = io("http://localhost:3001");
  const userinfo = useSelector((state: RootState) => state.session.data);

  const [form, setForm] = useState({
    user: data.user,
    jobId: data._id,
    uesrId: userinfo._id,
    userFullname: userinfo.fullname,
    userEmail: userinfo.email,
    budget: 0,
    days: 0,
    description: "",
  });
  const [err, setErr] = useState({
    budget: "",
    days: "",
    description: "",
  });
  const [isloading, setisloading] = useState(false);
  const validform = () => {
    if (
      form.budget &&
      form.days &&
      form.description &&
      !err.budget &&
      !err.description &&
      !err.days
    ) {
      return true;
    }
    return false;
  };
  const { toast } = useToast();
  const handleSubmit = () => {
    if (validform) {
      setisloading(true);
      axios
        .post("http://localhost:3001/bid", {
          data: form,
        })
        .then((res) => {
          setisloading(false);
          toast({
            variant: "default",
            title: "Project:#" + form.jobId,
            description: "Your bid send succesfully.",
          });
          console.log(data);
          socket.emit("send_notification", { ...form, user: data.user });
          close(false);
        })
        .catch((err) => {
          setisloading(false);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        });
    }
  };
  const handlebudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[1-9]\d*$/;
    if (!regex.test(e.target.value)) {
      setErr({
        ...err,
        budget:
          "Invalid budget. Please enter a number greater than 0 and without leading zeros.",
      });
    } else {
      setForm({ ...form, budget: parseInt(e.target.value) });
      setErr({ ...err, budget: "" });
    }
  };
  const handledays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[1-9]\d*$/;
    if (!regex.test(e.target.value)) {
      setErr({
        ...err,
        days: "Invalid days. Please enter a number greater than 0 and without leading zeros.",
      });
    } else {
      setForm({ ...form, days: parseInt(e.target.value) });
      setErr({ ...err, days: "" });
    }
  };
  const handledesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[\s\S]{1,500}$/;
    if (!regex.test(e.target.value)) {
      setErr({
        ...err,
        description:
          "Invalid description. Please check the length and allowed characters.",
      });
    } else {
      setForm({ ...form, description: e.target.value });
      setErr({ ...err, description: "" });
    }
  };
  return (
    isopen && (
      <Sheet open={isopen}>
        <SheetContent className="sm:w-[540px] md:w-[100vh] w-[100%] md:max-w-[400vh] overflow-scroll">
          <SheetHeader>
            <Link
              className="text-sm flex flex-row gap-1 text-yellow-600 hover:underline"
              href=""
            >
              Open in a new window <LinkIcon />{" "}
            </Link>
          </SheetHeader>

          <div className="p-5 mt-20 w-full gap-7 flex flex-col border border-gray-300 rounded-md rounded-b-none">
            <div className="flex flex-row gap-3  items-center">
              <h1
                style={{ textTransform: "capitalize" }}
                className="font-semibold text-xl"
              >
                {data.title}
              </h1>
              <h3 className="text-sm">Project ID: {data._id}</h3>
            </div>
            <p className="text-gray-400 text-xs">
              Hourly - Expert - Est. Time: Less than 1 month, Less than 30
              hrs/week - {timeAgo}
            </p>
            <h1 className=" text-sm">Posted {timeAgo} </h1>
            <Link
              href={"/"}
              style={{ textTransform: "capitalize" }}
              className="text-sm  hover:text-yellow-600 hover:underline"
            >
              Owner : {data.fullname}
            </Link>
          </div>
          <div className=" p-5 border border-gray-300 border-t-[0px] flex flex-col gap-2 rounded-t-none rounded-b-none rounded-md">
            <h1 className="text-sm font-semibold pb-2">Activity on this job</h1>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-md flex flex-row items-center gap-1">
                <p className="text-gray-500 text-sm">Proposals:</p>{" "}
                <div className="flex justify-center items-center dark:bg-yellow-400 bg-yellow-200 w-[20px] h-[20px] rounded-2xl">
                  <CubeIcon width={13} />
                </div>{" "}
              </p>
              <p className="text-sm">{data.bids}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-md flex flex-row items-center gap-1">
                <p className="text-gray-500 text-sm">Last viewed by client:</p>{" "}
                <div className="flex justify-center items-center dark:bg-yellow-400 bg-yellow-200 w-[20px] h-[20px] rounded-2xl">
                  <CubeIcon width={13} />
                </div>{" "}
              </p>
              <p className="text-sm">10 hours ago</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-md flex flex-row items-center gap-1">
                <p className="text-gray-500 text-sm">Interviewing:</p>{" "}
              </p>
              <p className="text-sm">1</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-md flex flex-row items-center gap-1">
                <p className="text-gray-500 text-sm">Invites sent:</p>{" "}
              </p>
              <p className="text-sm">2</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-md flex flex-row items-center gap-1">
                <p className="text-gray-500 text-sm">Unanswered invites:</p>{" "}
              </p>
              <p className="text-sm">1</p>
            </div>
          </div>
          <div className=" p-5 border border-gray-300 border-t-[0px] flex flex-col gap-2 rounded-t-none  rounded-md">
            <h1 className="text-md font-semibold pb-2 ">Apply for this job</h1>
            <div className="flex flex-col gap-3">
              <div className="">
                <Input
                  type="number"
                  label="Amount"
                  variant="bordered"
                  size="md"
                  isInvalid={(err.budget && true) || false}
                  errorMessage={err.budget}
                  labelPlacement="outside"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlebudget(e)
                  }
                  placeholder="Budget from"
                  startContent={<p className="text-gray-600">$</p>}
                />
              </div>
              <div className="">
                <Input
                  type="number"
                  label="Numbert of days"
                  variant="bordered"
                  size="md"
                  isInvalid={(err.days && true) || false}
                  errorMessage={err.days}
                  labelPlacement="outside"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handledays(e)
                  }
                  placeholder="Budget from"
                  startContent={<TimerIcon />}
                />
              </div>
              <div>
                <Textarea
                  variant={"bordered"}
                  label="Your description"
                  className="w-full"
                  size="sm"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handledesc(e)
                  }
                />
              </div>
            </div>
          </div>
          <SheetFooter className=" pt-10 flex flex-row w-full  justify-start gap-4">
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={!validform() || isloading}
              className="bg-yellow-300 min-w-[20vh] text-black w-fit hover:bg-yellow-400"
            >
              {(isloading && <ThreeDots color="black" width={25} />) ||
                "Send proposal"}
            </Button>
            <Button variant="ghost" onClick={(e) => close(false)}>
              Back
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  );
};
