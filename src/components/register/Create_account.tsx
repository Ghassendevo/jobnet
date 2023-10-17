"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import { register } from "@/redux/slices/registerSlice";
import {
  isvalidEmail,
  isvalidName,
  isvalidPassword,
} from "@/functions/functions";
import { useRouter } from "next-nprogress-bar";
import axios from "axios";
import Link from "next/link";

const Create_account = () => {
  const disptach: AppDispatch = useDispatch();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phonenumber: "0",
  });
  const [err, setErr] = useState({
    fullname: "",
    email: "",
    password: "",
    confpassword: "",
    phonenumber: "",
  });
  const [isloading, setisloading] = useState(false);
  //handles

  const handleName = (value: string) => {
    if (isvalidName(value))
      setForm({ ...form, fullname: value }), setErr({ ...err, fullname: "" });
    else
      setErr({
        ...err,
        fullname: "Input cannot have numbers or characters",
      });
  };
  const handleEmail = (value: string) => {
    if (isvalidEmail(value))
      setForm({ ...form, email: value }), setErr({ ...err, email: "" });
    else
      setErr({
        ...err,
        email: "Email not valid",
      });
  };
  const router = useRouter();
  const handlePass = (value: string) => {
    if (isvalidPassword(value))
      setForm({ ...form, password: value }), setErr({ ...err, password: "" });
    else
      setErr({
        ...err,
        password: "password not valid",
      });
  };
  const handlePassconf = (value: string) => {
    if (value != form.password) {
      setErr({ ...err, confpassword: "Passwords dont match" });
    } else {
      setErr({ ...err, confpassword: "" });
    }
  };
  const isAllinputsValid = () => {
    if (
      form.fullname &&
      form.email &&
      form.password &&
      !err.confpassword &&
      !err.email &&
      !err.fullname &&
      !err.password
    )
      return true;
    else return false;
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    setisloading(true);
    if (isAllinputsValid()) {
      axios
        .post("http://localhost:3001/verifyemail", {
          email: form.email,
        })
        .then((res) => {
          setisloading(false);
          if (res.data) setErr({ ...err, email: "email is already exist" });
          else dispatch(register(form)), router.push("/register//phone");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <div className="shadow-sm flex flex-col justify-center items-center rounded-sm p-10 w-full">
      <div className="w-[95%]">
        <p>Create account</p>
        <p className="text-gray-600 text-sm pt-2">
          Join us with just few steps
        </p>
      </div>
      <div className="w-[95%] pt-3 pb-3 flex flex-col gap-4">
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleName(e.target.value)
          }
          isInvalid={err.fullname ? true : false}
          errorMessage={
            err.fullname
              ? "Name cannot have numbers or special characters"
              : false
          }
          type="text"
          label="Full name"
          variant="bordered"
          className="w-full"
          size="sm"
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleEmail(e.target.value)
          }
          isInvalid={err.email ? true : false}
          errorMessage={err.email ? err.email : false}
          type="email"
          label="Email"
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
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handlePassconf(e.target.value)
            }
            isInvalid={err.confpassword ? true : false}
            errorMessage={err.confpassword ? "Password dont match" : false}
            type="password"
            label="Confirm password"
            variant="bordered"
            size="sm"
            className="w-full"
          />
        </div>
        <Button
          disabled={!isAllinputsValid()}
          onClick={handleSubmit}
          size={"lg"}
          className=" bg-yellow-200 text-black hover:bg-yellow-300 flex gap-3"
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
          )) || (
            <>
              {" "}
              Next <ArrowRightIcon />
            </>
          )}
        </Button>
        <Link href={"/login"} className="hover:underline text-center text-gray-700 ">Already have an account ? Login </Link>
      </div>
    </div>
  );
};

export default Create_account;
