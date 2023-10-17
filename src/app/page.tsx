"use client"
import { ModeToggle } from '@/components/toggle-btn/Toggle-btn'
import Image from 'next/image'
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="h-[100vh]">
        <NextUIProvider>
          <ModeToggle />
        </NextUIProvider>
      </main>
    )
}
