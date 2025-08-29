 

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LinkBtn = ({ href = null, name, className = null, activeOn = null, btnSize='btn-xs' }) => {
    const pathName = usePathname()
 

     /*         QUERY:
            //below is how i am using it; in btnSize i just want to send lg: instead of lg:btn so it dont ruin the functionality  ${pathName.includes(activeOn) && 'bg-black text-white'}  and  ${pathName === href && 'bg-black text-white'}  both so that it should work in parent and child senario
        
     
      <LinkBtn href={'/employee/leaveapplication'}
        activeOn={`/employee/leaveapplication`}
        className={''}
        btnSize={'lg:btn btn-xs hover:text-white'}
         name={<> <LuCalendarX className='text-base' /> Leaves  </>}
        />
     */
    return (
        <Link
            href={href}
            className={
            `btn btn-neutral btn-outline ${btnSize} tracking-widest uppercase flex items-center gap-1 
            ${pathName.includes(activeOn) && 'bg-black text-white'} 
            ${pathName === href && 'bg-black text-white'} 
            ${className}`
            }>
            {name} {/* as react node to accept whole fragments like <> ... </> */}
        </Link>
    )
}

export default LinkBtn

