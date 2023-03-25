import React from 'react'
import Create from './components/Create'
import Post from './components/Post'
import { api } from '~/utils/api'
import { MoonLoader } from 'react-spinners'



const Feed = () => {

  
  const {data:posts,isLoading,error} = api.example.getPosts.useQuery();
  if(isLoading) return<> <MoonLoader color='purple' className='mx-auto my-10'/> </>
  return (
    
   <div className='  pb-16 py-2'   >
    <div className=' w-full  border-white/10 px-2   py-4'>
       <h1 className=' text-2xl font-bold'>Home</h1>
    </div>
       


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