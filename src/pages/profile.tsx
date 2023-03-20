import React from 'react'
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import Post from './components/Post'
import { MoonLoader } from 'react-spinners'
import Image from 'next/image';
const profile = () => {
    // const {data,isLoading,error} = api.example.getUser.useQuery({text:userid});
    const {data:useSessionData} = useSession();
    const {data,isLoading,error} = api.example.getUserPosts.useQuery();
    const len:number = data?.length || 0;
    if(isLoading) return<> <MoonLoader color='purple' className=' my-10'/> </>
  return (
    <div className=' min-h-screen  text-white bg-black'>
        
        <div className=' rounded-xl  w-[330px] md:w-[600px]   bg-white/10 px-2 py-4' >
            <Image src={useSessionData?.user.image || "https://cdn.pixabay.com/photo/2017/01/10/03/54/avatar-1968236_960_720.png"} height={100} width={120} unoptimized alt="" className="  rounded-full" />
        <h1 className=' text-2xl'>{useSessionData?.user.name}</h1>
        <h1 className=' text-sm text-gray-400'>{useSessionData?.user.email}</h1>

        </div>

      <div className=' px-2 py-4'>

        <h1 className='  font-bold'>Posts</h1>

        { len > 0?
              <>{
            data?.map((post)=>(
                <Post caption={post.caption} postid={post.id} img={post.img||"/df"} userid={post.userId} date={post.createdAt} />
                ))}
              </>:<div>
                <h1 className='  text-sm text-[hsl(280,100%,70%)]'>No posts</h1>
                </div>
           
           
           }
            </div>

        </div>

  )
}

export default profile