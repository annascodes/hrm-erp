'use client'
import LinkBtn from '@/components/LinkBtn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const layout = ({ children }) => {
    const pathName = usePathname()
    return (
        <div className='flex flex-row'>
            <div className=' w-2/12  flex flex-col p-5 bg-stone-100 rounded-4xl m-2  gap-3 items-start '>
                <h1 className='text-2xl font-bold mb-5 text-center mx-auto tracking-widest'>Dashboard</h1>

                <LinkBtn href={'/employee/leaveapplication'}
                activeOn={`/employee/leaveapplication`}
                className={'border-none'} name={'Leave'} />
                <LinkBtn href={'/employee/calender'} className={'border-none'} name={'Calender'} />
                <LinkBtn href={'/employee/projects'} className={'border-none'} name={'Projects'} />
                <LinkBtn href={'/employee/reports'} className={'border-none'} name={'Reports'} />
                <LinkBtn href={'/employee/notes'} className={'border-none'} name={'Notes'} />


            </div>


            <div className=' w-10/12 p-5 '>
                {children}
            </div>



        </div>
    )
}

export default layout
