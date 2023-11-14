import { ModeToggle } from "@/components/toggle-btn/Toggle-btn";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/headerHome/Header";
import Boostproject from "@/components/boostproject/Boostproject";
import Jobs from "@/components/jobs/Jobs";
import {getjobsAPi } from "@/APIs/APIS";
import BudgetUser from "@/components/UserBudget/BudgetUser";
import { Suspense } from "react";

export default async function Home() {
  const data = await getjobsAPi();
  return (
    <main className="h-[100vh]">
      <Header />
      <div className="md:w-[70%] w-full  ml-auto mr-auto">
        <div className="border border-gray-200 rounded-3xl mt-10 mb-10">
          <Boostproject />
        </div>
        <div className="flex justify-between gap-4 flex-wrap">
          <div className="flex-3   border border-gray-200 rounded-3xl">
            <Jobs data={data} />
          </div>
          <div className="hidden md:flex-1 md:flex  justify-center items-center  h-fit border border-gray-200 rounded-3xl cursor-pointer">
            <BudgetUser data={data} />
          </div>
        </div>
        <ModeToggle />
      </div>
    </main>
  );
}
