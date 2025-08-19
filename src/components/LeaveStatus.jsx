import React from 'react'
import { MdCancel, MdCheckCircle, MdHourglassEmpty } from 'react-icons/md'

const LeaveStatus = ({status}) => {
    return (
        <>
            {
                status === 'Approved' && <MdCheckCircle className="text-green-300  text-xl" />
            }
            {
                status === 'Rejected' && <MdCancel className=" text-red-300  text-xl" />
            }
            {
                status === 'Pending' && <MdHourglassEmpty className="text-yellow-300  text-xl" />
            }

        </>
    )
}

export default LeaveStatus
