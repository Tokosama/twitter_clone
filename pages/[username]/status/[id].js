import Layout from "@/components/Layout";
import PostContent from "@/components/PostContent";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/posts?id=" + id).then((response) => {
      setPost(response.data.post);
    });
  }, [id]);
  return (
    <Layout>
      {!!post?._id && (
        <div className="px-5 py-2">
          <Link href={"/"}>
            <div className="flex mb-5 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-3 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Tweet
            </div>
          </Link>
          <PostContent {...post} big />
        </div>
      )}
    </Layout>
  );
}
