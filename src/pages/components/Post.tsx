import React from 'react'
import { api } from '~/utils/api';
import Image from 'next/image';
import {FcLikePlaceholder} from 'react-icons/fc'
import {FcLike} from 'react-icons/fc'
import {BiComment} from 'react-icons/bi'
const Post = (post:{caption:string,date:Date,userid:string,img:string,postid:string}) => {
  const {caption,date,userid,img,postid} = post;
  const {data,isLoading,error} = api.example.getUser.useQuery({text:userid});
  const likes = api.example.getLikes.useQuery({id:postid});
  const trpc = api.useContext();

  const liked= api.example.Liked.useQuery({id:postid});
  

  let bool_like:boolean = false ;

  liked !== null ? bool_like = false : bool_like = true;   


  const { mutate: likeMutation, } = api.example.toggleLike.useMutation({
   
    onSettled: async () => {
      // console.log('toggledLike') 
      
      await trpc.example.getLikes.invalidate()
      await trpc.example.Liked.invalidate()
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
        <div className=' p-1 row-span-2'>

            
        <p className=' text-sm  font-semibold '> {data?.name }</p>
        <p className=' text-[10px] font-extralight mb-2   '> {date?.toLocaleString()} </p>
      
             <p className=' text-sm md:text-md  text-white/95 '>{caption}</p>
        </div>

           <div className='  relative row-span-8  bg-purpe-500'>
          {
               img!=="/df"?
<Image src={img} className=" w-full rounded-xl   mb-1"  unoptimized alt="Postimg"  width={300} height={100} style={{ objectFit:'contain'}} />:<></>
          }

          
          


         <div  className='  py-2 flex gap-2  ' > 
              <button  className=' flex items-center gap-2'
              onClick={()=>likeMutation({postid})}
              >  { !bool_like ?<  FcLikePlaceholder/>:<FcLike/>} {likes.data} </button>
            <div className=' flex items-center gap-2'> <BiComment/> {0}  </div>
         </div>

            </div>  

         </div>





         </div>

  )
}

export default Post