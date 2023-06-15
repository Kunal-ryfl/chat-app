import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Bottomnav from "./components/Bottomnav";
import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SideBar from "./components/SideBar";
import User from "./components/User";
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"],variable: "--font-inter", });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
      <div className={inter.className}>
        <div className="  grid  min-h-screen grid-cols-1 bg-black  md:grid-cols-6">
          <div className=" flex justify-start col-span-1 ">
          <SideBar />

          </div>


          <div className="      border-neutral-700  md:border-l-[1px]   col-span-4   text-white  md:flex md:justify-center   ">
            <Component {...pageProps} />
            <Toaster />
          </div>
          <div className="  pr-2   rounded-r-xl ">
            {/* <User/> */}
          </div>
          <Bottomnav />
        </div>
      </div>
      <ReactQueryDevtools />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
