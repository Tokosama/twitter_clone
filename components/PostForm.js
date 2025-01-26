import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useState } from "react";
import Avatar from "./Avatar";
import Upload from "./Upload";
import { PulseLoader } from "react-spinners";

export default function PostForm({
  onPost,
  compact,
  parent,
  placeholder = "Whats's happenning? ",
}) {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  if (status === "loading") {
    return "";
  }

  async function handlePostSubmit(e) {
    e.preventDefault();
    await axios.post("/api/posts", { text, parent, images });
    setText("");
    setImages([]);
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
          <Upload onUploadFinish={(src) => setImages((prev) => [...prev, src])}>
            {({ isUploading }) => (
              <div>
                <textarea
                  className={
                    (compact ? " mt-1 " : " ") +
                    "w-full p-2 bg-transparent text-twitterWhite focus:outline-none"
                  }
                  placeholder={placeholder}
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <div className="flex -mx-2">
                  {images.length > 0 &&
                    images.map((img) => (
                      <div className=" h-20 border  m-2" key={img}>
                        <img
                          src={img}
                          alt=""
                          className="h-20"
                        />
                      </div>
                    ))}
                  {isUploading && (
                    <div className="h-24 w-24 m-2 bg-twitterBorder flex items-center">
                      <PulseLoader
                        size={14}
                        color={"#fff"}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </Upload>

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
