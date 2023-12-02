"use client";
import { RootState } from "@/redux/store";
import { Input, Skeleton } from "@nextui-org/react";
import { ArrowLeftIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { useRouter } from "next-nprogress-bar";
import { Root } from "postcss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import inlove from "../../../assets/in-love.gif";
import axios from "axios";
import { toast, useToast } from "../ui/use-toast";
import Image from "next/image";

const Profile = ({ id, data }: { id: String | String[]; data: any }) => {
  const router = useRouter();
  const [dat, setData] = useState();
  const [isloading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.session.data);
  const [form, setForm] = useState(data);
  const { toast } = useToast();
  useEffect(() => {
    if (user) setIsLoading(false);
  }, [user]);
  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/updateinfo", {
        data: form,
      })
      .then((res) => {
        toast({
          title: "Success , changed updated",
          variant: "default",
        });
      })
      .catch((err) => {
        toast({
          title: "Error was accurated",
          description: "an error in the server , please try again",
          variant: "destructive",
        });
      });
  };
  return (
    (isloading && (
      <main className="h-[100vh]">
        <Skeleton className="w-full h-[60px]" />
        <div className=" w-[70%] ml-auto mr-auto">
          <div className=" mt-10 mb-10">
            <Skeleton className="w-full h-[90px] rounded-3xl" />
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <div className="flex-3 w-[70%] gap-4  rounded-3xl">
              <Skeleton className="w-full h-[200px] rounded-3xl" />
              <br />
              <Skeleton className="w-full h-[200px] rounded-3xl" />
              <br />
              <Skeleton className="w-full h-[200px] rounded-3xl" />
              <br />
              <Skeleton className="w-full h-[200px] rounded-3xll" />
            </div>
            <div className="flex-1">
              <Skeleton className="w-[200px] h-[150px] rounded-3xl" />
            </div>
          </div>
        </div>
      </main>
    )) || (
      <>
        <div
          className="md:w-[70%] w-[90%] mr-auto mt-10 ml-auto cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="w-[20px] h-[20px]" />
        </div>
        <div className="mt-10 flex flex-col justify-center items-center">
          <div className="w-[70%]">
            <div className=" flex flex-row justify-between items-start">
              <div>
                <p className="font-semibold text-3xl">
                  Hello {(isloading && " ") || user.fullname},
                </p>
                <p className="text-sm text-gray-600">
                  {(user._id == id && "You can edit your profile easly") || (
                    <div className="flex flex-row gap-3 items-center">
                     
                      <p>Thank you for visiting my profile</p> <Image
                        src={inlove}
                        alt="image"
                        width={40}
                        height={100}
                      />
                    </div>
                  )}
                </p>
              </div>
              {user._id == id && (
                <div>
                  <Button
                    onClick={handleSubmit}
                    className="bg-yellow-300 w-[80px] hover:bg-yellow-400"
                  >
                    <p className="text-black">Save</p>
                  </Button>
                </div>
              )}
            </div>

            <div className=" mt-6 flex gap-2 flex-col">
              <p className="font-semibold">Personal information</p>
              <div>
                <Input
                  label="Fullname"
                  disabled={user._id !== id}
                  onChange={(e) =>
                    setForm({ ...form, fullname: e.target.value })
                  }
                  placeholder="Enter your Fullname"
                  defaultValue={form.fullname}
                />
              </div>
              <div className="flex flex-row justify-between gap-4">
                <Input
                  label="Email"
                  type="email"
                  disabled={user._id !== id}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  defaultValue={form.email}
                />
                <Input
                  label="Username"
                  disabled={user._id !== id}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  placeholder="Enter your username"
                  defaultValue={form.username}
                />
              </div>
              <div>
                <Input
                  label="Phone"
                  disabled={user._id !== id}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter your phone"
                  defaultValue={form.phone}
                />
              </div>
              <p className="font-semibold">Security</p>
              <div className="flex flex-col gap-2">
                {(user._id == id && (
                  <>
                    <p className="text-xs text-gray-600">update new password</p>
                    <p className="text-xs text-gray-600">
                      For security purpose , you cannot view you old password
                    </p>
                    <Input
                      label="Password"
                      type="password"
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      placeholder="Enter new password"
                    />{" "}
                  </>
                )) || (
                  <>
                    <LockClosedIcon />
                  </>
                )}
              </div>
              <p className="font-semibold">
                {(id == user._id && "Add") || "See"} more information
              </p>
              <div className="flex flex-row justify-between gap-4">
                <Input
                  label="City"
                  type="text"
                  disabled={user._id !== id}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Enter your city"
                  defaultValue={form.city}
                />
                <Input
                  label="Skill"
                  disabled={user._id !== id}
                  onChange={(e) => setForm({ ...form, skill: e.target.value })}
                  placeholder="Enter your Skill"
                  defaultValue={form.skill}
                />
              </div>
              <div className="">
                <Input
                  label="description"
                  type="text"
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Enter your description"
                  defaultValue={form.description}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Profile;
