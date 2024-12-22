import Layout from "@/components/Layout";
import PostContent from "@/components/PostContent";
import PostForm from "@/components/PostForm";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";

import { useEffect, useState } from "react";

export default function Home() {
  const { userInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe,setIdsLikedByMe] = useState([]);


  function fetcHomePosts() {
     axios.get("/api/posts").then((response) => {
      setPosts(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
    });
  }
  useEffect(() => {
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
                  <PostContent {...post} likedByMe={idsLikedByMe.includes(post._id)} />
                </div>
              </>
            ))}
        </div>
      </Layout>
    </div>
  );
}
