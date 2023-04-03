import React from 'react'
import { api } from '~/utils/api'
import { MoonLoader,PacmanLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import Comment from '../components/Comment'
import {FcPortraitMode} from 'react-icons/fc'
import {FaUserAstronaut} from 'react-icons/fa'
import {GiAstronautHelmet} from 'react-icons/gi'
const Page = (  ) => {

  const router = useRouter()
  const query = router.query.id as string 
  console.log("Q = ",query)

  const {data,isLoading,error} = api.example.getPostById.useQuery(query);
  
 
  if(isLoading) return< div className=' h-screen w-screen flex justify-center items-center'> <PacmanLoader color='blue'  /> </div>

  return (
    <div className='  pb-16 py-2 min-h-screen'   >
    <div className=' w-full   px-2  py-2'>
       <h1 className=' text-sm md:text-xl font-bold'>Comments</h1>
    </div>
       
     
      {
        data && data.length < 1 &&
        <div className='  w-full md:w-[600px]     p-2'>
            <GiAstronautHelmet className=' text-9xl animate-pulse mx-auto  mt-20'/>
          <h1 className=' text-center text-xl '>Silence here </h1>
          <p className=' text-center text-white/60 my-5'>No comments</p>
             </div>
      }

       { data && data.length > 0 &&   
        data?.map((comment)=>(
          <Comment caption={comment?.caption}  createdAt={comment?.createdAt} author={comment?.user}  key={comment?.id }/>
        ))
       }

    </div>
  )
}

export default Page