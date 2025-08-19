'use client'
import React, { useEffect } from 'react'
import LeaveStatus from './LeaveStatus';
import { useUser } from '@/lib/context/userContext';
import useApiReq from '@/lib/hooks/useApiReq';
import toast from 'react-hot-toast';
import Loading from './Loading';
import Cookies from 'js-cookie';
import { getPendingLeaves, setPendingLeaves } from '@/lib/clientStorage/pendingLeaves';
import { useDispatch, useSelector } from 'react-redux';
import { SetPendingLeaves } from '@/lib/redux/user/userSlice';

const LeaveAppResponse = ({ leave = null }) => {
    if (!leave) return;
    const { user, login } = useUser()
    const { currentUser, pendingLeaves } = useSelector(state => state.user)
    const { request, data, loading, err } = useApiReq()
    const dispatch = useDispatch()

    const handleLeaveResp = (response) => {
        request(`/api/leaves/${leave._id}`, 'PUT',
            {
                response: response,
                startDate: leave.startDate,
                endDate: leave.endDate,
                leaveType: leave.leaveType,
                employeeId: leave.employee._id
            })
    }
    useEffect(() => {
        if (data && data.success) {
            toast.success(data.msg)

            if (leave.status === "Pending") { 
                dispatch(SetPendingLeaves(pendingLeaves - 1))

            }



        }
        if (err && err.error) {
            toast.error(err.error)
        }

    }, [data, err])
    console.log('data in leaveappresponse', data)
    console.log('err in leaveappresponse', err)

    return user && (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                className="btn btn-neutral btn-outline btn-sm border-none"
                onClick={() => document.getElementById(`${leave._id}-LeaveAppResponse`).showModal()}
            >
                {(data && data.updateLeave.status) ? data.updateLeave.status : leave.status}
                {/* {leave.status} */}
            </button>
            <dialog id={`${leave._id}-LeaveAppResponse`} className="modal">
                <div className="modal-box">
                    {
                        (user.role === 'admin' || user.role === 'hr') &&
                        <>
                            <h3 className="font-bold text-lg">Response to leave Application</h3>
                            {loading
                                ? <div className='flex justify-center'> <Loading /> </div>
                                : <div className='flex justify-around gap-3 my-5'>
                                    <button
                                        onClick={() => handleLeaveResp('Approved')}
                                        className='btn btn-neutral btn-outline text-blue-500 border-none hover:text-blue-300'>
                                        <LeaveStatus status={'Approved'} />
                                        Approve it.
                                    </button>
                                    <button
                                        onClick={() => handleLeaveResp('Rejected')}
                                        className='btn btn-neutral btn-outline text-red-500 border-none hover:text-red-300'>
                                        <LeaveStatus status={'Rejected'} />
                                        Reject it.</button>
                                </div>
                            }

                        </>
                    }


                    <div className='flex justify-start my-5 gap-2 text-base'>
                        <p className='font-semibold'>Status:</p>
                        <p className='flex flex-row gap-1 items-center'>
                            <LeaveStatus status={(data && data.updateLeave.status) ? data.updateLeave.status : leave.status} />

                            {(data && data.updateLeave.status) ? data.updateLeave.status : leave.status}
                        </p>
                    </div>

                    {
                        (leave && leave.approver) && <>
                            <div className='flex justify-start gap-2 text-base'>
                                <p className='font-semibold'>Responded By:</p>
                                <p>{leave?.approver?.username} ( {leave?.approver?.role} )</p>
                            </div>
                            <div className='flex flex-col justify-start gap-0  my-5 text-base'>
                                <p className='font-semibold'>Rejection reason</p>
                                <p>{leave?.rejectionReason}</p>
                            </div>
                        </>
                    }

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default LeaveAppResponse
