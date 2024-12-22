import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UsernameForm() {
  const {userInfo,status} = useUserInfo();
  
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(()=>{

    if(status === 'loading'){return}
    if(username ===''){
      const defaultUsername = userInfo?.email?.split('@')[0];
      setUsername(defaultUsername.replace(/[^a-z]+/gi,''))
    }
  },[status])
  async function handleFormSubmit(e) {
    e.preventDefault();
    await fetch('/api/users',{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({username}),
    });
router.reload();
  }

  if(status === 'loading'){
    return '';
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <form className="text-center" onSubmit={(e)=>handleFormSubmit(e)}>
        <h1 className="text-xl">Pick a username</h1>
        <input
          type="text"
          placeholder={"username"}
          value={username}
          className="block mb-1 bg-twitterBorder px-3 py-1 rounded-full "
          onChange={(e) => {setUsername(e.target.value)}}
        />
        <button className="block bg-twitterBlue w-full rounded-full py-1">Continue</button>
      </form>
    </div>
  );
}
