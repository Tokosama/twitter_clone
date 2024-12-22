import ReactTimeAgo from "react-time-ago"; //Permet de gerer la data de facon dynamique , ca gere laffiche de lheure/date en fonction des entrees que tu mets
import Avatar from "./Avatar";
import Link from "next/link";
import PostButtons from "./PostButtons";

export default function PostContent({
  text,
  author,
  createdAt,
  _id,
  likesCount,
  likedByMe,
  commentsCount,
  big = false,
}) {
  return (
    <>
      <div className="flex w-full ">
        <div>{!!author?.image && <Avatar src={author.image} />}</div>
        <div className="pl-2 grow ">
          <div>
            <span className="font-bold pr-1">{author.name} </span>
            {big && <br />}
            <span className="text-twitterLightGray">@{author.username} </span>
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
              <Link href={`/${author.username}/status/${_id}`}>
                <div className="w-full cursor-pointer"> {text}</div>
              </Link>
              <PostButtons
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
          <Link href={`/${author.username}/status/${_id}`}>{text}</Link>
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
