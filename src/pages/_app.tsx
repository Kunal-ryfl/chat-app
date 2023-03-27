import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";
import "~/styles/globals.css";

import { usePathname} from 'next/navigation'
import Bottomnav from "./components/Bottomnav";
import { Inter } from 'next/font/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SideBar from "./components/SideBar";
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  
}) => {
  // const pathname = usePathname()
 
  return (
    
    
    <SessionProvider session={session}>
<div className={inter.className}>


<div className=' grid-cols-1  grid md:grid-cols-10  min-h-screen bg-black'>
        
           <SideBar/>
        
        <div className='   md:flex   md:justify-center  text-white col-span-6   ' >
        
     
        
      <Component {...pageProps}  />
     <Toaster/>
        </div>
        <div className='  col-span-2'>
     

        </div>
     

            <Bottomnav/>
             </div>
             </div>
     <ReactQueryDevtools/>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
