import LinkBtn from '@/components/LinkBtn'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div>
            <div className='flex flex-row justify-center bg-stone-50 rounded-2xl p-2 items-center gap-5 my-10'>
                <LinkBtn href={'/employee/leaveapplication'} name={'Create'} />
                <LinkBtn href={'/employee/leaveapplication/allleaves'} name={'All'} />


            </div>

            {children}
        </div>
    )
}

export default layout
