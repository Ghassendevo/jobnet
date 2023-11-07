import Header from "@/components/headerHome/Header";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <main className="h-[100vh]">
      <Skeleton className="w-full h-[60px]" />;
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
  );
};

export default loading;
