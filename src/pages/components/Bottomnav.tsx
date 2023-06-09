import Link from 'next/link'
import React from 'react'
import {CgProfile} from "react-icons/cg"
import {AiOutlineHome} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
const Bottomnav = () => {

  const {asPath} = useRouter()
  const {data:session} = useSession();
  if(session===null) return <></>;


  return (
    <div className=' md:hidden block  '>
        
        <div className="btm-nav">
  <button className="text-primary">
            
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </button>
  <button className="text-primary active">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  </button>
  <button className="text-primary">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  </button>
</div>

<div className="btm-nav">
  <button className="text-secondary">

    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>

  </button>
  <button className="text-secondary active">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  </button>
  <button className="text-secondary">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  </button>
</div>


<div className="btm-nav  bg-black">
  <button className="  border-slate-400   text-2xl text-white">
<Link href={"/feed"}>
<AiOutlineHome className={asPath ==='/feed'?" text-[hsl(280,100%,70%)]":""}  />
  </Link>
  </button>
  <button className="border-slate-400  text-white text-2xl">
    <Link href={"/"}>
<IoMdNotificationsOutline className={asPath===''?" text-[hsl(280,100%,70%)]":""}/> 
   </Link>
  </button>
  <button className="border-slate-400  text-white text-2xl">
  <Link href={`/profile/${session?.user?.id}`}>
<CgProfile className={asPath===`/profile/${session?.user?.id}`?" text-[hsl(280,100%,70%)]":""} /> 
  </Link>
  </button>
</div>
        
    </div>
  )
}

export default Bottomnav