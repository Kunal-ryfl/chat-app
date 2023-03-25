import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import {CgProfile} from "react-icons/cg"
import {AiOutlineHome} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
import { usePathname} from 'next/navigation'
import Bottomnav from "./components/Bottomnav";
import { Inter } from 'next/font/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  
}) => {
  const pathname = usePathname()
 
  return (
    
    
    <SessionProvider session={session}>
<div className={inter.className}>


<div className=' grid-cols-1  grid md:grid-cols-10  min-h-screen bg-black'>
        
        <div className=' text-white flex justify-start xl:justify-end col-span-2 '>
            
            <div className=' hidden md:sticky top-10 my-4 gap-3   px-2   text-2xl  py-4 h-fit md:grid   grid-cols-3 md:grid-cols-1 rounded-sm  '>
               
             <div className=" flex items-center justify-start " ><Link href={"/feed"}><h1  className={pathname.substring(1)==='feed'?" text-[hsl(280,100%,70%)]":""} ><AiOutlineHome/></h1></Link><h1 className=" mx-2 hidden xl:block text-xl">Home</h1> </div>
             <div className="  flex  items-centerjustify-start "><Link href={"/"}><h1><IoMdNotificationsOutline/></h1></Link><h1 className=" mx-2 hidden  xl:block text-xl">Notification</h1></div>
             <div className="  flex items-center justify-start "><Link href={"/profile"}><h1 className={pathname.substring(1)==='profile'?" text-[hsl(280,100%,70%)]":""} ><CgProfile/></h1></Link><h1 className=" mx-2  hidden xl:block text-xl" >Profile</h1></div>
     
            </div>
     
        </div>
        <div className='   md:flex   md:justify-center  text-white col-span-6   ' >
        
     
        
      <Component {...pageProps}  />
     
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
