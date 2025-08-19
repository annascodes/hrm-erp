'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const layout = ({ children }) => {
    const pathName = usePathname()
    return (
        <div className='p-5'>
            <div className=' flex flex-row justify-start gap-3 items-center mb-5'>
                <Link href={'/users/create/fromscratch'} className={`btn btn-neutral btn-outline btn-xs tracking-widest text-xs ${pathName === '/users/create/fromscratch' && 'bg-black text-white'}`} >From Scratch</Link>
                
                <Link href={'/users/create/noemployeeid'} className={`btn btn-neutral btn-outline btn-xs tracking-widest text-xs ${pathName === '/users/create/noemployeeid' && 'bg-black text-white'}`} >Assign EmployeeId</Link>

            </div>



            {children}



        </div>
    )
}

export default layout
