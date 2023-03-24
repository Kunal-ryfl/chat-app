import React from 'react'
import { api } from '~/utils/api';
import Image from 'next/image';
import {FcLikePlaceholder} from 'react-icons/fc'
import {FcLike} from 'react-icons/fc'
import {AiFillHeart} from 'react-icons/ai'
import {BiComment} from 'react-icons/bi'
import { Post } from '~/types';

type likesElement = {
 userId:string
}

type authorType = {
 id:string
 name :string | null
 image :string | null  

}

const PostContainer = (post:{caption:string, author:authorType , hasLiked:likesElement[],likesCount:number ,date:Date,userid:string,img:string,postid:string}) => {

  


  const {caption,date,userid,img,postid,likesCount,author} = post;

  // const {data,isLoading,error} = api.example.getUser.useQuery({text:userid});
  
  // const likes = api.example.getLikes.useQuery({id:postid});
  const trpc = api.useContext();

 
  



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
           <Image src={ author?.image||"/img"} height={70} width={40} unoptimized alt="" className=" mr-3 rounded-full border-white/10 border-2 " />
         </div>



         <div className=' grid grid-rows-10   col-span-9'>
        <div className=' p-1 '>

            
        <p className=' text-sm  font-semibold '> {author?.name }</p>
        <p className=' text-[10px] font-extralight mb-2   '> {date?.toLocaleString()} </p>
      
             <p className=' text-sm md:text-md  text-white/95 '>{caption}</p>
        </div>

           <div className='  relative   bg-purpe-500'>
          {
               img!=="/df"?
<Image src={img} className=" w-full rounded-xl   mb-1"  unoptimized alt="Postimg"  width={300} height={100} style={{ objectFit:'contain'}} />:<></>
          }

          

      

            </div>  

         </div>





         </div>

  )
}

export default PostContainer