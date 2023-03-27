import React, { useState } from 'react'
import { api } from '~/utils/api';
import { postInput,Post } from '~/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Headroom from 'react-headroom'


const Create = () => {
 const[post,setPost] = useState("");  
 const trpc = api.useContext();


   const {data:useSessionData} = useSession();

    const { mutate } = api.example.create.useMutation({
	
  onMutate:async()=>{
    await trpc.example.getPosts.cancel()

     const loadingToast = toast.loading('Creating post');

    const prevPosts = trpc.example.getPosts.getData()
    
    trpc.example.getPosts.setData(undefined, (prev) => {
      const optimisticPost: Post = {
      id:"fakeid",
      img:'/fake',
      userId:'fakeuserid',
      createdAt: new Date(),
      caption:'placeholder',
      likes:[],
      user:{id:'',name:'',image:''},
      _count:{
        likes:0
      },
        

      }
      if (!prev) return [optimisticPost]
      return [...prev, optimisticPost]
    })

     setPost("")

     toast.success("Post added",{id:loadingToast});
    return {prevPosts}
  },



  onError:(err, newPost, context) => {
   toast.error("An error occured when creating Post")
    // Clear input
    setPost(newPost)
    if (!context) return
    trpc.example.getPosts.setData(undefined, () => context.prevPosts)
  },

		// Always refetch after error or success:
		onSettled:async () => {
			// console.log('SETTLED')
			await trpc.example.getPosts.invalidate()
            
		},
	});  
    
  return (
    <Headroom   >

    <form className='  backdrop-blur-md z-10 flex items-center  w-full md:w-[600px]  mx-auto  px-2  py-4 '
    onSubmit={(e) => {
      e.preventDefault()
      
      
      
      const result = postInput.safeParse(post)
      
      if (!result.success) {
        toast.error(result.error.format()._errors.join('\n'))
        return
      }
      
      
      mutate(post)
      
    }}
    >
       
        <Image src={useSessionData?.user.image ||"/img"} unoptimized height={70} width={65} alt="" className=" mr-3 rounded-full " />
        <input type='text' value={post} placeholder='whats on your mind ...' className='  w-full text-sm md:text-lg font-light bg-transparent outline-none  px-4 py-1   ' 
        onChange={(e)=>setPost(e.target.value)}
        />
        <button  className=' rounded-full  font-semibold md:text-xl  text-sm  bg-[hsl(280,100%,70%)]  px-6 py-2 '>Post</button>
        
    </form>
        </Headroom>
  )
}

export default Create