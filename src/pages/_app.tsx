import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import Link from "next/link";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { usePathname} from 'next/navigation';

import { Inter } from 'next/font/google'

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


<div className=' grid-cols-1  grid xl:grid-cols-10  min-h-screen bg-black'>
        
        <div className=' text-white flex justify-center col-span-2 '>
            
           


            <div className=' sticky top-10 my-4 gap-3 border-white/10 md:border-2    px-8 py-4 h-fit grid   grid-cols-3 xl:grid-cols-1 rounded-sm  '>
               
             <div className=" flex justify-center md:justify-start items-center" ><Link href={"/feed"}><h1  className={pathname.substring(1)==='feed'?" text-[hsl(280,100%,70%)]":""} >Home</h1></Link></div>
             <div className="  flex justify-center md:justify-start items-center"><Link href={"/"}><h1>Notification</h1></Link></div>
             <div className="  flex justify-center md:justify-start items-center"><Link href={"/profile"}><h1 className={pathname.substring(1)==='profile'?" text-[hsl(280,100%,70%)]":""} >Profile</h1></Link></div>
     
            </div>
     
        </div>
        <div className=' px-2 py-4  md:flex   md:justify-center  text-white col-span-6   ' >
            
            {/* <h1 className=' text-2xl font-bold'>{pathname.substring(1)}</h1> */}
     
     
        
      <Component {...pageProps}  />
     
        </div>
        <div className='  col-span-2'>
     
           

        </div>
     

             </div>
             </div>
     
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
