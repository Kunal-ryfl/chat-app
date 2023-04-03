import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";


const Home: NextPage = () => {

  

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex relative min-h-screen   flex-col items-center justify-center">
      
        <div className="container z-10 flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Chat <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          
                 
            <AuthShowcase />
          
        
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
            </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

// export async function getServerSideProps(ctx:GetServerSidePropsContext) {
//   const session = await getServerAuthSession(ctx)

//   console.log("mid = ",session)
//      if(!session){
//       return{
//           redirect:{destination:"/signin",permanent:false},
//           props:{}
//       }
//      }

//   return {
//     props: {session,}, // will be passed to the page component as props
//   }
// }
