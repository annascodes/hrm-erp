'use client'
import { useUser } from '@/lib/context/userContext'
import useApiReq from '@/lib/hooks/useApiReq'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { logout as reduxLogout } from '@/lib/redux/user/userSlice'

const Logout = () => {
    const { user, logout } = useUser()
    const dispatch = useDispatch()
    const { request, data, loading, err } = useApiReq()
    const handleLogOut = async () => {
        console.log('loggggginnggg out')
        logout()
        dispatch(reduxLogout())
        request(`/api/logout`, 'POST')

    }
    useEffect(() => {

        if (data)
            toast.success(data.msg)
    }, [data])
    useEffect(() => {
        if (err) toast.err('Error in logging out.')
    }, [err])
    return (
        <button onClick={handleLogOut} className='btn btn-outline hover:text-white btn-error btn-sm'>
            Logout
        </button>
    )
}

export default Logout
