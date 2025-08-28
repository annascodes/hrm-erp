'use client'

import { useUser } from '@/lib/context/userContext'
import useApiReq from '@/lib/hooks/useApiReq'
import { SetPendingLeaves } from '@/lib/redux/user/userSlice'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const NavLinks = () => {
    const { user, logout } = useUser()
    const { currentUser, pendingLeaves } = useSelector(state => state.user)
    const { request, data, loading, err } = useApiReq()
    const dispatch = useDispatch()


    useEffect(() => {
        if (user && (user.role === 'admin' || user.role === 'hr')) {
            // console.log('Going to fetch how many leave applications pending', user.role)
            request(`/api/leaves?status=Pending&onlyPendingCount=true`)
        }
    }, [user, currentUser])



    useEffect(() => {
        if (data && data.success) {
            if (data?.pendingCount)
                toast.success(`you have ${data?.pendingCount} pending leaves`)
            // console.log(data)

            // console.log('pending Leaves are: ', data.pendingCount)
            dispatch(SetPendingLeaves(data.pendingCount))
        }
        if (err) {
            toast.error(err.error)
        }


    }, [data, err])
    // console.log('pendingCount:', pendingLeaves)
    // console.log('typeof pendingCount:', typeof pendingLeaves)
    // console.log(' pendingCount:',  pendingLeaves !==0)


    return (
        <>
            <li><Link href={'/'}>Home</Link></li>
            {
                currentUser &&
                <li><Link href={'/activity'}>Activity</Link></li>
            }

            {/* <li>
                <details>
                    <summary>Dashboard</summary>
                    <ul className="p-2 z-10">
                        <li><Link href={''}>Admin</Link></li>
                        <li><Link href={''}>HR</Link></li>
                    </ul>
                </details>
            </li> */}
            {user
                ? <>

                    <li><Link href={`/profile/${user.username}`}>Profile</Link></li>
                </>
                : <>
                    <li><Link href={'/login'}>Login</Link></li>
                    <li><Link href={'/register'}>Register</Link></li>
                </>
            }
            {
                (user && (user.role === 'admin' || user.role === 'hr')) &&
                <>
                    <li><Link href={'/users'}>Users</Link></li>
                    <li>
                        <details>
                            <summary>Create</summary>
                            <ul className="p-2 z-10">
                                <li className='md:min-w-44' ><Link href={'/users/create/fromscratch'}>Create User</Link></li>
                                <li className='md:min-w-44'><Link href={'/users/create/noemployeeid'}>Assign Employee ID</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li><Link href={'/users'}>Users</Link></li>
                    <li>
                        <Link
                            className='flex justify-start items-center gap-1'
                            href={'/leaves'}
                        >
                            Leave
                            {
                                (pendingLeaves > 0)
                                &&
                                (<span className="badge badge-accent ">           {pendingLeaves}</span>)
                            }


                        </Link>
                    </li>
                </>
            }
            {
                (user && user.role === 'employee') &&
                <>
                    <li><Link href={'/employee'}>Employee</Link></li>
                </>
            }

        </>
    )
}

export default NavLinks
