import React from 'react'
import UserSummary from './UserSummary'
import moment from 'moment'
import LeaveAppResponse from './LeaveAppResponse'
import LeaveTableFilter from './LeaveTableFilter'

const LeaveTable = ({ allLeaves = null, handleFilter=null, filterLoading=false }) => {
    const getLeaveDays = (start, end) => {

        const startTime = new Date(start).getTime()
        // e.g., new Date("2025-07-28T00:00:00.000Z").getTime()
        // Output: 1753660800000 (milliseconds since Jan 1, 1970)

        const endTime = new Date(end).getTime()
        // e.g., new Date("2025-08-02T00:00:00.000Z").getTime()
        // Output: 1754092800000

        const diffInMs = endTime - startTime
        // 1754092800000 - 1753660800000
        // Output: 432000000 milliseconds

        const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
        // 432000000 / 86400000 (ms in a day)
        // Output: 5 days

        return diffInDays + 1 // +1 to include both start and end days
        // Output: 6
    }
    if (allLeaves && allLeaves.length === 0) return

    return (
        <div className="overflow-x-auto bg-stone-50 rounded-2xl">
            <table className="table table-md">
                <thead>
                   <LeaveTableFilter handle={handleFilter} filterLoading={filterLoading} />
                    <tr>
                        <th></th>
                        <th>Leave Posted on</th>
                        <th>Employee</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>number of days</th>
                        <th>Reason</th>
                        <th>Status</th>
                        {/* <th>Responded by</th> */}

                    </tr>
                </thead>
                <tbody>
                    {
                        allLeaves && allLeaves.map((l, indx) => {
                            return (
                                <tr key={l._id} className='hover:bg-blue-50'>
                                    <th>{++indx}</th>
                                     <td>  {moment(l.createdAt).format('ddd Do MMMM YYYY')}  </td>
                                    <td>
                                        <UserSummary title={l.employee.userId.username} user={l.employee} />

                                    </td>
                                    <td>{l.leaveType}</td>
                                    <td>
                                        {moment(l.startDate).format('ddd Do MMMM YYYY')}
                                    </td>
                                    <td>
                                        {moment(l.endDate).format('ddd Do MMMM YYYY')}
                                    </td>
                                    <td>{getLeaveDays(l.startDate, l.endDate)}</td>
                                    <td>
                                        {l.reason.length > 20
                                            ? <span>{l.reason.slice(0, 20)} ... </span>
                                            : l.reason

                                        }
                                        {/* {l.reason} */}

                                    </td>
                                    <td> 
                                        <LeaveAppResponse leave={l}  /> 
                                        <div className='text-xs'>  {l.approver && <>{l?.approver?.username} ({l?.approver?.role}) </> }</div>
                                        </td>
                                    {/* <td> 
                                        {l.approver && <>{l?.approver?.username} ({l?.approver?.role}) </> }
                                        
                                    </td> */}
                                   
                                </tr>
                            )
                        })
                    }


                </tbody>
                <tfoot>
                   <tr>
                        <th></th>
                        <th>Leave Posted on</th>
                        <th>Employee</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>number of days</th>
                        <th>Reason</th>
                        <th>Status</th>
                        {/* <th>Responded by</th> */}

                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default LeaveTable
