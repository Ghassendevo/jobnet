import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const laoding = async() => {
  
  return (
    <div className="shadow-sm flex flex-col justify-center items-center rounded-sm p-10 w-full">
      <div className="w-[95%]">
        <Skeleton className="w-full h-[20px] rounded-full" />
      </div>
      <div className="w-[95%] pt-3 pb-3 flex flex-col gap-4">
        <Skeleton className="w-full h-[20px] rounded-full" />
        <Skeleton className="w-full h-[20px] rounded-full" />

        <div className="w-full flex flex-row justify-between gap-3">
          <Skeleton className="w-full h-[20px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default laoding;
