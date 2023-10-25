import { ModeToggle } from "@/components/toggle-btn/Toggle-btn";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/headerHome/Header";
import Boostproject from "@/components/boostproject/Boostproject";
import Jobs from "@/components/jobs/Jobs";
import { getjobsAPi } from "@/APIs/APIS";

export default async function Home() {
  const data = await getjobsAPi(); 
  console.log("ghassen is the best ")
  return (
    <main className="h-[100vh]">
      <Header />
      <Boostproject />
      <Jobs data={data} />
      <ModeToggle />
    </main>
  );
}
