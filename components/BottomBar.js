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

export default function BottomNavBar() {
  const { userInfo } = useUserInfo();

  const bottomBarLink = [
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
    {
      name: "Explore",
      href: "#",
      icon: (
        <Search
          size={26}
          color="white"
        />
      ),
    },
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
    {
      name: "Chat",
      href: "#",
      icon: (
        <Mail
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
  const [toggleFollow, setToggleFollow] = useState(false);

  return (
    <div className="fixed  sm:hidden bottom-0 left-0 w-full grid grid-cols-5 text-center border-t border-twitterBorder bg-transparent backdrop-blur-xl z-50">
      {bottomBarLink.map((link, index) => (
        <>
          <div
            onClick={() => {
              setToggleFollow(false);
            }}
            className=" flex justify-center hover:bg-twitterBorder   items-center flex-col font-semibold"
          >
            <Link
              key={link.name}
              href={link.href}
              className="block my-2 py-1 pr-[12-px]"
            >
              <span className={`h-9  mt-3 `}>
                <span className=" inline-flex justify-center ml-2 items-center hover:bg-zinc-700 w-auto  rounded-full  xl:rounded-3xl">
                  {link.icon}
                </span>
              </span>
            </Link>
          </div>
        </>
      ))}
    </div>
  );
}
