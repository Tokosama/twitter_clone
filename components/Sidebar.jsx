import useUserInfo from "@/hooks/useUserInfo";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";
import { Feather } from "lucide-react";

export default function Sidebar() {
  const { userInfo } = useUserInfo();

  const sidebarLinks = [
    { name: "Home", href: "/", icon: "/icons/icon_home.svg" },
    // { name: "Exploration", href: "#", icon: "/icons/icon_search.svg" },
    // { name: "Notifications", href: "#", icon: "/icons/icon_notification.svg" },
    // { name: "Messages", href: "#", icon: "/icons/icon_mail.svg" },
    // { name: "Lists", href: "#", icon: "/icons/icon_list.svg" },
    // { name: "Bookmarks", href: "#", icon: "/icons/icon_bookmark.svg" },
    // { name: "Verified", href: "#", icon: "/icons/icon_verified.svg" },
    {
      name: "Profile",
      href: `/${userInfo?.username}`,
      icon: "/icons/icon_profile.svg",
    },
    { name: "More", href: "#", icon: "/icons/icon_3dots.svg" },
  ];

  return (
    <div className="block xl:w-64  border-black text-xl font-lg text-white pl-5 xl:pl-0 xl:pr-5">
      <div className="top-4 sticky ml-4">
        {/* Logo */}
        <Link
          href="/"
          className="mt-2 pl-6"
        >
          <span className="h-11 inline-flex items-center hover:bg-zinc-700 w-auto rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-6 h-6 text-white hover:text-slate-100 transition-colors duration-200"
              fill="currentColor"
            >
              <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </span>
        </Link>

        {/* Links */}
        <div className="mt-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block my-2 p-1"
            >
              <span className="h-11 mr-3 inline-flex items-center hover:bg-zinc-700 w-auto p-4 rounded-full  xl:rounded-3xl">
                <img
                  src={link.icon}
                  className="mr-3 w-9 h-7"
                  alt={link.name}
                />
                <span className=" hidden xl:flex">{link.name}</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Tweet Button */}
        <button className="xl:w-52 my-3 px-3 text-base font-semibold text-black bg-white rounded-full h-12 flex justify-center items-center ml-3 ">
          <span className="xl:hidden">
            <Feather size={24} />
          </span>
          <span className="hidden xl:flex">Tweet</span>
        </button>

        {/* User info */}
        <div className="flex items-center xl:w-56 text-base ml-4 xl:ml-2 mr-3 mt-12 fixed bottom-3">
          <Avatar src={userInfo?.image} />
          <div className="hidden xl:flex flex-col items-start ml-2">
            <strong>{userInfo?.name}</strong>
            <span className="text-twitterLightGray">@{userInfo?.username}</span>
          </div>
          <img
            src={"/icons/icon_3dots.svg"}
            className="hidden xl:flex ml-auto w-5 h-5"
            alt="More"
          />
        </div>
      </div>
    </div>
  );
}
