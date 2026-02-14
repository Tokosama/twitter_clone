import Link from "next/link";

export default function TopNavLink({ title = "Tweet", url = "/", length }) {
  return (
    <Link href={url} className="sticky bg-red-300">
      <div className="flex mb-1 cursor-pointer  items-center sticky top-0 left-0 w-full    bg-transparent backdrop-blur-xl z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-arrow-left-icon lucide-arrow-left mr-6"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        <div className="">
          <span className="text-xl font-bold">{title}</span>

          <div className="font-normal text-twitterLightGray"> {length} posts</div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-search-icon lucide-search ml-auto mr-4"
        >
          <path d="m21 21-4.34-4.34" />
          <circle
            cx="11"
            cy="11"
            r="8"
          />
        </svg>
      </div>
    </Link>
  );
}
