'use client'
import React from 'react'
import NavLinks from './NavLinks'
import { useUser } from '@/lib/context/userContext'
import { IoIosArrowDown } from "react-icons/io";
import Logout from '../Logout';
import Link from 'next/link';


const Nav = () => {
    const { user } = useUser()
    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <NavLinks />
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">HRM</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    <NavLinks />
                </ul>
            </div>
            <div className="navbar-end   ">
                {/* <div className='w-10 h-10 overflow-hidden rounded-full   '>
                    {
                        user  
                        && <img src={user?.profileImg} className='w-full h-full object-cover' alt="" />
                        // : <div className='flex justify-center items-center bg-blue-200 text-xs  w-full h-full'> <span>K A</span> </div>
                    }
                    
                </div>
                {user && <p className='text-sm'>{user?.username} </p>} */}

                <div className="dropdown dropdown-end  mx-5 rounded-xl cursor-pointer">
                    <div tabIndex={0} role="button" className="btn btn-neutral btn-outline btn-sm border-none ">
                        {user && <p className='text-sm flex justify-center items-center gap-2 '>
                            {user?.username}
                            <IoIosArrowDown className='text-lg ' />
                        </p>}
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu  rounded-box z-1 w-52 p-2 shadow-sm bg-blue-50 flex flex-col gap-2">

                        <li> <Link className='btn btn-primary btn-outline border-none btn-sm' href={`/profile/${user && user.username}`}>Profile</Link> </li>
                        <li>
                            <Logout />
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Nav
