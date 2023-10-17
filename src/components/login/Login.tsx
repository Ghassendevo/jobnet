"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ThreeDots } from "react-loader-spinner";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Input } from "@nextui-org/react";
import { isvalidEmail, isvalidPassword } from "@/functions/functions";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { motion as m } from "framer-motion";
import axios from "axios";
import { login } from "@/redux/slices/sessionSlice";
import { RootState } from "@/redux/store";
interface sessionData {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  _id: string;
}
const Login = () => {
  const [isloading, setisloading] = useState(false);
  const [invalidinfo, setinvalidinfo] = useState(false);
  const [form, setForm] = useState({
    emailusername: "",
    password: "",
  });
  const [err, setErr] = useState({
    email: "",
    password: "",
  });
  const handleEmail = (value: string) => {
    setForm({ ...form, emailusername: value }), setErr({ ...err, email: "" });
  };
  const handlePass = (value: string) => {
    if (isvalidPassword(value))
      setForm({ ...form, password: value }), setErr({ ...err, password: "" });
    else
      setErr({
        ...err,
        password: "password not valid",
      });
  };
  const isAllinputsValid = () => {
    if (form.emailusername && form.password && !err.email && !err.password)
      return true;
    else return false;
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    setisloading(true);

    if (isAllinputsValid()) {
      axios
        .post("http://localhost:3001/login", {
          data: {
            email: form.emailusername,
            password: form.password,
          },
        })
        .then((res) => {
          if (res.data.msg) {
            localStorage.setItem("session", JSON.stringify(res.data.user));
            let data: sessionData = res.data.user;
            dispatch(login({ data: data, loggedin: true }));
          } else {
            setinvalidinfo(true);
            setTimeout(() => {
              setinvalidinfo(false);
            }, 3000);
          }
          setisloading(false);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <div className="shadow-sm flex flex-col justify-center items-center rounded-sm p-10 w-full">
      <div className="w-[95%]">
        <p>Login to your account</p>
        <p className="text-gray-600 text-sm pt-2">people are waiting for you</p>
      </div>
      <div className="w-[95%] pt-3 pb-3 flex flex-col gap-4">
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleEmail(e.target.value)
          }
          isInvalid={err.email ? true : false}
          errorMessage={err.email ? err.email : false}
          type="email"
          label="Email or username"
          variant="bordered"
          className="w-full"
          size="sm"
        />
        <div className="w-full flex flex-row justify-between gap-3">
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handlePass(e.target.value)
            }
            isInvalid={err.password ? true : false}
            errorMessage={
              err.password
                ? "Password must be at least 8 characters long and contain at least one letter, one number, and may include special characters like !@#$%^&*()_+}{:;?.-"
                : false
            }
            type="password"
            label="Password"
            variant="bordered"
            className="w-full"
            size="sm"
          />
        </div>
        {invalidinfo && (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-600 text-sm"
          >
            Incorrect information , please try again .
          </m.p>
        )}
        <Button
          disabled={!isAllinputsValid()}
          onClick={handleSubmit}
          size={"lg"}
          className=" bg-yellow-200 text-black hover:bg-yellow-300 flex gap-3 font-semibold"
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
          )) || <> Sign in</>}
        </Button>
        <Link
          href={"/register"}
          className="hover:underline text-center text-gray-700 "
        >
          Create new account ?
        </Link>
      </div>
    </div>
  );
};

export default Login;
