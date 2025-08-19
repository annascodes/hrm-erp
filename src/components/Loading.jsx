import React from 'react'

const Loading = ({type='spinner', size='sm'}) => {
  return (
    <span className={`loading loading-${type} loading-${size}`}></span>
  )
}

export default Loading
