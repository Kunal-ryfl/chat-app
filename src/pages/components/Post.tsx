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
            if(post.id===tweet?.id){
              return ({
                ...post,
                likes:[{userId:tweet?.userId}],
                _count:{
                  likes:tweet._count?.likes+1,
                  comments:tweet._count?.comments,
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
            if(post.id===tweet?.id){
              return ({
                ...post,
                likes:[],
                _count:{
                  likes:tweet._count.likes-1,
                  comments:tweet._count?.comments,
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
        
        <div className=' rounded-sm border-white/10 border-y-2 md:border-x-2 b  w-full md:w-[600px]     p-2 grid grid-cols-10 grid-row-10  '>

        
         <div className=' p-1   col-span-1 '>
          <Link href={`/profile/${tweet?.user?.id}`}>
           <Image src={tweet?.user?.image||"/img"} height={70} width={40} unoptimized alt="" className=" mr-3  rounded-md border-white/10 border-2 " />
          </Link>
         </div>

         <div className=' grid grid-rows-10   col-span-9'>
        <div className=' p-1 '>

            <div className=' flex items-baseline gap-2'>

        <p className=' text-base  font-semibold '> {tweet?.user?.name }</p>
        <p className=' text-sm font-extralight  '>  {dayjs(tweet?.createdAt).fromNow()} </p>
            </div>
      
             <p className=' text-base md:text-md  text-white/95 '>{tweet?.caption}</p>
        </div>


           <div className='relative   '>
          {
               tweet?.img &&
<Image src={tweet?.img} className=" aspect-[16/9] md:aspect-[2/1]  rounded-xl  w-full border-white/10 border-2  "  unoptimized alt="Postimg"  width={200} height={100} style={{ objectFit:'cover'}} />          
}

<div className="divider my-0"></div> 

         <div  className='  py-2 flex gap-2 items-center text-white/60  ' > 
              <button  className=' flex items-center gap-2'
              onClick = {!hasLiked ? ()=>likeMutation({postid:tweet?.id}):()=>unlikeMutation({postid:tweet?.id})}
              >   

             <AiFillHeart className={!hasLiked? " text-xl":" fill-red-600 text-xl"} />{tweet?._count?.likes} 
              </button>
              
            <div className=' flex items-center gap-2'> <BiComment className=' text-xl'/> {tweet?._count?.comments}   </div>
          
          
         <Link href={`/post/${tweet?.id}`}>
      <p className=' text-sm'>view comments</p>
         </Link>

        
         </div>

         <CreateComment  tweet={tweet}/>


            </div>  

         </div>

         </div>

  )
}

export default PostContainer