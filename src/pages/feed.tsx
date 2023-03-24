import React from 'react'
import Create from './components/Create'
import Post from './components/Post'
import { api } from '~/utils/api'
import { MoonLoader } from 'react-spinners'







const Feed = () => {

  
  const {data:posts,isLoading,error} = api.example.getPosts.useQuery();
  if(isLoading) return<> <MoonLoader color='purple' className='mx-auto my-10'/> </>
  return (
    
   <div className=' px-2 pb-16 py-2'   >
       
       <h1 className=' text-2xl font-bold'>Home</h1>


    <Create/>  
    {
      posts?.length  &&
           posts?.map((post)=>(
        
        <Post   tweet={post} key={post.id} />
      ))
    }

   </div>
   
     
  )
}

export default Feed