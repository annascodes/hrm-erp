import React from 'react'

const loading = () => {
  return (
    <div className='h-svh flex justify-center items-center'>
        {/* <span>
            Loading
        <span className='ml-3 loading loading-spinner loading-xl'></span>
        </span> */}
        <progress className="progress w-56"></progress>
      
    </div>
  )
}

export default loading
