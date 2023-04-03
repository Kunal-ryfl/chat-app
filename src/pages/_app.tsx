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
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
      <div className={inter.className}>
        <div className=" grid  min-h-screen grid-cols-1 bg-slate-900 md:grid-cols-10">
          <SideBar />

          <div className="   col-span-6   text-white  md:flex md:justify-center   ">
            <Component {...pageProps} />
            <Toaster />
          </div>
          <div className="  col-span-2"></div>

          <Bottomnav />
        </div>
      </div>
      <ReactQueryDevtools />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
