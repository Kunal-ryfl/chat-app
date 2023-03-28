import React, { useState } from 'react'
import { api } from '~/utils/api';
import { commentInput } from '~/types';
import toast from 'react-hot-toast'

const CreateComment = (post:{postId:string }) => {
    
    const {mutate} = api.example.createComment.useMutation();
    const {postId} = post
  const [comment,setComment] = useState("");
   
  return (
 
<form 
 onSubmit={(e) => {
    e.preventDefault()
    
    const result = commentInput.safeParse({postId:postId,comment:comment})
    
    if (!result.success) {
      toast.error(result.error.format()._errors.join('\n'))
      return
    }
    
    
    mutate({postId:postId,comment:comment})
    
  }}
  className=" my-2"
>

  <div className="input-group ">
    <input type="text" value={comment} placeholder="add a comment..." className="input input-bordered bg-white/10"
     onChange={(e)=>setComment(e.target.value)}
     
    />
    <button className="btn btn-square">add</button>
  </div>
</form>

  
  )
}

export default CreateComment