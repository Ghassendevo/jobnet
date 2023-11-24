"use client";
import { BackpackIcon, BellIcon, HomeIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { usePathname } from "next/navigation";
import { Input } from "@nextui-org/react";
import io from "socket.io-client";
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
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next-nprogress-bar";
import { Badge, Avatar } from "@nextui-org/react";
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { getNotification } from "@/APIs/APIS";
import Link from "next/link";

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
  const [notification, setNotification] = useState([]);
  const usersession = useSelector((state: RootState) => state.session.data);

  useEffect(() => {
    const data = localStorage.getItem("session");
    const fetchNoti = async (id: string) => {
      let data = await getNotification(id);
      // if (data.length > 0) {
      //   const notificationExists = notification.some((n) => n._id === data._id);
      //   if (!notificationExists && data.length > 0) {
      //     setNotification((prev) => [...prev, data]);
      //   }
      // }
    };
    if (data) {
      const n = JSON.parse(data);
      setUserData(n);
      fetchNoti(n._id);
    } else {
      router.push("/login");
    }
    const socket = io("http://localhost:3001");
    const handleNotification = (d) => {
      if (d.user === JSON.parse(data)._id) {
        setNotification((prevNotification) => [...prevNotification, d]);
        console.log(notification.length);
      }
    };
    socket.on("receive_notification", handleNotification);
    return () => {
      socket.off("receive_notification", handleNotification);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("session");
  };
  const notiNotView = () => {
    let noti = notification.filter((notification) => !notification.viewed);
    return noti;
  };
  const viewNotification = () => {
    setNotification((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        viewed: true,
      }))
    );
  };
  const [position, setPosition] = React.useState("jobs");
  return (
    <div className="shadow-sm h-16 flex justify-between pl-36 pr-36 items-center">
      <div className="logo">
        <h3 className="text-black">JobNet</h3>
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
                  <Button
                    variant="outline"
                    className="rounded-lg w-[15vh]"
                    size={"sm"}
                  >
                    for {position}
                  </Button>
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
          <Link href={"/"}>
            <m.div
              whileHover={{
                borderBottom: "3px solid #facc15",
              }}
              className={[
                "pb-2 pt-2 border-3 border-none cursor-pointer ",
                pathname == "/" ? "border-b-yellow-400" : "",
              ].join(" ")}
            >
              <HomeIcon className="text-black h-6 w-6 dark:text-white" />
            </m.div>
          </Link>
          <m.div
            whileHover={{
              borderBottom: "3px solid #facc15",
            }}
            className={[
              "pb-2 pt-2 border-3  cursor-pointer border-none  ",
              pathname == "/jobs" ? "border-b-yellow-400" : "",
            ].join(" ")}
          >
            <BackpackIcon className="text-black h-6 w-6 dark:text-white" />
          </m.div>
          <Menubar className="border-none shadow-none">
            <MenubarMenu>
              <MenubarTrigger>
                <m.div
                  onClick={viewNotification}
                  whileHover={{
                    borderBottom: "3px solid #facc15",
                  }}
                  className={[
                    "pb-2 pt-2 border-3  cursor-pointer border-none",
                    pathname == "/notification" ? "border-b-yellow-400" : "",
                  ].join(" ")}
                >
                  <Badge
                    content={
                      notiNotView().length != 0 ? notiNotView().length : null
                    }
                    color="danger"
                  >
                    <BellIcon className="text-black h-6 w-6 dark:text-white" />
                  </Badge>
                </m.div>
              </MenubarTrigger>
              <MenubarContent>
                {notification.length > 0 &&
                  notification
                    .slice()
                    .reverse()
                    .map((val, index) => {
                      const timeAgo = formatDistanceToNow(new Date(val.date), {
                        addSuffix: true,
                      });
                      return (
                        <>
                          <MenubarItem
                            key={index}
                            className="p-5 hover:cursor-pointer"
                          >
                            <Link href={`/job?id=${val._id}`}>
                              {" "}
                              <div className=" flex flex-row justify-between  gap-5">
                                <div className="flex flex-col gap-2">
                                  <p>
                                    {val.userFullname} applied for your job{" "}
                                  </p>
                                  <p className="text-gray-600 text-xs">
                                    Job ID: #{val._id}
                                  </p>
                                  <p className="text-gray-600 text-xs">
                                    {/* {timeAgo} */}
                                  </p>
                                </div>
                                <span className="bg-blue-600 w-[8px] h-[8px] text-blue-600 rounded-full">
                                  {""}
                                </span>
                              </div>
                            </Link>
                          </MenubarItem>
                          {index != notification.length - 1 && (
                            <MenubarSeparator />
                          )}
                        </>
                      );
                    })}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
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
