import Spinner from "@/components/Spinner";
import { getProviders, signIn, useSession } from "next-auth/react"; //getProviders est une fonction de la bibliothèque NextAuth.js qui permet de récupérer la liste des fournisseurs d'authentification configurés dans ton application. Ces fournisseurs peuvent inclure des services comme Google, GitHub, Facebook, ou même des fournisseurs personnalisés.
import { useRouter } from "next/router";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
export default function LoginPage({ providers }) {
  const { data, status } = useSession();
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();
  if (status === "loading") {
    return (
      <div className=" w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (data) {
    router.replace("/");
    return null;
  }

  const handleSignIn = async (provider) => {
    setButtonLoading(true);
    await signIn(provider.id);
    //setButtonLoading(false);
  };

  return (
    <>
      <div className="flex  items-center justify-center h-screen">
        <div className="grid sm:grid-cols-2 gap-6 justify-center items-center">
          <div className=" w-full flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="w-40 h-40 text-white hover:text-slate-100 transition-colors duration-200"
              fill="currentColor"
            >
              <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </div>

          <div className="flex justify-center items-center flex-col text-center">
            <div className="">
              <div className="text-4xl font-semibold my-3">
                Let's Get Started
              </div>
              <div className="text-2xl mb-2 ">Sign in here</div>
            </div>
            <div>
              {Object.values(providers).map((provider) => (
                <>
                  <div key={provider.id}>
                    <button
                      onClick={() => handleSignIn(provider)}
                      disabled={buttonLoading}
                      className="bg-twitterWhite px-8 py-2 w-72 h-10 text-black rounded-full flex justify-center items-center hover:bg-slate-100"
                    >
                      {buttonLoading ? (
                        <ClipLoader
                          color="#26282A"
                          size={20}
                        />
                      ) : (
                        <>
                          <img
                            src="/google.png"
                            alt=""
                            className="h-6 mr-2"
                          />
                          Continue with {provider.name}
                        </>
                      )}
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
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
