import { getProviders, signIn, useSession } from "next-auth/react"; //getProviders est une fonction de la bibliothèque NextAuth.js qui permet de récupérer la liste des fournisseurs d'authentification configurés dans ton application. Ces fournisseurs peuvent inclure des services comme Google, GitHub, Facebook, ou même des fournisseurs personnalisés.
import { useRouter } from "next/router";
export default function LoginPage({ providers }) {
  const {data,status} = useSession();
  const router = useRouter();
  if(status ==='loading'){

    return '';
  };
  if(data){
    router.push('/')
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {Object.values(providers).map((provider) => (
          <>
            <div key={provider.id}>
              <button onClick={async()=>{
                await signIn(provider.id)
              }} className="bg-twitterWhite pl-2 pr-5 py-2 text-black rounded-full flex items-center">
               <img src="/google.png" alt="" className="h-8 " /> Sign in with {provider.name}
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
