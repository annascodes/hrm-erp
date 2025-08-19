// 'use client'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React from 'react'

// const LinkBtn = ({href=null, name , className=null}) => {
//     const pathName = usePathname()
//     return (
//         <Link
//             href={href}
//             className={`btn btn-neutral btn-outline btn-xs tracking-widest uppercase ${pathName === href && 'bg-black text-white'} ${className}`} >
//             {name}
//         </Link>
//     )
// }

// export default LinkBtn

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LinkBtn = ({ href = null, name, className = null, activeOn = null }) => {
    const pathName = usePathname()
    return (
        <Link
            href={href}
            className={`btn btn-neutral btn-outline btn-xs tracking-widest uppercase flex items-center gap-1 
            ${pathName.includes(activeOn) && 'bg-black text-white'} 
            ${pathName === href && 'bg-black text-white'} 
            ${className}`}>
            {name}
        </Link>
    )
}

export default LinkBtn

