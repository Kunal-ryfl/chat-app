import React from 'react'
import { api, RouterOutputs } from '~/utils/api';
import Image from 'next/image';
import {AiFillHeart} from 'react-icons/ai'
import {BiComment} from 'react-icons/bi'
import toast from 'react-hot-toast';
import Link from 'next/link';
import CreateComment from './CreateComment';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy",
  },
});


const PostContainer = ( {tweet}:{tweet:RouterOutputs['example']['getPosts'][number]}) => {

  const hasLiked = tweet?.likes.length>0;
  const trpc = api.useContext();
  
  const {mutate:likeMutation} = api.example.likePost.useMutation({
    onMutate:async ()=>{
      // console.log("like fired")
   await  trpc.example.getPosts.cancel() 
      

      const prevPosts = trpc.example.getPosts.getData()

      //optimistic update

      trpc.example.getPosts.setData(undefined,(x)=>{
           if(!x) return prevPosts

           return x.map(post=>{
            if(post.id===tweet.id){
              return ({
                ...post,
                likes:[{userId:tweet?.userId}],
                _count:{
                  likes:tweet._count?.likes+1
                }  

              })
            }
            return post

           })
      })


      return {prevPosts}
    },

   
    onError: (err,id,context) => {
			toast.error(`An error occured when liking post`)
			if (!context) return
			trpc.example.getPosts.setData(undefined, () => context.prevPosts)
		},

    onSettled: async () => {
			await trpc.example.getPosts.invalidate()
		},

  });

  const {mutate:unlikeMutation} = api.example.unlikePost.useMutation({
    onMutate:async ()=>{
      // console.log("unlike fired")
      await trpc.example.getPosts.cancel() 
      

      const prevPosts = trpc.example.getPosts.getData()

      //optimistic update

      trpc.example.getPosts.setData(undefined,(x)=>{
           if(!x) return prevPosts

           return x.map(post=>{
            if(post.id===tweet.id){
              return ({
                ...post,
                likes:[],
                _count:{
                  likes:tweet._count.likes-1
                }  

              })
            }
            return post

           })
      })


      return {prevPosts}
    },

   
    onError: (err, id, context) => {
			toast.error(`An error occured when unliking post`)
			if (!context) return
			trpc.example.getPosts.setData(undefined, () => context.prevPosts)
		},

    onSettled: async () => {
			await trpc.example.getPosts.invalidate()
		},

  });

  
  return (
        
        <div className=' rounded-sm border-white/10 border-t-2 md:border-x-2 b  w-full md:w-[600px]     p-2 grid grid-cols-10 grid-row-10  '>

        
         <div className=' p-1   col-span-1 '>
           <Image src={tweet?.user?.image||"/img"} height={70} width={40} unoptimized alt="" className=" mr-3  rounded-md border-white/10 border-2 " />
         </div>



         <div className=' grid grid-rows-10   col-span-9'>
        <div className=' p-1 '>

            
        <p className=' text-sm  font-semibold '> {tweet?.user?.name }</p>
        <p className=' text-[10px] font-extralight mb-2   '>  {dayjs(tweet?.createdAt).fromNow()} </p>
      
             <p className=' text-sm md:text-md  text-white/95 '>{tweet?.caption}</p>
        </div>

           <div className='  relative   bg-purpe-500'>
          {
               tweet?.img &&
<Image src={tweet?.img} className=" w-full rounded-xl   mb-1"  unoptimized alt="Postimg"  width={300} height={100} style={{ objectFit:'contain'}} />          
}

          
         <div  className='  py-2 flex gap-2 text-white/60  ' > 
              <button  className=' flex items-center gap-2'
              onClick = {!hasLiked ? ()=>likeMutation({postid:tweet.id}):()=>unlikeMutation({postid:tweet?.id})}
              >   

             <AiFillHeart className={!hasLiked? " text-xl":" fill-red-600 text-xl"} />{tweet?._count?.likes} 
              </button>
              
            <div className=' flex items-center gap-2'> <BiComment className=' text-xl'/>   </div>
         </div>

         <CreateComment  postId = {tweet?.id}/>

         <Link href={`/post/${tweet?.id}`}>
      <p className=' text-sm'>Show comments</p>
         </Link>


            </div>  

         </div>

         </div>

  )
}

export default PostContainer