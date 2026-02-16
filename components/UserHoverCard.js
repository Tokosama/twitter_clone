import { useState } from "react";

export default function UserHoverCard({ children, user }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex "
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}

      {open && (
        <div className="absolute z-50   mt-11 ml-[-71px] w-72 rounded-2xl border border-[#2f3336] bg-black p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <img
              src={user.image}
              className="w-12 h-12 rounded-full"
            />

            <button className="px-4 py-1 rounded-full border border-gray-500 text-sm hover:bg-gray-800">
              Follow
            </button>
          </div>

          <div className="mt-2">
            <div className="font-bold">{user.name}</div>
            <div className="text-gray-400 text-sm">@{user.username}</div>
          </div>

          {user.bio && <p className="mt-2 text-sm">{user.bio}</p>}

          <div className="flex gap-4 mt-3 text-sm">
            <span>
              <b>{user.following}</b> Following
            </span>
            <span>
              <b>{user.followers}</b> Followers
            </span>
          </div>

          <button className="w-full mt-4 border border-[#2f3336] rounded-full py-2 text-sm hover:bg-gray-900">
            Profile Summary
          </button>
        </div>
      )}
    </div>
  );
}
