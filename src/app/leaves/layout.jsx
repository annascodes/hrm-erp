'use client'
import LeaveStatus from '@/components/LeaveStatus';
import LinkBtn from '@/components/LinkBtn'
import { getPendingLeaves } from '@/lib/clientStorage/pendingLeaves'
import { SetPendingLeaves } from '@/lib/redux/user/userSlice';
import React, { useEffect, useState } from 'react'
import { MdHourglassEmpty } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const layout = ({ children }) => {
    const [pending, setPending] = useState(0)
    const dispatch = useDispatch()
    const {pendingLeaves} = useSelector(state=>state.user)

     

    return (
        <div className='p-5'>

 

            {children}
        </div>
    )
}

export default layout

