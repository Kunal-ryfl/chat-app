import React, { ChangeEvent, useState } from 'react'
import { api } from '~/utils/api';
import { postInput,Post } from '~/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Headroom from 'react-headroom'
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import {FiImage} from 'react-icons/fi'

const supabase = createClient(
  "https://kdrzjjunjsbfuglvmnmk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcnpqanVuanNiZnVnbHZtbm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxNDM2NjYsImV4cCI6MTk5NDcxOTY2Nn0.V7CrA6GGXxcHRSck4O2wmGtYdpsiJiA682a0vsx97To",
);

const Create = () => {


 const[post,setPost] = useState("");  
 const trpc = api.useContext();

 const [filePath, setfilePath] = useState("") 

const handleFileSelected = async (e:ChangeEvent<HTMLInputElement>) => {
  
  let file ;
  
   if(e.target.files){ file = (e.target.files[0]) ;}
 console.log("File = ",file)

     e.preventDefault();
      const filename = `${uuidv4()}-${file?.name}`;

    const { data, error } = await supabase.storage
      .from("posts")
      .upload(filename, file as File , {
        cacheControl: "3600",
        upsert: false,
      });

    const filepath = data?.path;
// console.log(filepath)
setfilePath(`https://kdrzjjunjsbfuglvmnmk.supabase.co/storage/v1/object/public/posts/${filepath}` || 'null');

   };


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
        likes:0,
        comments:0,
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
    setPost(newPost.data)
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
    // <Headroom   >

    <form className='  z-10 flex items-center   w-full md:w-[600px]  mx-auto  px-2 py-1  md:py-4 '
    onSubmit={(e) => {
      e.preventDefault()
      
      
      
      const result = postInput.safeParse({data:post,img:filePath})
      
      if (!result.success) {
        toast.error(result.error.format()._errors.join('\n'))
        return
      }
      
      
      mutate({data:post,img:filePath})
     
    }}

    >
       

        <Image src={useSessionData?.user.image ||"/img"} unoptimized height={70} width={65} alt="" className=" mr-3 rounded-full " />
        
        <input type='text' value={post} placeholder='whats on your mind ...' className='   w-full text-slate-400 text-sm md:text-base font-light bg-transparent outline-none  px-4 py-1   ' 
        onChange={(e)=>setPost(e.target.value)}
        />

<label htmlFor='img' >
<FiImage className=' cursor-pointer text-xl  mr-1' />
<input type="file" id='img'  onChange={handleFileSelected}  className=" hidden file-input file-input-bordered file-input-primary w-full max-w-xs" />
</label>
      
        <button  className=' rounded-full  font-semibold md:text-base  text-sm   bg-sky-500  px-6 py-2 '>Post</button>

        
    </form>
        // </Headroom>
  )
}

export default Create