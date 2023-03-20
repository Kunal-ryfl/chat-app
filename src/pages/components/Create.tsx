import React, { useState } from 'react'
import { api } from '~/utils/api';
import { postInput } from '~/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
const Create = () => {
 const[post,setPost] = useState("");  
 const trpc = api.useContext();


 const {data:useSessionData} = useSession();
    const { mutate } = api.example.create.useMutation({
	
		// Always refetch after error or success:
		onSettled: async () => {
			console.log('SETTLED')
			await trpc.example.getPosts.invalidate()
            // toast.remove()
            // toast.success("Post created")
            
		},
	});  
    
  return (
    <form className=' flex my-4  py-4 '
    onSubmit={(e) => {
      e.preventDefault()
      
      
      
      const result = postInput.safeParse(post)
      
      if (!result.success) {
          // toast.error(result.error.format()._errors.join('\n'))
          return
      }
      
      // const loadingToast = toast.loading("creating todo ...");

      mutate(post)
      
  }}
    >
        {/* <button className='mr-2 rounded-full  bg-purple-500 px-2 py-1'>Kun</button> */}
        <Image src={useSessionData?.user.image ||"/img"} unoptimized height={70} width={65} alt="" className=" mr-3 rounded-full " />
        <input type='text' placeholder='whats on your mind ...' className=' md:w-96 w-44 text-sm  bg-white/10 px-4 py-1   rounded-xl' 
        onChange={(e)=>setPost(e.target.value)}
        />
        <button  className=' ml-2 rounded-xl  font-semibold md:text-xl bg-white/10 text-sm  text-[hsl(280,100%,70%)] px-4 py-2 '>Post</button>
        
    </form>
  )
}

export default Create