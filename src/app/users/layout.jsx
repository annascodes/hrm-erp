'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const layout = ({children}) => {
    const pathName = usePathname()
  return (
    <div>
        <div className=' flex flex-row justify-center gap-3 items-center my-5'>
            <Link href={'/users'} className={`btn btn-neutral btn-outline btn-xs tracking-widest uppercase ${pathName ==='/users'  && 'bg-black text-white'}`} >All users</Link>

            <Link href={'/users/create/fromscratch'} className={`btn btn-neutral btn-outline btn-xs tracking-widest uppercase ${pathName.includes('/users/create')  && 'bg-black text-white'}`} >create</Link>

            {/* <Link href={'/create'} className='btn btn-neutral btn-outline btn-xs tracking-widest uppercase'>admins</Link>
            <Link href={'/create'} className='btn btn-neutral btn-outline btn-xs tracking-widest uppercase'>hrs</Link>
            <Link href={'/create'} className='btn btn-neutral btn-outline btn-xs tracking-widest uppercase'>employee</Link> */}
        </div>


        {children}


      
    </div>
  )
}

export default layout
