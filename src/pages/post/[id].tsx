import React from 'react'
import { api } from '~/utils/api'
import { MoonLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import Comment from '../components/Comment'

const page = (  ) => {

  const router = useRouter()
  const query = router.query.id as string 
  console.log("Q = ",query)

  const {data,isLoading,error} = api.example.getPostById.useQuery(query);
  
 
  if(isLoading) return<> <MoonLoader color='purple' className='mx-auto my-10'/> </>

  return (
    <div className='  pb-16 py-2'   >
    <div className=' w-full   border-white/10 px-2   py-4'>
       <h1 className=' text-2xl font-bold'>Comments</h1>
    </div>
       
     
      {
        data && data.length < 1 &&
        <div className='  w-full md:w-[600px]     p-2'><h1>No comments</h1> </div>
      }

       { data && data.length > 0 &&   
        data?.map((comment)=>(
          <Comment caption={comment.caption}  key={comment.id}/>
        ))
       }

    </div>
  )
}

export default page