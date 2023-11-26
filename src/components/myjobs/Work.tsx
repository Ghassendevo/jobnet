"use client";
import { RootState } from "@/redux/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Work = () => {
  const usersession = useSelector((state: RootState) => state.session.data);
  const [isloading, setisloading] = useState(true);
  const [jobs, setjobs] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3001/myallpost", {
        id: usersession._id,
      })
      .then((res) => {
        setjobs(res.data);
        setisloading(false)
      });
  }, []);
  function handleSearch(e) {
    //axios get
  }
  return (
    <div className="h-screen">
      {(isloading && <Loading />) || (
        <div className=" w-[70%] ml-auto mr-auto pt-[60px]">
          <div className="search">
            <Input
              isClearable
              type="text"
              variant="bordered"
              startContent={<MagnifyingGlassIcon />}
              placeholder="Search for your jobs"
              onChange={(e) => handleSearch(e)}
              onClear={() => console.log("input cleared")}
              className="w-full"
            />
          </div>
          <div className="mt-10 border border-gray-200 p-5 rounded-lg">
            <div className="flex flex-row items-center gap-5">
              <h1 className="font-semibold text-xl">My jobs</h1>{" "}
              <span className="bg-yellow-400 dark:bg-yellow-500 w-[20px] h-[20px] text-sm rounded-full flex justify-center items-center">{jobs.length}</span>
            </div>
            <div>{jobs.length == 0 && <div className="nojobs w-full flex justify-center items-center">
              You have no jobs 
                </div>}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Work;
