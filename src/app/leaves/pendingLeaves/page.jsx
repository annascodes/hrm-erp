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
  const [pendingL, setPendingL] = useState(null)
  useEffect(() => {
    request(`/api/leaves?status=Pending`)
  }, [])
  useEffect(() => {
    if (data && data.success) {
      setPendingL(data.pendingLeaves)
    }
    if (err && err.error) {
      toast.error(err.error)
    }

  }, [data, err])
 
  return (
    <div>
      {err && <ErrDiv error={err.error} />}
      {/* {
        pendingL && <pre>{JSON.stringify(pendingL, null, 10)}</pre>
      } */}

      { pendingL && pendingL.length===0 && <p className='text-center m-5'>no pending leave</p> }
      {
        loading
          ? <div className='flex justify-center h-46 '> <Loading /> </div>
          : <LeaveTable allLeaves={pendingL} />
          //  <div className="overflow-x-auto">
          //   <table className="table table-sm">
          //     <thead>
          //       <tr>
          //         <th></th>
          //         <th>Employee</th>
          //         <th>Leave Type</th>
          //         <th>Start Date</th>
          //         <th>End Date</th>
          //         <th>number of days</th>
          //         <th>Reason</th>
          //         <th>Status</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {
          //         pendingL && pendingL.map(l => {
          //           return (
          //             <tr key={l._id}>
          //               <th>1</th>
          //               <td>
          //                 <UserSummary title={l.employee.userId.username} user={l.employee} />

          //               </td>
          //               <td>{l.leaveType}</td>
          //               <td>
          //                 {moment(l.startDate).format('ddd Do MMMM YYYY')}
          //               </td>
          //               <td> 
          //                 {moment(l.endDate).format('ddd Do MMMM YYYY')}
          //                  </td>
          //               <td>{getLeaveDays(l.startDate, l.endDate)}</td>
          //               <td>{l.reason}</td>
          //               <td><LeaveAppResponse leave={l} /> </td>
          //             </tr>
          //           )
          //         })
          //       }


          //     </tbody>
          //     <tfoot>
          //       <tr>
          //         <th></th>
          //         <th>Employee</th>
          //         <th>Leave Type</th>
          //         <th>Start Date</th>
          //         <th>End Date</th>
          //         <th>number of days</th>
          //         <th>Reason</th>
          //         <th>Status</th>
          //       </tr>
          //     </tfoot>
          //   </table>
          // </div>
      }



    </div>
  )
}

export default page
