import LinkBtn from '@/components/LinkBtn'
import React, { use, useId } from 'react'

const layout = ({children, params}) => {
    const unWrapParams = use(params)
    const {userId} = unWrapParams;
  return (
    <div>
        <div className='flex flex-row justify-center my-5 gap-2'>

           <LinkBtn href={`/profile/${userId}`} 
                    name={'Profile'} 
                    />

           <LinkBtn href={`/profile/${userId}/updateuser`} 
                    name={'Update User'}
                    />
           <LinkBtn href={`/profile/${userId}/updateemployee`} 
                    name={'Update Employee'}
                    />
        </div>

        {children}
      
    </div>
  )
}

export default layout
