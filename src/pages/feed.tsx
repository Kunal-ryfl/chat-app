import React from 'react'
import Create from './components/Create'
import Post from './components/Post'
import { api } from '~/utils/api'
import Link from 'next/link'
import { MoonLoader } from 'react-spinners'
import { useQueryClient } from '@tanstack/react-query'


const Feed = () => {
  const client = useQueryClient()

  const {data:posts,isLoading,error} = api.example.getPosts.useQuery();
  if(isLoading) return<> <MoonLoader color='purple' className='mx-auto my-10'/> </>
  return (
    
   <div className=' px-2 pb-16 py-2'   >
       
       <h1 className=' text-2xl font-bold'>Home</h1>


    <Create/>  
    {
      posts?.length  &&
           posts?.map((post)=>(
        
        <Post client={client}    tweet={post} key={post.id} />
      ))
    }

   </div>
   
     
  )
}

export default Feed