import React from 'react'
import Create from './components/Create'
import Post from './components/Post'
import { api } from '~/utils/api'
import Skeleton from './components/Skeleton'
import { MoonLoader,PacmanLoader } from 'react-spinners'
import Headroom from 'react-headroom'
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation'


const Feed = () => {

 

  const [listRef] = useAutoAnimate<HTMLDivElement>();
  const {data:posts,isLoading,error} = api.example.getPosts.useQuery();
  if(isLoading) return< div className=' h-screen w-screen  overflow-hidden'>
     {/* <PacmanLoader color='purple'  />  */}
     
     <Skeleton/>
     <Skeleton/>
     <Skeleton/>
     <Skeleton/>
     <Skeleton/>
     <Skeleton/>
     <Skeleton/>
     <Skeleton/>
     <Skeleton/>
     </div>
  return (
    
   <div className='  pb-16'   >
    {/* <Headroom > */}
      <div className=' sticky top-0 z-20  w-full  max-w-2xl   border-white/10 mx-auto backdrop-blur-md'>

    <div className='   w-full  max-w-2xl  mx-auto border-white/10 px-2   py-2'>
       <h1 className=' text-base md:text-xl   font-bold'>Home</h1>
    </div>
    <Create/>  
      </div>
    {/* </Headroom> */}
    <div ref={listRef} >
    {
      posts?.length  &&
      posts?.map((post)=>(
        
        <Post   tweet={post} key={post.id} />
        ))
      }
      </div>

   </div>
   
     
  )
}






export async function getServerSideProps(ctx:GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx)
     if(!session){
      return{
          redirect:{destination:"/signin",permanent:false},
          props:{}
      }
     }

  return {
    props: {session,}, // will be passed to the page component as props
  }
}
export default Feed