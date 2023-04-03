import React from 'react'
import Link from "next/link";
import {CgProfile} from "react-icons/cg"
import {AiOutlineHome} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

const SideBar = () => {
    // const pathname = usePathname()
    const {asPath} = useRouter()
  
    const {data:session} = useSession();
    if(session===null) return     <div className=' opacity-0  text-white flex justify-start xl:justify-end col-span-2 '>
            
    <div className=' hidden md:sticky top-10 my-4 gap-3   px-2   text-2xl  py-4 h-fit md:grid   grid-cols-3 md:grid-cols-1 rounded-sm  '>
       
     <div className=" flex items-center justify-start " > </div>
     <div className="  flex  items-centerjustify-start "></div>
     <div className="  flex items-center justify-start "></div>

    </div>

</div>;

  return (
    <div className=' text-white flex justify-start xl:justify-end col-span-2 '>
            
    <div className=' hidden md:sticky top-10 my-4 gap-3   px-2   text-2xl  py-4 h-fit md:grid   grid-cols-3 md:grid-cols-1 rounded-sm  '>
       
     <div className=" flex items-center justify-start " ><Link href={"/feed"}><h1  className={asPath ==='/feed'?" text-[hsl(280,100%,70%)]":""} ><AiOutlineHome/></h1></Link><h1 className=" mx-2 hidden xl:block text-base font-semibold">Home</h1> </div>
     <div className="  flex  items-centerjustify-start "><Link href={"/"}><h1><IoMdNotificationsOutline/></h1></Link><h1 className=" mx-2 hidden  xl:block text-base font-semibold ">Notification</h1></div>
     <div className="  flex items-center justify-start "><Link href={`/profile/${session?.user?.id}`}><h1 className={asPath===`/profile/${session?.user?.id}`?" text-[hsl(280,100%,70%)]":""} ><CgProfile/></h1></Link><h1 className=" mx-2  hidden xl:block text-base font-semibold" >Profile</h1></div>

    </div>

</div>
  )
}

export default SideBar