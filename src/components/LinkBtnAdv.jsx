 

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LinkBtnAdv = ({ href = null, name, className = `btn btn-neutral btn-outline btn-xs`, activeOn = null, btnSize='btn-xs' }) => {
    const pathName = usePathname()
 
    return (
        <Link
            href={href}
            className={
                `tracking-widest uppercase flex items-center gap-1 
            ${pathName.includes(activeOn) && 'bg-black text-white'} 
            ${pathName === href && 'bg-black text-white'} 
            ${className}`}>
            {name} {/* as react node to accept whole fragments like <> ... </> */}
        </Link>
    )
}

export default LinkBtnAdv

