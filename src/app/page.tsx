"use client";
import { ModeToggle } from "@/components/toggle-btn/Toggle-btn";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/headerHome/Header";
import Boostproject from "@/components/boostproject/Boostproject";

export default function Home() {
  return (
    <main className="h-[100vh]">
      <Header />
      <Boostproject/>
    </main>
  );
}
