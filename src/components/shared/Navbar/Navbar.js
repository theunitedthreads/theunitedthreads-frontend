/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "/public/logos/logo-normal.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import userImg from "/public/images/navbar/user.png";
// import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Shirt } from "lucide-react";
import { History } from "lucide-react";
import { LogOut } from "lucide-react";
import AnimateTextOnHover from "@/components/AnimateTextOnHover/AnimateTextOnHover";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import { usePathname, useRouter } from "next/navigation";
import { MessageCircleMore } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { logout, selectUser } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { MessageSquareText } from "lucide-react";
import { Badge } from "antd";
import { useSocket } from "@/context/SocketContextApi";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { transformNameInitials } from "@/utils/transformNameInitials";
import * as NProgress from "nprogress";
import { AlignJustify } from "lucide-react";
import MobileSidebar from "./Components/MobileSidebar";

// Links
const LINKS = [
  {
    key: "home",
    label: "Home",
    route: "/",
  },

  {
    key: "customApparels",
    label: "Custom Apparels",
    route: "/products",
  },
  {
    key: "shop",
    label: "Shop",
    route: "/shop",
  },
  {
    key: "about",
    label: "About",
    route: "/about",
  },
  {
    key: "contact",
    label: "Contact",
    route: "/contact",
  },
];

export default function Navbar() {
  const userId = useSelector(selectUser)?._id;
  const router = useRouter();
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const [showNotificationCount, setShowNotificationCount] = useState(0);
  const [showMsgNotificationDot, setShowMsgNotificationDot] = useState(false);
  const pathName = usePathname();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
    router.push("/");
  };

  // ============== Get User Profile Info ====================
  const { data: userProfileRes } = useGetProfileQuery(null, { skip: !userId });
  const userProfile = userProfileRes?.data || "";

  // =================== Listen to `new-message`socket event for notification ============
  const newMessageHandler = async (res) => {
    console.log("new message ========> ", res);
    if (res?.sender !== userId && pathName !== "/chat" && res?.seen === false) {
      setShowMsgNotificationDot(true);
    } else {
      setShowMsgNotificationDot(false);
    }
  };

  useEffect(() => {
    if (socket && userId) {
      socket.on(`new-message::${userId}`, newMessageHandler);
    }

    return () => {
      socket?.off(`new-message::${userId}`, newMessageHandler);
    };
  }, [socket, userId]);

  // ================== Listen to `notification::userId` notifications ============
  const notificationCountHandler = async (res) => {
    setShowNotificationCount(res?.meta?.total);

    if (res?.meta?.total > 0) {
      toast.info(res?.data?.title, {
        description: res?.data?.message,
        duration: 2500,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    if (socket && userId) {
      socket.on(`notification::${userId}`, notificationCountHandler);
    }

    return () => {
      socket?.off(`notification::${userId}`, notificationCountHandler);
    };
  }, [socket, userId]);

  // Clear message notification dot if pathname /chat
  useEffect(() => {
    if (pathName === "/chat") {
      setShowMsgNotificationDot(false);
    }
  }, [pathName]);

  return (
    <header className="mb-10 mt-8 lg:mb-20">
      {/* -------------- Desktop Version ------------- */}
      <div className="mx-auto hidden items-center justify-between rounded-2xl bg-lightGray px-4 py-5 lg:flex lg:w-[85%] 2xl:w-3/4">
        {/* Left ----- Logo */}
        <Link href="/" className="w-1/4">
          <Image src={logo} alt="Logo" className="mx-auto w-[70%]" />
        </Link>

        {/* Center ------ Links */}
        <div className="flex flex-grow items-center justify-center gap-x-10">
          {LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.route}
              className="font-medium text-primary-black"
            >
              <AnimateTextOnHover path={link.route}>
                {link.label}
              </AnimateTextOnHover>
            </Link>
          ))}
        </div>

        {/* Right -------- User sign up */}
        <div className="flex w-[20%] items-center justify-center">
          {userId ? (
            <div className="flex items-center gap-x-6">
              {/* Notification */}
              <Link
                href="/notification"
                className="relative pt-1"
                title="notifications"
              >
                <Badge
                  count={showNotificationCount}
                  showZero={false}
                  overflowCount={10}
                >
                  <Bell />
                </Badge>
              </Link>

              {/* Message */}
              <button
                onClick={() => {
                  NProgress.start(); // to show top progress bar
                  router.push("/chat");
                  setShowMsgNotificationDot(false);
                }}
                className="relative pt-1"
                title="notifications"
              >
                <Badge
                  dot={showMsgNotificationDot}
                  style={{ height: "10px", width: "10px" }}
                >
                  <MessageSquareText />
                </Badge>
              </button>

              {/* ---------- User profile --------------- */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border-none outline-none ring-0">
                    <Avatar className="">
                      <AvatarImage src={userProfile?.profilePicture} />
                      <AvatarFallback className="border border-primary-black/25 bg-slate-50">
                        {transformNameInitials(
                          "",
                          userProfile?.firstName,
                          userProfile?.lastName,
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="space-y-1 rounded-xl p-2 lg:mr-20">
                    <DropdownMenuItem asChild>
                      <Link href="/user/profile">
                        <User size={20} strokeWidth={1.5} className="mr-2" />
                        Personal Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/user/shop-history">
                        <Shirt size={20} strokeWidth={1.5} className="mr-2" />
                        Shop History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/user/quote-history">
                        <History size={20} strokeWidth={1.5} className="mr-2" />
                        Quote History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut size={20} strokeWidth={1.5} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <Button size="lg" className="primary-button" asChild>
              <Link
                href="/login"
                className="group flex items-center gap-x-1 transition-all duration-200"
              >
                Sign In
                <AnimatedArrow arrowSize={17} />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile & Tablet Version */}
      <>
        <div className="block h-14 w-full px-5 md:px-10 lg:hidden">
          <div className="flex-center-between h-full w-full rounded-full bg-lightGray px-3">
            {/* Left - Menu Icon */}
            <div className="h-full w-[30%]">
              <button
                className="flex h-full w-max items-center"
                onClick={() => setShowMobileSidebar(true)}
              >
                <AlignJustify size={22} />
              </button>
            </div>
            {/* Center - Logo */}
            <Link href="/" className="flex-center h-full w-1/3 md:p-8">
              <Image
                src={logo}
                alt="Logo of United Threads"
                height={1200}
                width={1200}
                className="h-auto w-auto"
              />{" "}
            </Link>

            {/* Right */}
            <div className="flex h-full w-1/3 items-center justify-end pt-1">
              {userId ? (
                <div className="flex items-center gap-x-3">
                  {/* Notification */}
                  <Link
                    href="/notification"
                    className="relative pt-1"
                    title="notifications"
                  >
                    <Badge
                      count={showNotificationCount}
                      showZero={false}
                      overflowCount={10}
                    >
                      <Bell size={16} />
                    </Badge>
                  </Link>

                  {/* Message */}
                  <button
                    onClick={() => {
                      NProgress.start(); // to show top progress bar
                      router.push("/chat");
                      setShowMsgNotificationDot(false);
                    }}
                    className="relative pt-1"
                    title="notifications"
                  >
                    <Badge
                      dot={showMsgNotificationDot}
                      style={{ height: "5px", width: "5px" }}
                    >
                      <MessageSquareText size={16} />
                    </Badge>
                  </button>

                  {/* ---------- User profile --------------- */}
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border-none outline-none ring-0">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={userProfile?.profilePicture} />
                          <AvatarFallback className="border border-primary-black/25 bg-slate-50">
                            {transformNameInitials(
                              "",
                              userProfile?.firstName,
                              userProfile?.lastName,
                            )}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="space-y-1 rounded-xl p-2 lg:mr-20">
                        <DropdownMenuItem asChild>
                          <Link href="/user/profile">
                            <User
                              size={20}
                              strokeWidth={1.5}
                              className="mr-2"
                            />
                            Personal Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/user/shop-history">
                            <Shirt
                              size={20}
                              strokeWidth={1.5}
                              className="mr-2"
                            />
                            Shop History
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/user/quote-history">
                            <History
                              size={20}
                              strokeWidth={1.5}
                              className="mr-2"
                            />
                            Quote History
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut
                            size={20}
                            strokeWidth={1.5}
                            className="mr-2"
                          />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ) : (
                <Button
                  size="lg"
                  className="primary-button ml-auto w-3/4 rounded-full py-4"
                  asChild
                >
                  <Link
                    href="/login"
                    className="group flex items-center gap-x-1 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          open={showMobileSidebar}
          setOpen={setShowMobileSidebar}
        />
      </>
    </header>
  );
}
