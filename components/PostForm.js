import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useState } from "react";
import Avatar from "./Avatar";

import Upload from "./Upload";
import { ClipLoader, PulseLoader } from "react-spinners";
import { Image, Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";

export default function PostForm({
  onPost,
  compact,
  parent,
  placeholder = "What's happenning? ",
}) {
  const [postLoading, setPostLoading] = useState(false);

  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  if (status === "loading") {
    return "";
  }

  const addEmoji = (emoji) => {
    // emoji est un objet {native: "😄", id: "...", ...}
    setText((prev) => prev + emoji.native);
  };
  async function handlePostSubmit(e) {
    setPostLoading(true);
    e.preventDefault();
    await axios.post("/api/posts", { text, parent, images });
    setText("");
    setImages([]);
    if (onPost) {
      onPost();
    }
    setPostLoading(false);
  }
  return (
    <form
      className=" my-5"
      onSubmit={handlePostSubmit}
    >
      <div className={(compact ? "items-center " : " ") + "flex "}>
        <div className="">
          <Avatar src={userInfo?.image} />
        </div>
        <div className="grow pl-2 ">
          <Upload onUploadFinish={(src) => setImages((prev) => [...prev, src])}>
            {({ isUploading, openFileDialog }) => (
              <div>
                <textarea
                  className={
                    (compact ? " mt-1 " : " ") +
                    "resize-none min-h-24 w-full p-2 text-xl bg-transparent text-twitterWhite focus:outline-none"
                  }
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  placeholder={placeholder}
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <div className="flex -mx-2">
                  {images.length > 0 &&
                    images.map((img) => (
                      <div
                        className=" h-20 border  m-2"
                        key={img}
                      >
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
        </div>
        {compact && (
          <div className="pl-2 ">
            <button className="bg-white text-black font-semibold px-5 py-1 rounded-full ">
              {postLoading ? (
                <ClipLoader
                  color="#26282A"
                  size={20}
                />
              ) : (
                "Post"
              )}
            </button>
          </div>
        )}
      </div>

      {!compact && (
        <div className="text-right border-t border-twitterBorder py-2 flex justify-between pt-4 ">
          <div className="flex gap-3">
            <Upload
              onUploadFinish={(src) => setImages((prev) => [...prev, src])}
            >
              {({ openFileDialog }) => (
                <button
                  type="button"
                  onClick={openFileDialog}
                  className="mt-2"
                >
                  <Image
                    size={22}
                    color="#308CD8"
                  />
                </button>
              )}
            </Upload>

            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className=""
            >
              <Smile
                size={22}
                color="#308CD8"
              />
            </button>

            {showEmojiPicker && (
              <div className="absolute z-50">
                <Picker
                  data={emojiData}
                  onEmojiSelect={addEmoji}
                />
              </div>
            )}
          </div>

          <button className="bg-white text-black font-semibold px-5 py-1 rounded-full ">
            {postLoading ? (
              <ClipLoader
                color="#26282A"
                size={20}
              />
            ) : (
              "Post"
            )}{" "}
          </button>
        </div>
      )}
    </form>
  );
}
