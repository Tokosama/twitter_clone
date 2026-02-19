import useUserInfo from "@/hooks/useUserInfo";
import Link from "next/link";
import React, { useState } from "react";
import AddPost from "./AddPost";
import Avatar from "./Avatar";
import {
  BellDot,
  CircleEllipsis,
  Feather,
  House,
  Mail,
  Search,
  UserRound,
} from "lucide-react";
import PostForm from "./PostForm";

export default function Sidebar() {
  const { userInfo } = useUserInfo();

  const sidebarLinks = [
    {
      name: "Home",
      href: "/",
      icon: (
        <House
          size={26}
          color="white"
        />
      ),
    },
    // {
    //   name: "Explore",
    //   href: "#",
    //   icon: (
    //     <Search
    //       size={26}
    //       color="white"
    //     />
    //   ),
    // },
    // {
    //   name: "Notifications",
    //   href: "#",
    //   icon: (
    //     <BellDot
    //       size={26}
    //       color="white"
    //     />
    //   ),
    // },
    {
      name: "Follow",
      href: "/follow",
      icon: (
        <UserRound
          size={26}
          color="white"
        />
      ),
    },
    //{
    //   name: "Chat",
    //   href: "#",
    //   icon: (
    //     <Mail
    //       size={26}
    //       color="white"
    //     />
    //   ),
    // },

    {
      name: "Profile",
      href: `/${userInfo?.username}`,
      icon: (
        <UserRound
          size={26}
          color="white"
        />
      ),
    },
    // {
    //   name: "More",
    //   href: "#",
    //   icon: (
    //     <CircleEllipsis
    //       size={26}
    //       color="white"
    //     />
    //   ),
    // },
  ];
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="sm:block w-64 xl:w-auto relative border-black text-xl font-lg text-white pl-5 xl:pl-0 xl:pr-5 hidden">
      <div className="sticky top-4 ml-14 flex flex-col h-[calc(100vh-1rem)] overflow-x-auto">
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
              className="block my-2 py-1 pr-[12-px]"
            >
              <span className="h-11 xl:mr-3 inline-flex justify-center ml-2 items-center hover:bg-zinc-700 w-auto p-4 rounded-full  xl:rounded-3xl">
                {link.icon}

                <span className=" hidden xl:flex mt-1 ml-5">{link.name}</span>
              </span>
            </Link>
          ))}
        </div>
        {/* Tweet Button */}
        <button
          onClick={() => setOpenModal(true)}
          className="xl:w-52 my-3 w-12 h-12 py-5 mr-5  text-base font-semibold text-black bg-white rounded-full  flex justify-center items-center ml-3 "
        >
          <span className="xl:hidden">
            <Feather size={24} />
          </span>
          <span className="hidden xl:flex">Post</span>
        </button>
        {openModal && (
          <AddPost>
            <div className="">
              {/* overlay */}
              <div
                className="absolute inset-0 bg-[#242D34]/60"
                onClick={() => setOpenModal(false)}
              />

              {/* modal */}
              <div className="relative bg-black w-[600px] max-w-xl rounded-2xl pt-4 px-4 border border-[#2f3336]">
                {/* close button */}
                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute top-3 left-5 text-gray-400 hover:text-white"
                >
                  X
                </button>
                <div className="pt-5">
                  <PostForm
                    onPost={() => {
                      window.dispatchEvent(new Event("postCreated"));
                    }}
                  />
                </div>
              </div>
            </div>
          </AddPost>
        )}
        {/* User info */}
        <div className="flex items-center xl:w-56 text-base ml-4 mb-4 xl:ml-2 mr-3 mt-auto">
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
