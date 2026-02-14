import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function UsernameForm() {
  const { userInfo, status } = useUserInfo();

  const [username, setUsername] = useState("");
  const router = useRouter();
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (username === "") {
      const defaultUsername = userInfo?.email?.split("@")[0];
      setUsername(defaultUsername.replace(/[^a-z]+/gi, ""));
    }
  }, [status]);
  async function handleFormSubmit(e) {
    setButtonLoading(true);
    e.preventDefault();
    await fetch("/api/users", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username }),
    });
    router.reload();
  }

  if (status === "loading") {
    return "";
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="text-center"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <h1 className="text-xl mb-5 ">Pick a username</h1>
        <input
          type="text"
          placeholder={"username"}
          value={username}
          className="block mb-1 bg-white  text-black px-3 w-72 text-center py-1 rounded-full "
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button className="block bg-twitterBlue text-white w-48 mt-2 px-4 py-1 mx-auto rounded-full ">
          {buttonLoading ? (
            <ClipLoader
              color="white"
              size={20}
            />
          ) : (
            <>Continue</>
          )}
        </button>
      </form>
    </div>
  );
}
