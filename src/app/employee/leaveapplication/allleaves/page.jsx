'use client'
import ErrDiv from '@/components/ErrDiv'
import LeaveTable from '@/components/LeaveTable'
import Loading from '@/components/Loading'
import useApiReq from '@/lib/hooks/useApiReq'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const page = () => {
    const { request, data, loading, err } = useApiReq()
    const { currentUser } = useSelector(state => state.user)
    const [allLeaves, setAllLeaves] = useState(null)

    const handleFetchLeaves = (formData) => {
        request(`/api/employee/${currentUser._id}/leave?createdAt=${formData?.createdAt}&leaveType=${formData?.leaveType}&startDate=${formData?.startDate}&endDate=${formData?.endDate}`)

    }
    const handleFilter = (formDate)=>{
        // console.log('employee filter tome: ',formDate)
        handleFetchLeaves(formDate)
    }

    useEffect(() => {

        handleFetchLeaves()

    }, [])
    useEffect(() => {
        if (data && data.success) {
            toast.success(data.msg)
            setAllLeaves(data.allLeaves)

        }
        if (err && err.error) {
            toast.error(err.error)

        }
    }, [data, err])
    return loading ? <Loading /> : (
        <div>
            <h1 className='text-2xl  font-bold mb-5' > All leaves</h1>

            {/* {
                allLeaves && <pre>{JSON.stringify(allLeaves, null, 10)}</pre>
            } */}

            {
                (allLeaves && allLeaves.length === 0) && <p className='text-center text-sm  tracking-wider'>( No leave yet. Going clean so far. )</p>
            }

            {
                allLeaves && <LeaveTable allLeaves={allLeaves} handleFilter={handleFilter} filterLoading={loading} />
            }
            {
                err && <ErrDiv error={err?.error} />
            }


        </div>
    )
}

export default page
