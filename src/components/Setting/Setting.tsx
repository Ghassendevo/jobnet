"use client"
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ArrowLeftIcon, SunIcon } from "@radix-ui/react-icons";
import { useRouter } from "next-nprogress-bar";

import React from "react";
import { ModeToggle } from "../toggle-btn/Toggle-btn";

const Setting = () => {
    const router = useRouter()
  return (
    <div className="flex flex-col justify-center items-center ">
      <div
        className="md:w-[70%] w-[90%] mr-auto mt-10 ml-auto cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="w-[20px] h-[20px]" />
      </div>
      <div className="w-[70%] mt-5">
      <ModeToggle />
      </div>
    </div>
  );
};

export default Setting;
