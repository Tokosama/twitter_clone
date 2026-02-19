import Link from "next/link";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { ClipLoader } from "react-spinners";
import { House, LogOut, Plus, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";

export default function MobileTopComponent({ profileInfo }) {
  const [open, setOpen] = useState(false);
  const [followerStats, setFollowerStats] = useState({
    followers: 0,
    following: 0,
  });
  const sidebarLinks = [
    {
      name: "Profile",
      href: `/${profileInfo?.username}`,
      icon: (
        <UserRound
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
  useEffect(() => {
    async function loadFollowStats() {
      try {
        const res = await fetch(`/api/follow-stats?userId=${profileInfo?._id}`);
        const data = await res.json();
        setFollowerStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadFollowStats();
  }, [profileInfo]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  async function logout() {
    await signOut();
  }
  return (
    <>
      <div className="sm:hidden px-4 top-0 left-0 w-full  text-center border-t border-twitterBorder bg-transparent backdrop-blur-xl z-50 ">
        <div
          onClick={() => {
            // setToggleFollow(false);
          }}
          className="  relative flex     items-center  font-semibold"
        >
          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Avatar />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 h-11 inline-flex items-center hover:bg-zinc-700 w-auto rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-6 h-6 text-white hover:text-slate-100 transition-colors duration-200"
              fill="currentColor"
            >
              <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </span>
          <div
            //href={"/#"}
            className="block my-2 py-1 pr-[12-px] ml-auto"
          >
            <button className=" border border-twitterBorder text-white font-semibold px-5 py-1 rounded-full ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-[#242D34] z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-black border-r border-twitterBorder z-[9999]
  transform transition-transform duration-300 overflow-y-auto
  ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 font-bold text-xl ">
          <div className=" ">
            <div className=" border-4 mb-1 rounded-full border-black flex items-center justify-between">
              <Link href={`/${profileInfo?.username}`}>
                <Avatar
                  src={profileInfo.image}
                  //editable={isMyProfile}
                  onChange={(src) => updateUserImage("image", src)}
                />
              </Link>
              <span className="border border-twitterLightGray rounded-full p-1">
                <Plus size={21} />
              </span>
            </div>
          </div>
          <h1 className="font-bold text-lg leading-5 ml-1">
            {profileInfo.name}
          </h1>
          <div className="ml-1">
            <div className="text-twitterLightGray text-sm ">
              @{profileInfo.username}
            </div>

            <div className="text-sm  text-twitterLightGray mt-4">
              <span className="text-white mr-1">{followerStats.following}</span>
              Following
              <span className="text-white ml-4 mr-1">
                {followerStats.followers}
              </span>
              {followerStats.followers <= 0 ? "Follower" : "Followers"}
            </div>
          </div>{" "}
        </div>

        <div className="px-4 space-y-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block my-2 py-1 pr-[12-px]"
            >
              <span className="h-11 xl:mr-3 inline-flex justify-center  items-center hover:bg-zinc-700 w-auto p-1 rounded-full  xl:rounded-3xl">
                {link.icon}

                <span className=" text-xl font-semibold ml-5">{link.name}</span>
              </span>
            </Link>
          ))}
          <button className="block my-2 py-1 pr-[12-px]" onClick={logout}>
            <span className="h-11 xl:mr-3 inline-flex justify-center  items-center hover:bg-zinc-700 w-auto p-1 rounded-full  xl:rounded-3xl">
              <LogOut size={26} />
              <span className=" text-xl font-semibold ml-5">Log out</span>
            </span>
          </button>
        </div>
        <div className="border-b-[0.5px] mb-20 mx-8 border-twitterLightGray"></div>
      </div>
    </>
  );
}
