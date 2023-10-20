"use client";
import { BackpackIcon, BellIcon, HomeIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { usePathname } from "next/navigation";
import { Input } from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next-nprogress-bar";
import { Button } from "../ui/button";
interface sessionData {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  username: string;
  _id: string;
}

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [userData, setUserData] = useState<sessionData>();
  useEffect(() => {
    const data = localStorage.getItem("session");
    if (data) {
      const n = JSON.parse(data);
      setUserData(n);
    } else {
      router.push("/login");
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("session");
  };
  const [position, setPosition] = React.useState("jobs");
  return (
    <div className="shadow-sm h-16 flex justify-between pl-36 pr-36 items-center">
      <div className="logo">
        <h3 className="text-black  ">JobNet</h3>
      </div>
      <div className="menu flex flex-row w-[60%]  justify-between gap-4">
        <div className="search flex items-center  justify-center">
          <Input
            size="md"
            type="email"
            variant="bordered"
            placeholder="Search..."
            className="w-full"
            endContent={
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-lg w-[15vh]" size={"sm"} >for {position}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Search type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="jobs">
                      Jobs
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="talents">
                      Talents
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            }
          />
        </div>
        <div className="icons flex items-center justify-between  w-[50%] gap-4">
          <m.div
            whileHover={{
              borderBottom: "3px solid #facc15",
            }}
            className={[
              "pb-2 pt-2 border-3 border-white cursor-pointer ",
              pathname == "/" ? "border-b-yellow-400" : "",
            ].join(" ")}
          >
            <HomeIcon className="text-black h-6 w-6" />
          </m.div>
          <m.div
            whileHover={{
              borderBottom: "3px solid #facc15",
            }}
            className={[
              "pb-2 pt-2 border-3 border-white cursor-pointer  ",
              pathname == "/jobs" ? "border-b-yellow-400" : "",
            ].join(" ")}
          >
            <BackpackIcon className="text-black h-6 w-6" />
          </m.div>
          <m.div
            whileHover={{
              borderBottom: "3px solid #facc15",
            }}
            className={[
              "pb-2 pt-2 border-3 border-white cursor-pointer  ",
              pathname == "/notification" ? "border-b-yellow-400" : "",
            ].join(" ")}
          >
            <BellIcon className="text-black h-6 w-6" />
          </m.div>
        </div>
      </div>
      <div className="avatar">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>{userData?.username}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Setting</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem("session"), router.push("/login");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
