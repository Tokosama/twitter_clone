import Layout from "@/components/Layout";
import PostContent from "@/components/PostContent";
import PostForm from "@/components/PostForm";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

export default function Home() {
  const { userInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState([]);

  async function fetcHomePosts() {
    await axios.get("/api/posts").then((response) => {
      setPosts(response.data);
    });
  }
  useEffect(async () => {
    fetcHomePosts();
  }, []);

  if (userInfoStatus === "loading") {
    return "loading user info";
  }

  if (!userInfo?.username) {
    return (
      <>
        <UsernameForm />
      </>
    );
  }
  return (
    <div>
      <Layout>
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
                <div className=" border-t border-twitterBorder p-5">
                  <PostContent {...post} />
                </div>
              </>
            ))}
        </div>
      </Layout>
    </div>
  );
}
