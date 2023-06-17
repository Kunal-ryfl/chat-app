import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Bottomnav from "./components/Bottomnav";
import { Inter, Open_Sans } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SideBar from "./components/SideBar";

import User from "./components/User";
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });
const os = Open_Sans({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div
        style={os.style}
        className="  grid  min-h-screen grid-cols-1 bg-black  md:grid-cols-6"
      >
        <div className=" col-span-1 flex justify-start ">
          <SideBar />
        </div>

        <div className="   col-span-5    border-neutral-700  bg-red-500   text-white   md:flex  md:justify-center md:border-l-[1px]   ">
          <Component {...pageProps} />
          <Toaster />
        </div>
        <div className="  rounded-r-xl   pr-2 ">{/* <User/> */}</div>
        <Bottomnav />
      </div>

      <ReactQueryDevtools />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
