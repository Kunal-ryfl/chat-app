import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../server/auth";
import {RiBearSmileLine} from 'react-icons/ri'
import {FcGoogle} from  'react-icons/fc'
import {BsFacebook} from  'react-icons/bs'
import {AiFillGithub} from  'react-icons/ai'
import Image from "next/image";
export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} >

<div className="relative py-16   ">  
    <div className="relative container m-auto px-2 text-gray-500 md:px-12 xl:px-32">
        <div className="m-auto  w-full">
            <div className="rounded-xl  shadow-xl">
                <div className="p-6 sm:p-16">
                    <div className="space-y-4">
                       <RiBearSmileLine className=" fill-[hsl(280,100%,70%)] text-7xl"/>
                        <h2 className="mb-8 text-2xl text-[hsl(280,100%,70%)] font-bold">Sign in <br></br> to your account .</h2>
                    </div>
                    <div className="mt-16 grid space-y-4">
                        <button onClick={() => void signIn(provider.id)} className="group py-4 px-6 border-2 border-white/10 rounded-xl transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                              <FcGoogle/>
                              <span className="block w-max font-semibold tracking-wide text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                            </div>
                        </button>
                        <button  className="group py-4 px-6 border-2 border-white/10 rounded-xl transition duration-300 
">
                            <div className="relative flex items-center space-x-4 justify-center">
                              <BsFacebook/>
                              <span className="block filter brightness-50 w-max font-semibold tracking-wide text-white text-sm transition duration-300  sm:text-base">Continue with Facebook</span>
                            </div>
                        </button>
                        <button  className="group py-4 px-6 border-2  border-white/10 rounded-xl transition duration-300 
">
                            <div className="relative flex items-center brightness-50 space-x-4 justify-center">
                              <AiFillGithub/>
                              <span className="block w-max font-semibold tracking-wide text-white text-sm transition duration-300  sm:text-base">Continue with Github</span>
                            </div>
                        </button>
                    </div>

                    <div className="mt-32 space-y-4  text-neutral-500 text-center sm:-mb-8">
                        <p className="text-xs">By proceeding, you agree to our <a href="#" className="underline">Terms of Use</a> and confirm you have read our <a href="#" className="underline">Privacy and Cookie Statement</a>.</p>
                        <p className="text-xs">This site is protected by reCAPTCHA and the <a href="#" className="underline">Google Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a> apply.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/feed" } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}