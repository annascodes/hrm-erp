'use client'
import LeaveTable from '@/components/LeaveTable'
import Loading from '@/components/Loading'
import useApiReq from '@/lib/hooks/useApiReq'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoRefreshSharp } from "react-icons/io5";
import { SetPendingLeaves, signIn } from '@/lib/redux/user/userSlice'
import { useUser } from '@/lib/context/userContext'
import { setPendingLeaves } from '@/lib/clientStorage/pendingLeaves'
import ErrDiv from '@/components/ErrDiv'
import toast from 'react-hot-toast'

const page = () => {

    const dispatch = useDispatch()
    const { currentUser, pendingLeaves } = useSelector(state => state.user)
    const { request, data, loading, err } = useApiReq()

    const [status, setStatus] = useState('Pending')
    const [allLeaves, setAllLeaves] = useState(null)

    const handleFetchLeaves = (value, formData = null) => {
        setStatus(value)
        request(`/api/leaves?status=${value}&createdAt=${formData?.createdAt}&startDate=${formData?.startDate}&endDate=${formData?.endDate}&username=${formData?.username}&leaveType=${formData?.leaveType}`)
    }
    useEffect(() => {
        handleFetchLeaves(status)
    }, [])
    useEffect(() => {
        if (data && data.success) {
            setAllLeaves(data.leaves)
            dispatch(SetPendingLeaves(data.pendingCount))

        }
        if (err && err.error) {
            toast.error(err.error)
        }

    }, [data, err])
    const handleRefresh = () => {
        handleFetchLeaves(status)
    }

    const handleFilter = (formData) => {
        console.log('formData for filter: ', formData)
        handleFetchLeaves(status, formData)

    }
    return (
        <div>
            {/* <pre>
                {JSON.stringify(pendingLeaves, null, 10)}
            </pre> */}

            <h1 className='text-center text-3xl font-bold'>{status} Leaves </h1>
            <div className='flex justify-between items-center'>
                <div className='flex flex-row justify-center items-center gap-3 my-10'>
                    <button onClick={() => handleFetchLeaves('Pending')}
                        className={`btn btn-neutral btn-outline btn-xs uppercase tracking-widest border-none ${status === 'Pending' && 'bg-black text-white'}`}>Pending {pendingLeaves > 0 && `( ${pendingLeaves} )`}  </button>
                    <button onClick={() => handleFetchLeaves('Approved')}
                        className={`btn btn-neutral btn-outline btn-xs uppercase tracking-widest border-none ${status === 'Approved' && 'bg-black text-white'}`}
                    >Approved</button>
                    <button onClick={() => handleFetchLeaves('Rejected')}
                        className={`btn btn-neutral btn-outline btn-xs uppercase tracking-widest border-none ${status === 'Rejected' && 'bg-black text-white'}`}
                    >Rejected</button>
                </div>
                <button
                    disabled={loading}
                    onClick={handleRefresh}
                    className='btn btn-neutral btn-outline btn-xs  flex justify-center items-center gap-1 tracking-widest'>
                    {loading ? <Loading /> : 'refresh'}
                </button>
            </div>

            {allLeaves && allLeaves.length === 0 && <p className='text-center m-5 uppercase text-xs tracking-widest'>no {status} leave</p>}
            {
                loading
                    ? <div className='flex justify-center h-46 '> <Loading /> </div>
                    : <LeaveTable allLeaves={allLeaves} handleFilter={handleFilter} />

            }


            <pre>
                {err &&  JSON.stringify(err, null, 10)}
            </pre>
            {err && <ErrDiv error={err.error} />}

        </div>
    )
}

export default page
