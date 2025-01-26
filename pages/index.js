import Layout from "@/pages/Layout";
import PostContent from "@/components/PostContent";
import PostForm from "@/components/PostForm";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();

  const { userInfo, setUserInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);
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
    fetcHomePosts();
  }, []);

  if (userInfoStatus === "loading") {
    return "loading user info";
  }

  if (userInfo && !userInfo?.username) {
    return (
      <>
        <UsernameForm />
      </>
    );
  }

  if (!userInfo) {
    router.push("/login");
    return "no user info";
  }

  return (
    <div>
      <Layout>
        <div className="h-full">
          <h1 className="text-xl font-bold p-4">Home</h1>

          <PostForm
            onPost={() => {
              fetcHomePosts();
            }}
          />

          <div className="">
            {posts.length > 0 &&
              posts.map((post) => (
                <>
                  <div
                    key={post._id}
                    className=" border-t border-twitterBorder p-5"
                  >
                    {post.parent && (
                      <div>
                        <PostContent {...post.parent} />
                        <div className="relative h-8">
                          <div className="border-l-2 border-twitterBorder h-14 absolute ml-6 -top-6"></div>
                        </div>
                      </div>
                    )}
                    <PostContent
                      {...post}
                      likedByMe={idsLikedByMe.includes(post._id)}
                    />
                  </div>
                </>
              ))}
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
