"use client";
import { getjobsAPi } from "@/APIs/APIS";
import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const Jobs: any = async ({ data }) => {
  const jobs = useSelector((state: RootState) => state.post);
  const datajobs = [...data, ...jobs];
  return (
    <div>
      {datajobs.map((val, index) => {
        return val.budgetFrom + "\n \t \n";
      })}
    </div>
  );
};

export default Jobs;
