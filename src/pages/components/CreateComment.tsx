import React, { useState } from 'react'
import { api } from '~/utils/api';
import { commentInput } from '~/types';
import toast from 'react-hot-toast'
import { RouterOutputs } from '~/utils/api';

const CreateComment = ({tweet}:{tweet:RouterOutputs['example']['getPosts'][number]} ) => {
  
  const [comment,setComment] = useState("");

  const trpc = api.useContext();
    const {mutate} = api.example.createComment.useMutation({
      onMutate:async()=>{
        
        
       await trpc.example.getPosts.cancel();
       

       const prevPosts = trpc.example.getPosts.getData()
       
       trpc.example.getPosts.setData(undefined,(x)=>{
        if(!x) return prevPosts

        return x.map(post=>{
         if(post.id===tweet?.id){
           return ({
             ...post,
             _count:{
               likes:tweet?._count?.likes,
               comments:tweet._count?.comments+1,
             }  

           })
         }
         return post

        })
   })
   
   setComment("")
   toast.success("Comment added")
   
   return {prevPosts}
      },

      
      onError: (err, id, context) => {
        toast.error(`An error occured when commenting post`)
        if (!context) return
        trpc.example.getPosts.setData(undefined, () => context.prevPosts)
      },
  
      onSettled: async () => {
        await trpc.example.getPosts.invalidate()
      },
    });
  
  return (
 
<form 
 onSubmit={(e) => {
    e.preventDefault()
    
    const result = commentInput.safeParse({postId:tweet?.id,comment:comment})
    
    if (!result.success) {
      toast.error(result.error.format()._errors.join('\n'))
      return
    }
    

    mutate({postId:tweet?.id,comment:comment})
    
  }}
  className=" my-2 "
>


  
  <div className=" px-2 w-full">
    <div className="relative mb-4 flex w-full  flex-wrap items-baseline">
      <input
        type="search"
        className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto text-sm     bg-transparent bg-clip-padding  py-1.5  font-normal  outline-none transition duration-300 ease-in-out focus:border-primary focus:text-white/60 focus:shadow-te-primary focus:outline-none "
        placeholder="Add a reply"
        aria-label="Search"
        aria-describedby="button-addon1" 
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        />
      <button
        className="relative ml-2  hidden   items-center rounded-full bg-white/10 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-[hsl(280,100%,50%)] hover:shadow-lg focus:bg-[hsl(280,100%,50%) focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[hsl(280,100%,50%) active:shadow-lg"
        id="button-addon1"
        data-te-ripple-init
        data-te-ripple-color="light">
        add
      </button>
    </div>
  
</div>

</form>

  
  )
}

export default CreateComment