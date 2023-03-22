import React from 'react'
import { api } from '~/utils/api';
import Image from 'next/image';
import {FcLikePlaceholder} from 'react-icons/fc'
import {FcLike} from 'react-icons/fc'
import {AiFillHeart} from 'react-icons/ai'

import {BiComment} from 'react-icons/bi'
const Post = (post:{caption:string,date:Date,userid:string,img:string,postid:string}) => {
  const {caption,date,userid,img,postid} = post;
  const {data,isLoading,error} = api.example.getUser.useQuery({text:userid});
  const likes = api.example.getLikes.useQuery({id:postid});
  const trpc = api.useContext();

  const liked= api.example.Liked.useQuery({id:postid});
  



  const { mutate: likeMutation, } = api.example.likePost.useMutation({
   
    onSettled: async () => {
      console.log('Liked') 
      
      await trpc.example.Liked.invalidate()
      await trpc.example.getLikes.invalidate()
    },

  })

  const { mutate: unlikeMutation, } = api.example.unlikePost.useMutation({
   
    onSettled: async () => {
      console.log('unLiked') 
      
      await trpc.example.Liked.invalidate()
      await trpc.example.getLikes.invalidate()
    },

  })




  if(isLoading) return <div className=" rounded-sm border-white/10 border-2 shadow  p-4 w-full md:w-[600px] mx-auto my-3">
  <div className="animate-pulse flex space-x-4">
    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>
  
  return (
    
        
        <div className=' rounded-sm border-white/10 border-2 my-3 w-full md:w-[600px]     p-2 grid grid-cols-10 grid-row-10  '>

        
         <div className=' p-1   col-span-1 '>
           <Image src={data?.image ||"/img"} height={70} width={40} unoptimized alt="" className=" mr-3 rounded-full border-white/10 border-2 " />
         </div>

         




         <div className=' grid grid-rows-10   col-span-9'>
        <div className=' p-1 '>

            
        <p className=' text-sm  font-semibold '> {data?.name }</p>
        <p className=' text-[10px] font-extralight mb-2   '> {date?.toLocaleString()} </p>
      
             <p className=' text-sm md:text-md  text-white/95 '>{caption}</p>
        </div>

           <div className='  relative   bg-purpe-500'>
          {
               img!=="/df"?
<Image src={img} className=" w-full rounded-xl   mb-1"  unoptimized alt="Postimg"  width={300} height={100} style={{ objectFit:'contain'}} />:<></>
          }

          
          


         <div  className='  py-2 flex gap-2  ' > 
              <button  className=' flex items-center gap-2'
              onClick = {liked.data === null? ()=>likeMutation({postid}):()=>unlikeMutation({postid})}
              >  
              {/* { !bool_like ?< AiOutlineHeart className=' '/>:<FcLike/>} {likes.data}  */}
             

             <AiFillHeart className={liked.data === null? "":" fill-red-600"} />{likes.data} 
              </button>
              
            <div className=' flex items-center gap-2'> <BiComment/> {0}  </div>
         </div>


      

            </div>  

         </div>





         </div>

  )
}

export default Post