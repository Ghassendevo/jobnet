"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const BudgetUser: any = ({ data }) => {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const userdata = useSelector((state: RootState) => state.session.data);
  return (
    <div className=" flex justify-center">
      <div className="forimage flex flex-col gap-3 justify-center items-center p-10">
        <div
          style={{ backgroundColor: getRandomColor() }}
          className="w-[7vh] h-[7vh] rounded-full flex  justify-center items-center"
        >
          {userdata.fullname
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase()}
        </div>
        <Link href={"/sdf"} className="capitalize hover:underline hover:text-yellow-700">
          {userdata.fullname}
        </Link>
      </div>
    </div>
  );
};

export default BudgetUser;
