import React from 'react'
import Create from './components/Create'
import Post from './components/Post'
import { api } from '~/utils/api'
import { MoonLoader } from 'react-spinners'
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";


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




// export async function getServerSideProps(ctx:GetServerSidePropsContext) {
//   const session = await getServerAuthSession(ctx)

//   console.log("mid = ",session)
//      if(!session){
//       return{
//           redirect:{destination:"/signin",permanent:false},
//           props:{}
//       }
//      }

//   return {
//     props: {session,}, // will be passed to the page component as props
//   }
// }
export default Feed