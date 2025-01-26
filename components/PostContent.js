import ReactTimeAgo from "react-time-ago"; //Permet de gerer la data de facon dynamique , ca gere laffiche de lheure/date en fonction des entrees que tu mets
import Avatar from "./Avatar";
import Link from "next/link";
import PostButtons from "./PostButtons";

export default function PostContent({
  username,
  text,
  author,
  createdAt,
  _id,
  likesCount,
  likedByMe,
  commentsCount,
  images,
  big = false,
}) {
  function showImages() {
    if(!images.length){
      return '';
    }
    return (
      <>
        <div className=" flex -mx-1 border items-center my-4 border-[#272A2D] rounded-xl overflow-hidden gap-[1px] ">
          {images?.length > 0 &&
            images.map((img) => (
              <>
                <div key={img} className=" h-full">
                  <img
                    src={img}
                    alt=""
                  />
                </div>
              </>
            ))}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex w-full ">
        <div>
          {!!author?.image && (
            <Link href={"/" + author?.username}>
              <div className="cursor-pointer">
                <Avatar src={author.image} />
              </div>
            </Link>
          )}
        </div>
        <div className="pl-2 grow ">
          <div>
            <Link href={"/" + author?.username}>
              <span className="font-bold pr-1">{author?.name} </span>
            </Link>
            {big && <br />}

            <Link href={"/" + author?.username}>
              <span className="text-twitterLightGray">
                @{author?.username}{" "}
              </span>
            </Link>

            {createdAt && !big && (
              <span className="pl-1 text-twitterLightGray">
                {" "}
                <ReactTimeAgo
                  date={createdAt}
                  timeStyle={"twitter"}
                />{" "}
              </span>
            )}
          </div>
          {!big && (
            <div>
              <Link href={`/${author?.username}/status/${_id}`}>
                <div className="w-full cursor-pointer">
                  <>
                    {text}
                    {showImages()}
                  </>
                </div>
              </Link>
              <PostButtons
                username={author?.username}
                id={_id}
                likesCount={likesCount}
                likedByMe={likedByMe}
                commentsCount={commentsCount}
              />
            </div>
          )}
        </div>
      </div>
      {big && (
        <div className="mt-2 ">
          <Link href={`/${author.username}/status/${_id}`}>
            <>
              {text}
              {showImages()}
            </>
          </Link>
          {createdAt && (
            <div className="text-twitterLightGray pl-1 ">
              {new Date(createdAt)
                .toISOString()
                .replace("T", " ")
                .slice(0, 16)
                .split(" ")
                .reverse()
                .join(" ")}
            </div>
          )}
          <PostButtons
            username={author.username}
            id={_id}
            likesCount={likesCount}
            likedByMe={likedByMe}
            commentsCount={commentsCount}
          />
        </div>
      )}
    </>
  );
}
