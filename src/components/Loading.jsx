import React from 'react'

const Loading = ({ type = 'spinner', size = 'sm', container = false }) => {
  return (
    <>
      {
        container === true &&
        <div className='flex h-36 justify-center items-center'>
          <span className={`loading loading-${type} loading-${size}`}></span>
        </div>
      }
      {
        container === false &&
          <span className={`loading loading-${type} loading-${size}`}></span>
 
      }
    </>
  )
}

export default Loading
