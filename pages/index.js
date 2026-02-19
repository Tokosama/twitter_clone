import Layout from "@/pages/Layout";
import PostContent from "@/components/PostContent";
import PostForm from "@/components/PostForm";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Spinner from "@/components/Spinner";

export default function Home() {
  const { data: session } = useSession();

  const { userInfo, setUserInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [postButtonLoading, setPostButtonLoading] = useState(false);
  const [toggleFollow, setToggleFollow] = useState(false);
  const router = useRouter();
  function fetcHomePosts() {
    axios.get("/api/posts").then((response) => {
      setPosts(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
    });
  }

  async function logout() {
    setUserInfo(null);
    await signOut();
  }

  useEffect(() => {
    setPostLoading(true);
    fetcHomePosts();
    function reload() {
      fetcHomePosts();
    }
    window.addEventListener("postCreated", reload);

    setPostLoading(false);
    return () => {
      window.removeEventListener("postCreated", reload);
    };
  }, []);

  if (userInfoStatus === "loading") {
    return (
      <div className=" w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (userInfo && !userInfo?.username) {
    return (
      <>
        <UsernameForm />
      </>
    );
  }
  console.log("/////////////////////////////////////", userInfo);
  if (!userInfo) {
    router.push("/login");
    return (
      <div className=" w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Layout>
        <div className="h-full">
          <div className="sticky top-0 left-0 w-full grid grid-cols-2 text-center border-b border-twitterBorder bg-transparent backdrop-blur-xl z-50">
            <div
              onClick={() => {
                setToggleFollow(false);
              }}
              className="h-14 flex justify-center hover:bg-twitterBorder   items-center flex-col font-semibold"
            >
              <span
                className={`h-9  mt-3 ${!toggleFollow ? " border-b-[4px] border-twitterBlue " : "text-twitterLightGray "}`}
              >
                For you{" "}
              </span>
            </div>
            <div
              onClick={() => {
                setToggleFollow(true);
              }}
              className="h-14 flex justify-center   hover:bg-twitterBorder  items-center flex-col font-semibold"
            >
              <span
                className={`h-9 mt-3 ${toggleFollow ? " border-b-[4px]  border-twitterBlue  " : " text-twitterLightGray"}`}
              >
                Following
              </span>
            </div>
          </div>
          <div className="px-5">
            <PostForm
              onPost={() => {
                fetcHomePosts();
              }}
            />
          </div>

          <div className="">
            {postButtonLoading ? (
              <Spinner />
            ) : (
              posts.length > 0 &&
              posts.map((post, index) => (
                <>
                  <div
                    key={post._id}
                    className=" border-t border-twitterBorder p-5"
                  >
                    {post.parent && (
                      <div>
                        <PostContent
                          {...post.parent}
                          showLine={!!post.parent}
                        />
                      </div>
                    )}
                    <PostContent
                      {...post}
                      likedByMe={idsLikedByMe.includes(post._id)}
                      showLine={false}
                    />
                  </div>
                </>
              ))
            )}
          </div>
          {userInfo && (
            <div className="p-5 text-center border-t border-twitterBorder">
              <button
                className="bg-twitterWhite text-black px-5 py-2 rounded-full"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}
