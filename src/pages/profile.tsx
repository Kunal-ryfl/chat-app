import React from 'react'
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import Post from './components/Post'
import { MoonLoader } from 'react-spinners'
import Image from 'next/image';
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";

const Profile = () => {
   
    const {data:useSessionData} = useSession();
    const {data,isLoading,error} = api.example.getUserPosts.useQuery();
    const len:number = data?.length || 0;
    if(isLoading) return<> <MoonLoader color='purple' className=' mx-auto my-10'/> </>
  return (
    <div className=' min-h-screen md:px-2 pb-16   text-white bg-black'>
        
        <div className='  grid-rows-3   rounded-sm  w-full md:w-[600px] grid grid-cols-10     ' >

       <div className=' row-span-2  rounded-sm  bg-white/10 col-span-full'>
              
       </div>


          <div className='  row-span-1 col-span-3'>
 
             

            <Image src={useSessionData?.user.image || "https://cdn.pixabay.com/photo/2017/01/10/03/54/avatar-1968236_960_720.png"} height={100} width={120} unoptimized alt="" className=" border-white/10 border-2 relative -top-14 left-2  rounded-full" />
         
             
          </ div>

          <div className=' px-2 py-4 col-span-7'>

        <h1 className=' text-base md:text-2xl'>{useSessionData?.user.name}</h1>
        <h1 className=' text-[11px] md:text-sm text-gray-400'>{useSessionData?.user.email}</h1>
        
          </div>

        </div>

      <div className='  py-4'>

        <h1 className=' px-2  font-bold'>Posts ({len})</h1>

        { len > 0?
              <>{
            data?.map((post)=>(
                <Post    key={post.id} tweet={post}  />
                ))}
              </>:<div>
                <h1 className='  text-sm text-[hsl(280,100%,70%)]'>No posts</h1>
                </div>
           
           
           }
            </div>

        </div>

  )
}


// export async function getServerSideProps(ctx:GetServerSidePropsContext) {
//   const session = await getServerAuthSession(ctx)

//   console.log("mid = ",session)
//      if(!session){
//       return{
//           redirect:{destination:"/signin",permanent:false},
//           props:{}
//       }
//      }

//   return {
//     props: {session,}, // will be passed to the page component as props
//   }
// }

export default Profile