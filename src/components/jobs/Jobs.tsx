"use client";
import { getjobsAPi } from "@/APIs/APIS";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { motion as m } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";
const Jobs: any = async ({ data }) => {
  const jobs = useSelector((state: RootState) => state.post);
  const datajobs = [...jobs, ...data];
  return (
    <div className="flex w-full flex-col pb-20">
      {datajobs.map((val, index) => {
        const timeAgo = formatDistanceToNow(new Date(val.date), {
          addSuffix: true,
        });
        return (
          <div className="shadow-sm   w-full">
            <m.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              className="p-5  transition duration-300 ease-in-out hover:bg-[#faf8ecaa] hover:cursor-pointer"
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
            </m.div>
          </div>
        );
      })}
    </div>
  );
};

export default Jobs;
