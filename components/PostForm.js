import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useState } from "react";
import Avatar from "./Avatar";

export default function PostForm({
  onPost,
  compact,
  parent,
  placeholder = "Whats's happenning? ",
}) {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState("");
  if (status === "loading") {
    return "";
  }

  async function handlePostSubmit(e) {
    e.preventDefault();
    await axios.post("/api/posts", { text,parent });
    setText("");
    if (onPost) {
      onPost();
    }
  }
  return (
    <form
      className="mx-5"
      onSubmit={handlePostSubmit}
    >
      <div className={(compact ? "items-center " : " ") + "flex "}>
        <div className="">
          <Avatar src={userInfo?.image} />
        </div>
        <div className="grow pl-2 ">
          <textarea
            className={
              (compact ? "h-10 mt-1 " : "h-24 ") +
              "w-full p-2 bg-transparent text-twitterWhite "
            }
            placeholder={placeholder}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          {!compact && (
            <div className="text-right border-t border-twitterBorder py-2 ">
              <button className="bg-twitterBlue text-white px-5 py-1 rounded-full ">
                tweet
              </button>
            </div>
          )}
        </div>
        {compact && (
          <div className="pl-2 ">
            <button className="bg-twitterBlue text-white px-5 py-1 rounded-full ">
              tweet
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
