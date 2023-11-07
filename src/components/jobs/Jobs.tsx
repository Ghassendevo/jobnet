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
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { LinkIcon } from "@nextui-org/react";
import { Button } from "../ui/button";
const Jobs: any = async ({ data }) => {
  const jobs = useSelector((state: RootState) => state.post);
  const [isopen, setisopen] = useState(false);
  const [dataselected, setdataselected] = useState({});
  const datajobs = [...jobs, ...data];
  return (
    <div className="flex w-full flex-col pb-20">
      {datajobs.map((val, index) => {
        const timeAgo = formatDistanceToNow(new Date(val.date), {
          addSuffix: true,
        });
        return (
          <div
            onClick={(e) => {
              setdataselected(val), setisopen(true);
            }}
            className="shadow-sm   w-full"
          >
           {index==0? <m.div
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
                  Hourly - Expert - Est. Time: Less than 1 month, Less than 30
                  hrs/week - {timeAgo}
                </p>
                <p className="pt-4 text-sm text-gray-600">{val.description}</p>
                <p className="pt-5 text-xs text-gray-400">
                  Proposals: {val.bids}
                </p>
                <p className="pt-5 flex flex-row items-center gap-2 text-xs text-g">
                  <CheckIcon className="bg-blue-500 rounded-xl text-white" />
                  Payment verified{" "}
                </p>
              </div>
            </m.div> : <m.div
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
                  Hourly - Expert - Est. Time: Less than 1 month, Less than 30
                  hrs/week - {timeAgo}
                </p>
                <p className="pt-4 text-sm text-gray-600">{val.description}</p>
                <p className="pt-5 text-xs text-gray-400">
                  Proposals: {val.bids}
                </p>
                <p className="pt-5 flex flex-row items-center gap-2 text-xs text-g">
                  <CheckIcon className="bg-blue-500 rounded-xl text-white" />
                  Payment verified{" "}
                </p>
              </div>
            </m.div>}
          </div>
        );
      })}
      <Sheetjobs data={dataselected} isopen={isopen} close={setisopen} />
    </div>
  );
};

const Sheetjobs = ({ isopen, data, close }) => {
  return (
    <Sheet key={"bottom"} open={isopen}>
      <SheetContent className="sm:w-[540px] md:w-[100vh] w-[100%] md:max-w-[400vh] overflow-scroll">
        <SheetHeader>
          <Link
            className="text-sm flex flex-row gap-1 text-yellow-600 hover:underline"
            href=""
          >
            Open in a new window <LinkIcon />{" "}
          </Link>
        </SheetHeader>
        
          <div className="p-5 mt-20 w-full gap-7 flex flex-col border border-gray-300 rounded-md">
            <h1 style={{textTransform:"capitalize"}} className="font-semibold text-xl">{data.title}</h1>
          </div>
        
        <SheetFooter className=" pt-10 flex flex-row w-full  justify-start gap-4">
          <Button variant="ghost" onClick={(e) => close()}>
            Back
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default Jobs;
