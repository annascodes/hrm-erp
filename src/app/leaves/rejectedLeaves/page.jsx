'use client'
import ErrDiv from '@/components/ErrDiv'
import HoverInfo from '@/components/HoverInfo'
import LeaveAppResponse from '@/components/LeaveAppResponse'
import Loading from '@/components/Loading'
import UserSummary from '@/components/UserSummary'
import useApiReq from '@/lib/hooks/useApiReq'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import moment from 'moment'
import LeaveTable from '@/components/LeaveTable'

const page = () => {
  const { request, data, loading, err } = useApiReq()
  const [allLeaves, setAllLeaves] = useState(null)
  useEffect(() => {
    request(`/api/leaves?status=Rejected`)
  }, [])
  useEffect(() => {
    if (data && data.success) {
      setAllLeaves(data.pendingLeaves)
    }
    if (err && err.error) {
      toast.error(err.error)
    }

  }, [data, err])
 
  return (
    <div>
      {err && <ErrDiv error={err.error} />}
      {/* {
        allLeaves && <pre>{JSON.stringify(allLeaves, null, 10)}</pre>
      } */}

      { allLeaves && allLeaves.length===0 && <p className='text-center m-5'>no pending leave</p> }
      {
        loading
          ? <div className='flex justify-center h-46 '> <Loading /> </div>
          : <LeaveTable allLeaves={allLeaves} />
          
      }



    </div>
  )
}

export default page
