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
  
  const { mutate: likeMutation, } = api.example.toggleLike.useMutation({
   
   
    onSettled: async () => {
      // console.log('toggledLike') 
      
      await trpc.example.getLikes.invalidate()
      await trpc.example.Liked.invalidate()
    },

  })

  
  
  return (
    <div className=' rounded-xl bg-white/10 my-3 w-[330px] md:w-[600px] grid grid-rows-10  p-2 '>
        
        <div className=' py-1 row-span-2 flex flex-col '>
           <div className=' flex '>
            
           {/* <CgProfile className=' text-4xl mr-3'/> */}
           <Image src={data?.image ||"/img"} height={70} width={40} unoptimized alt="" className=" mr-3 rounded-full " />
           <div>

        <p className=' text-sm font-thin '> {data?.name }</p>
        <p className=' text-[11px] font-thin pt-1'> {date.toLocaleString()} </p>
           </div>
           </div>
             </div>
        <div className='relative row-span-6 bg-black/20  rounded-md p-2'>
          {
               img!=="/df"?
<Image src={img} className=" w-full   mb-1"  unoptimized alt="Postimg"  width={300} height={100} style={{ objectFit:'contain'}} />:<></>
          }
<p>{caption}</p>
        </div >
        <div className=' flex  items-center gap-2 py-1 row-span-2 text-gray-400'>
              <button  className=' flex items-center gap-2'
              onClick={()=>likeMutation({postid})}
              >  {liked.data === null?<  FcLikePlaceholder/>:<FcLike/>} {likes.data} </button>
            <div className=' flex items-center gap-2'> <BiComment/> {0}  </div>
            </div>
        
    </div>
  )
}

export default Post