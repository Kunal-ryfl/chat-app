import React from 'react'

const Comment = ( comment:{caption:string}) => {
  return (
    <div className='rounded-sm border-white/10 border-t-2 md:border-x-2 b  w-full md:w-[600px]     p-2 '>
        <p>{comment.caption}</p>
        </div>
  )
}

export default Comment