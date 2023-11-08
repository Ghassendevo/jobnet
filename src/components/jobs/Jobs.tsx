"use client";
import { getjobsAPi } from "@/APIs/APIS";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { motion as m } from "framer-motion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CheckIcon,
  CubeIcon,
  DashIcon,
  FaceIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { Input, LinkIcon, Textarea } from "@nextui-org/react";
import { Button } from "../ui/button";
import { time } from "console";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { ThreeDots } from "react-loader-spinner";
const Jobs: any = async ({ data }) => {
  const jobs = useSelector((state: RootState) => state.post);
  const [isopen, setisopen] = useState(false);
  const [dataselected, setdataselected] = useState();
  const datajobs = [...jobs, ...data];
  return (
    <>
      <div className="flex w-full flex-col pb-20">
        {datajobs.map((val, index) => {
          const timeAgo = formatDistanceToNow(new Date(val.date), {
            addSuffix: true,
          });
          return (
            <div
              key={index}
              onClick={(e) => {
                setdataselected(val), setisopen(true);
              }}
              className="shadow-sm   w-full"
            >
              {index == 0 ? (
                <m.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                  }}
                  className="p-5  transition duration-300 ease-in-out rounded-t-3xl dark:hover:bg-[#25250baa] hover:bg-[#faf8ecaa] hover:cursor-pointer"
                >
                  <div className="jobheader  capitalize flex flex-row text-md">
                    <p className="font-[550] hover:text-yellow-800 hover:underline">
                      {val.title}
                    </p>
                  </div>
                  <div className="jobcontent pt-7">
                    <p className="text-gray-400 text-xs">
                      Hourly - Expert - Est. Time: Less than 1 month, Less than
                      30 hrs/week - {timeAgo}
                    </p>
                    <p className="pt-4 text-sm text-gray-600">
                      {val.description}
                    </p>
                    <p className="pt-5 text-xs text-gray-400">
                      Proposals: {val.bids}
                    </p>
                    <p className="pt-5 flex flex-row items-center gap-2 text-xs text-g">
                      <CheckIcon className="bg-blue-500 rounded-xl text-white" />
                      Payment verified{" "}
                    </p>
                  </div>
                </m.div>
              ) : (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                  }}
                  className="p-5  transition duration-300 ease-in-out dark:hover:bg-[#25250baa] hover:bg-[#faf8ecaa] hover:cursor-pointer"
                >
                  <div className="jobheader  capitalize flex flex-row text-md">
                    <p className="font-[550] hover:text-yellow-800 hover:underline">
                      {val.title}
                    </p>
                  </div>
                  <div className="jobcontent pt-7">
                    <p className="text-gray-400 text-xs">
                      Hourly - Expert - Est. Time: Less than 1 month, Less than
                      30 hrs/week - {timeAgo}
                    </p>
                    <p className="pt-4 text-sm text-gray-600">
                      {val.description}
                    </p>
                    <p className="pt-5 text-xs text-gray-400">
                      Proposals: {val.bids}
                    </p>
                    <p className="pt-5 flex flex-row items-center gap-2 text-xs text-g">
                      <CheckIcon className="bg-blue-500 rounded-xl text-white" />
                      Payment verified{" "}
                    </p>
                  </div>
                </m.div>
              )}
            </div>
          );
        })}
      </div>
      {isopen && (
        <Sheetjobs data={dataselected} isopen={isopen} close={setisopen} />
      )}
    </>
  );
};

interface job {
  fullname: string;
  title: string;
  budgetFrom: string;
  budgetTo: string;
  bids: number;
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
  const userinfo = useSelector((state: RootState) => state.session.data);
  const [form, setForm] = useState({
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
          setisloading(false)
          toast({
            variant: "default",
            title: "Project:#" + form.jobId,
            description: "Your bid send succesfully.",
          });
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
                <div className="flex justify-center items-center bg-yellow-200 w-[20px] h-[20px] rounded-2xl">
                  <CubeIcon width={13} />
                </div>{" "}
              </p>
              <p className="text-sm">{data.bids}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-md flex flex-row items-center gap-1">
                <p className="text-gray-500 text-sm">Last viewed by client:</p>{" "}
                <div className="flex justify-center items-center bg-yellow-200 w-[20px] h-[20px] rounded-2xl">
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
              disabled={!validform()}
              className="bg-yellow-300 min-w-[20vh] text-black w-fit hover:bg-yellow-400"
            >
              {(isloading && <ThreeDots color="black" width={25} />) || "Send proposal"}
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
export default Jobs;
