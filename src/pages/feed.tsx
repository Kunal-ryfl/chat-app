import React from 'react'
import Create from './components/Create'
import Post from './components/Post'
import { api } from '~/utils/api'
import Link from 'next/link'
import { MoonLoader } from 'react-spinners'

const feed = () => {
  const {data,isLoading,error} = api.example.getPosts.useQuery();
  if(isLoading) return<> <MoonLoader color='purple' className=' my-10'/> </>
  return (
    
   <div  >
       
       <h1 className=' text-2xl font-bold'>Home</h1>


    <Create/>  
    {
      data?.map((post)=>(
        <Post caption={post.caption} key={post.id} postid ={post.id} img={post.img||"/df"} userid={post.userId} date={post.createdAt} />
      ))
    }

   </div>
   
     
  )
}

export default feed