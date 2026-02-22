import { BadgeCheck, CircleUser } from "lucide-react";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import axios from "axios";
import Link from "next/link";
import UserHoverCard from "./UserHoverCard";
//import icon_3dots from "./icons/icon_3dots.svg"
//import user from "./icons/user.svg"

const termsAndPolicy = [
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Accessibility",
  "Ads info",
  "More... © 2026 X Corp.",
];

export default function Trend() {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [refreshUsers, setRefreshUsers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  function toggleFollow(id) {
    setIsFollowing((prev) => !prev);

    axios.post("/api/followers", {
      destination: id,
    });
    setUsersToFollow((prev) => prev.filter((u) => u._id !== id));

    setRefreshUsers((v) => {
      return v + 1;
    });
  }
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/getUsersNotFollowed");
      const data = await res.json();
      setUsersToFollow(data);
    }

    fetchUsers();
  }, []);
  return (
    <div className="mx-5 hidden xs:visible">
      <div className="  mt-3  border border-twitterBorder text-white w-80 pt-4 flex flex-col h-auto rounded-2xl overflow-hidden">
        <div className="text-xl font-extrabold mb-3 px-4 ">Trends for you</div>
        <div className=" mt pb-3 -3 px-4 hover:bg-zinc-700">
          <div className=" flex text-sm items-center">
            {" "}
            <span>
              <small>Trending in Benin</small>
            </span>{" "}
            <button className="ml-auto mr-3 rounded-full p- hover:bg-blue-950">
              <img
                className="  w-5 h-5  "
                alt=""
              />
            </button>
          </div>
          <div className="text-lg font-extrabold">Nigeria</div>
          <div className="text-sm">
            <small>172k tweets</small>
          </div>
        </div>
        <div className=" py-3 px-4 hover:bg-zinc-700">
          <div className=" flex text-sm items-center">
            {" "}
            <span>
              <small>Trending in Benin</small>
            </span>{" "}
            <button className="ml-auto mr-3 rounded-full p- hover:bg-blue-950">
              <img
                className="  w-5 h-5  "
                alt=""
              />
            </button>
          </div>
          <div className="text-lg font-extrabold">Nigeria</div>
          <div className="text-sm">
            <small>172k tweets</small>
          </div>
        </div>
        <div className=" text-lg  py-4 p-4 hover:bg-zinc-700 ">Show more</div>
      </div>
      <div className="  mt-3 px-4  border border-twitterBorder text-white w-80  flex flex-col h-auto rounded-2xl overflow-hidden ">
        <div className="text-xl my-3 font-bold mb-3  ">Who to follow</div>
        {usersToFollow.map((user, index) => (
          <div
            className="flex items-center  text-base py-3 cursor-pointer"
            key={index}
          >
            <UserHoverCard user={user}>
              {user.image ? (
                <Avatar src={user?.image} />
              ) : (
                <CircleUser size={39} />
              )}
              <Link
                href={"/" + user?.username}
                className=" ml-2 flex-col items-center"
              >
                <div className="font-semibold hover:underline flex ">
                  <span className="hover:underline mr-3">{user.name}</span>

                  {user.verified && (
                    <BadgeCheck
                      size={24}
                      color="black"
                      fill="#1D9BF0"
                      className="ml-"
                    />
                  )}
                </div>
                <div className="text-twitterLightGray text-sm">
                  @{user.username}
                </div>
              </Link>
            </UserHoverCard>

            <button
              onClick={() => toggleFollow(user._id)}
              className="bg-white rounded-3xl text-black px-4 text-sm py-2 ml-auto font-semibold"
            >
              {" "}
              Follow
            </button>
          </div>
        ))}

        <div className=" text-twitterBlue hover:bg-zinc-700 my-3">
          Show more
        </div>
      </div>
      <div className="px-4 py-6 text-twitterLightGray flex-wrap  w-80 text-xs">
        {termsAndPolicy.map((term, index) => (
          <div className="inline-flex my-1" key={index}>
            <span className="mr-3">{term}</span>
            {index != termsAndPolicy.length - 1 && (
              <span className="mr-3">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
