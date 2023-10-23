"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "../ui/button";
import ReactInputVerificationCode from "react-input-verification-code";
import { useRouter } from "next/navigation";
import { containsCharacter, isvalidphone } from "@/functions/functions";
import axios from "axios";
import Countdown from "react-countdown";
import { AnimatePresence, motion as m } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";
import { lockfilePatchPromise } from "next/dist/build/swc";
import { register } from "@/redux/slices/registerSlice";
import { useToast } from "../ui/use-toast";
import { login } from "@/redux/slices/sessionSlice";
interface sessionData {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  _id: string;
}
const PhoneNumber = () => {
  const router = useRouter();
  const userData = useSelector((state: RootState) => state.register.data);
  useEffect(() => {
    if (!userData.email || !userData.fullname || !userData.password)
      router.push("/register");
  }, []);
  const [showCodeComponent, setShowCodeComponent] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeAPi, setcodeAPi] = useState("");
  const [islaodingcontinue, setisloadingcontinue] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [err, setErr] = useState({
    phone: "",
    code: "",
  });
  const handlePhone = (value: string) => {
    if (isvalidphone(value)) {
      setPhone(value);
      setErr({ ...err, phone: "" });
    } else {
      setErr({ ...err, phone: "Phone format is invalid" });
    }
  };
  const { toast } = useToast();
  const handleSubmit = () => {
    setisloading(true);
    if (isvalidphone(phone)) {
      axios
        .post("http://localhost:3001/sendcode", {
          name: userData.fullname,
          phone: phone,
        })
        .then((res) => {
          setcodeAPi(res.data.code);
          toast({
            title: "Success code was sended to your number",
            description:
              "Hello " +
              userData.fullname +
              " please verify your phone number to continue",
          });
          setisloading(false);
          dispatch(register({ ...userData, phonenumber: phone }));
          setShowCodeComponent(!showCodeComponent);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const resendCode = () => {
    setisloading(true);
    if (isvalidphone(phone)) {
      axios
        .post("http://localhost:3001/sendcode", {
          name: userData.fullname,
          phone: phone,
        })
        .then((res) => {
          setcodeAPi(res.data.code);
          setisloading(false);
          dispatch(register({ ...userData, phonenumber: phone }));
          setShowCodeComponent(!showCodeComponent);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const dispatch = useDispatch();

  const handleContinue = () => {
    if (codeAPi == code) {
      setisloadingcontinue(true);
      let data = JSON.stringify(userData);
      localStorage.setItem("session", data);
      axios
        .post("http://localhost:3001/sign", {
          data: userData,
        })
        .then((res) => {
          setisloadingcontinue(false);
            localStorage.setItem("session", JSON.stringify(res.data.user));
            let data: sessionData = res.data.user;
            dispatch(login({ data: data, loggedin: true }));
        })
        .catch((err) => {
          setisloadingcontinue(false);
          console.log(err);
        });
    } else {
      setisloadingcontinue(false);
      setErr({ ...err, code: "The code your entered is incorrect" });
      setTimeout(() => {
        setErr({ ...err, code: "" });
      }, 4000);
    }
  };
  return (
    <div className="shadow-sm flex flex-col justify-center items-center rounded-sm p-10 w-full">
      <div className="w-[95%]">
        <p>Add your phone number</p>
        <p className="text-gray-600 text-sm pt-2">
          Adding your phone number help you and us in the security of your
          account
        </p>
      </div>
      <AnimatePresence>
        {(!showCodeComponent && (
          <m.div
            exit={{ opacity: 0 }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="w-[95%] pt-5 pb-5 flex flex-col gap-4"
          >
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlePhone(e.target.value)
              }
              isInvalid={err.phone ? true : false}
              errorMessage={err.phone ? "Phone format is incorrect" : false}
              isClearable
              type="text"
              label="Phone number"
              variant="bordered"
              placeholder="Enter your phone number"
              defaultValue="+216"
              className="w-full"
            />
            <Button
              disabled={phone && !err.phone ? false : true}
              onClick={handleSubmit}
              className="bg-yellow-200 text-black font-semibold hover:bg-yellow-100"
              size={"lg"}
            >
              {(isloading && (
                <ThreeDots
                  height="30"
                  width="30"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              )) ||
                " Send sms"}
            </Button>
          </m.div>
        )) || (
          <m.div
            className="pt-10 flex flex-col gap-4 items-center justify-center w-[95%]"
            exit={{ opacity: 0 }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <Countdown date={Date.now() + 5000 * 60} renderer={renderer} />,
            <ReactInputVerificationCode
              autoFocus
              onChange={(e: any) => setCode(e)}
            />
            {err.code && (
              <m.p
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600"
              >
                The code you entered is incorrect !
              </m.p>
            )}
            <Button
              disabled={containsCharacter(code) ? true : false}
              onClick={handleContinue}
              className="w-full bg-yellow-200 text-black font-semibold hover:bg-yellow-300"
              size="lg"
            >
              {(islaodingcontinue && (
                <ThreeDots
                  height="30"
                  width="30"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              )) ||
                "Continue"}
            </Button>
            <Button
              variant="ghost"
              className="font-semibold hover:underline w-full"
            >
              <Link href={"/register"} onClick={resendCode}>
                {" "}
                Resened ?
              </Link>
            </Button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const Completionist = () => (
  <span>Code expires , you can resend a new code</span>
);
const renderer = ({ hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <>
        <p>
          Code expires in :{" "}
          <span className="font-semibold">
            {minutes}:{seconds}
          </span>
        </p>
      </>
    );
  }
};
const VerificationCode = () => {
  return <ReactInputVerificationCode autoFocus />;
};
export default PhoneNumber;
