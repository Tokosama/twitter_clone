import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import TopNavLink from "@/components/TopNavLink";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import UserHoverCard from "@/components/UserHoverCard";
import { Clipboard } from "lucide-react";
import { ClipLoader } from "react-spinners";

export default function follow() {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [toggleCreator, setToggleCreator] = useState(false);
  const [usersCreator, setUsersCreator] = useState([]);
  const [loadingFollow, setLoadingFollow] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoadingFollow(true);

      const res = await fetch("/api/getAllUsersNotFollowed");
      const data = await res.json();
      setUsersToFollow(data);
      setLoadingFollow(false);
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    //setLoadingFollow(true);

    const shuffled = [...usersToFollow].sort(() => 0.5 - Math.random());
    setUsersCreator(shuffled.slice(0, 2));
    //setLoadingFollow(false);
  }, [usersToFollow]);

  return (
    <Layout>
      <div>
        <div className="px-5 pt-2 sticky top-0 left-0 w-full bg-transparent backdrop-blur-xl z-50">
          <div className="flex mb-1 cursor-pointer  items-center sticky top-0 left-0 w-full    bg-transparent backdrop-blur-xl z-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-left-icon lucide-arrow-left mr-6"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            <div className="">
              <span className="text-xl font-semibold">Follow</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-search-icon lucide-search ml-auto mr-4"
            >
              <path d="m21 21-4.34-4.34" />
              <circle
                cx="11"
                cy="11"
                r="8"
              />
            </svg>
          </div>{" "}
        </div>
        <div className="pt-2 sticky top-0 left-0 w-full bg-transparent backdrop-blur-xl z-50">
          <div className="sticky top-0 left-0 w-full grid grid-cols-2 text-center border-b border-twitterBorder bg-transparent backdrop-blur-xl z-50">
            <div
              onClick={async () => {
                setLoadingFollow(true);
                await new Promise((r) => setTimeout(r, 500)); // 👈 laisse React render

                setToggleCreator(false);
                setLoadingFollow(false);
              }}
              className="h-14 flex justify-center hover:bg-twitterBorder   items-center flex-col font-semibold"
            >
              <span
                className={`h-9  mt-3 ${!toggleCreator ? " border-b-[4px] border-twitterBlue " : "text-twitterLightGray "}`}
              >
                Who to follow{" "}
              </span>
            </div>
            <div
              onClick={async () => {
                setLoadingFollow(true);
                await new Promise((r) => setTimeout(r, 500)); // 👈 laisse React render

                setToggleCreator(true);
                setLoadingFollow(false);
              }}
              className="h-14 flex justify-center   hover:bg-twitterBorder  items-center flex-col font-semibold"
            >
              <span
                className={`h-9 mt-3 ${toggleCreator ? " border-b-[4px]  border-twitterBlue  " : " text-twitterLightGray"}`}
              >
                Creator for you
              </span>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="px-4 pt-2">
        {!toggleCreator && (
          <div className="py-3 font-semibold text-xl">Suggested for you</div>
        )}
        {loadingFollow ? (
          <div className="text-center pt-8">
            <ClipLoader
              className="text-center"
              color="white"
              size={24}
            />
          </div>
        ) : (
          (!toggleCreator ? usersToFollow : usersCreator).map((user, index) => (
            <div className="" key={index}>
              <div className="flex text-base py-3 cursor-pointer">
                <div className=" flex h-full justify-start align-top items-start">
                  <UserHoverCard user={user}>
                    {user.image ? (
                      <Avatar src={user?.image} />
                    ) : (
                      <CircleUser size={39} />
                    )}
                  </UserHoverCard>
                </div>
                <div className="w-full">
                  <div className="flex">
                    <UserHoverCard user={user}>
                      <Link
                        href={"/" + user?.username}
                        className=" ml-2 flex-col items-center"
                      >
                        <div className="font-semibold hover:underline flex ">
                          <span className="hover:underline mr-3">
                            {user.name}
                          </span>

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
                      className="bg-white rounded-3xl text-black px-4 text-sm  ml-auto font-semibold my-1"
                    >
                      {" "}
                      {!toggleCreator ? "Follow" : "Subscribe"}
                    </button>
                  </div>
                  <div className="ml-2 pt-2">{user.bio}</div>
                </div>
              </div>
            </div>
          ))
        )}{" "}
      </div>
    </Layout>
  );
}
