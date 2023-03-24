import React from 'react'
import { api, RouterOutputs } from '~/utils/api';
import Image from 'next/image';

import {AiFillHeart} from 'react-icons/ai'
import {BiComment} from 'react-icons/bi'




const PostContainer = ( {tweet}:{tweet:RouterOutputs['example']['getPosts'][number]}) => {
  
  
  
  const hasLiked = tweet.likes.length>0;
  
  const trpc = api.useContext();
  
  

  const {mutate:likeMutation} = api.example.likePost.useMutation({
    onMutate:async ()=>{
      console.log("like fired")
   await  trpc.example.getPosts.cancel() 
      

      const prevPosts = trpc.example.getPosts.getData()

      //optimistic update

      trpc.example.getPosts.setData(undefined,(x)=>{
           if(!x) return prevPosts

           return x.map(post=>{
            if(post.id===tweet.id){
              return ({
                ...post,
                likes:[{userId:tweet.userId}],
                _count:{
                  likes:tweet._count.likes+1
                }  

              })
            }
            return post

           })
      })


      return {prevPosts}
    },

   
    onError: (err, done, context) => {
			console.error(`An error occured when marking todo as ${done ? "done" : "undone"}`)
			if (!context) return
			trpc.example.getPosts.setData(undefined, () => context.prevPosts)
		},

    onSettled: async () => {
			await trpc.example.getPosts.invalidate()
		},

  });

  const {mutate:unlikeMutation} = api.example.unlikePost.useMutation({
    onMutate:async ()=>{
      console.log("unlike fired")
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

   
    onError: (err, done, context) => {
			console.error(`An error occured when marking todo as ${done ? "done" : "undone"}`)
			if (!context) return
			trpc.example.getPosts.setData(undefined, () => context.prevPosts)
		},

    onSettled: async () => {
			await trpc.example.getPosts.invalidate()
		},

  });



//   if(isLoading) return <div className=" rounded-sm border-white/10 border-2 shadow  p-4 w-full md:w-[600px] mx-auto my-3">
//   <div className="animate-pulse flex space-x-4">
//     <div className="rounded-full bg-slate-700 h-10 w-10"></div>
//     <div className="flex-1 space-y-6 py-1">
//       <div className="h-2 bg-slate-700 rounded"></div>
//       <div className="space-y-3">
//         <div className="grid grid-cols-3 gap-4">
//           <div className="h-2 bg-slate-700 rounded col-span-2"></div>
//           <div className="h-2 bg-slate-700 rounded col-span-1"></div>
//         </div>
//         <div className="h-2 bg-slate-700 rounded"></div>
//       </div>
//     </div>
//   </div>
// </div>
  
  return (
    
        
        <div className=' rounded-sm border-white/10 border-2 my-3 w-full md:w-[600px]     p-2 grid grid-cols-10 grid-row-10  '>

        
         <div className=' p-1   col-span-1 '>
           <Image src={tweet.user.image||"/img"} height={70} width={40} unoptimized alt="" className=" mr-3 rounded-full border-white/10 border-2 " />
         </div>



         <div className=' grid grid-rows-10   col-span-9'>
        <div className=' p-1 '>

            
        <p className=' text-sm  font-semibold '> {tweet?.user?.name }</p>
        <p className=' text-[10px] font-extralight mb-2   '> {tweet?.createdAt?.toLocaleString()} </p>
      
             <p className=' text-sm md:text-md  text-white/95 '>{tweet?.caption}</p>
        </div>

           <div className='  relative   bg-purpe-500'>
          {
               tweet?.img &&
<Image src={tweet?.img} className=" w-full rounded-xl   mb-1"  unoptimized alt="Postimg"  width={300} height={100} style={{ objectFit:'contain'}} />          
}

          

         <div  className='  py-2 flex gap-2  ' > 
              <button  className=' flex items-center gap-2'
              onClick = {!hasLiked ? ()=>likeMutation({postid:tweet.id}):()=>unlikeMutation({postid:tweet.id})}
              >  
              {/* { !bool_like ?< AiOutlineHeart className=' '/>:<FcLike/>} {likes.data}  */}
             

             <AiFillHeart className={!hasLiked? "":" fill-red-600"} />{tweet?._count?.likes} 
              </button>
              
            <div className=' flex items-center gap-2'> <BiComment/> {0}  </div>
         </div>


      

            </div>  

         </div>





         </div>

  )
}

export default PostContainer