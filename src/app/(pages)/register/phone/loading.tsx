import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const loading = () => {
  return (
    <div className="shadow-sm flex flex-col justify-center items-center rounded-sm p-10 w-full">
      <div className="w-[95%]">
        <Skeleton className="w-full h-[20px] rounded-full" />
      </div>
      <div className="w-[95%] pt-3 pb-3 flex flex-col gap-4">
        <Skeleton className="w-full h-[20px] rounded-full" />

        <Skeleton className="w-full h-[20px] rounded-full" />
      </div>
    </div>
  );
};

export default loading;
