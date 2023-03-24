import React from 'react'
import { api, RouterOutputs } from '~/utils/api';
import Image from 'next/image';

import {AiFillHeart} from 'react-icons/ai'
import {BiComment} from 'react-icons/bi'

import { InfiniteData,useQueryClient, QueryClient } from '@tanstack/react-query';




function updateCache({
  client,
  variables,
  data,
  action,
}: {
  client: QueryClient;
  
  variables: {
    postid: string;
  };
  data: {
    userId: string;
  };
  action: "like" | "unlike";
}) 


{
  client.setQueryData(
    [
      [
        "example","getPosts"
      ],
      {
        type: "query",
      }
    ],


    (oldData) => {
    //  console.log({oldData})
     const newData = oldData as RouterOutputs["example"]["getPosts"];
    //  console.log({newData})

      const value = action === "like" ? 1 : -1;
      const newPosts = newData.map((x)=>{
       if(x.id === variables.postid){
        //  console.log(x.id)
          return {
            ...x,
            likes: action === "like" ? [data.userId] : [],
            _count: {
              likes: x._count.likes + value,
            },
          }
        }

         return x
      });

      return {
       ...newData,newPosts
      }
    }
  
    



  );
}


const PostContainer = ( {tweet,client}:{tweet:RouterOutputs['example']['getPosts'][number];client:QueryClient}) => {
  
  
  
  const hasLiked = tweet.likes.length>0;
  
  
  // const {data,isLoading,error} = api.example.getUser.useQuery({text:userid});
  
  // const likes = api.example.getLikes.useQuery({id:postid});
  const trpc = api.useContext();
  
       
   const likeMutation = api.example.likePost.useMutation(
    {
      onSuccess: (data, variables) => {
        updateCache({ client, variables, data,  action: "like" });
      },
    }
   ).mutateAsync;
   const unlikeMutation = api.example.unlikePost.useMutation({
    onSuccess: (data, variables) => {
      updateCache({ client, data, variables, action: "unlike" });
    },
   }).mutateAsync;
  
  



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

            
        <p className=' text-sm  font-semibold '> {tweet.user.name }</p>
        <p className=' text-[10px] font-extralight mb-2   '> {tweet.createdAt?.toLocaleString()} </p>
      
             <p className=' text-sm md:text-md  text-white/95 '>{tweet.caption}</p>
        </div>

           <div className='  relative   bg-purpe-500'>
          {
               tweet.img &&
<Image src={tweet.img} className=" w-full rounded-xl   mb-1"  unoptimized alt="Postimg"  width={300} height={100} style={{ objectFit:'contain'}} />          
}

          

         <div  className='  py-2 flex gap-2  ' > 
              <button  className=' flex items-center gap-2'
              onClick = {!hasLiked ? ()=>likeMutation({postid:tweet.id}):()=>unlikeMutation({postid:tweet.id})}
              >  
              {/* { !bool_like ?< AiOutlineHeart className=' '/>:<FcLike/>} {likes.data}  */}
             

             <AiFillHeart className={!hasLiked? "":" fill-red-600"} />{tweet._count.likes} 
              </button>
              
            <div className=' flex items-center gap-2'> <BiComment/> {0}  </div>
         </div>


      

            </div>  

         </div>





         </div>

  )
}

export default PostContainer