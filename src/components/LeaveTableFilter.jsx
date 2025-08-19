'use'
import React, { useState } from 'react'
import Loading from './Loading'

function LeaveTableFilter({handle=null, filterLoading=false}) {
    const [formData, setFormData] = useState()
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleFilter = () => {
        if(handle)
            handle(formData)
    }
    return (
        <tr className='mb-4'>
            <th></th>
              <th>
                <div className="form-control">

                    <input
                        type="date"
                        name="createdAt"
                        className="input input-sm input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={formData?.leaveCreatedAt}
                        onChange={handleChange}
                        required
                    />
                </div>
            </th>
            <th>
                <input type="text"
                    name='username'
                    onChange={handleChange}
                    placeholder="Employee" className="input input-sm" />
            </th>
            <th>
                <div className="form-control ">

                    <select
                        name="leaveType"
                        className="select select-bordered w-full rounded-md focus:outline-none focus:ring-2 select-sm focus:ring-primary"
                        value={formData?.leaveType}
                        onChange={handleChange}
                        required
                    >
                        <option>-</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Unpaid Leave">Unpaid Leave</option>
                    </select>
                </div>
            </th>
            <th>
                <div className="form-control">

                    <input
                        type="date"
                        name="startDate"
                        className="input input-sm input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={formData?.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
            </th>
            <th>
                <div className="form-control">

                    <input
                        type="date"
                        name="endDate"
                        className="input input-sm input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={formData?.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
            </th>

            <th> </th>
            <th> </th>
            {/* <th> </th> */}
            {/* <th> </th> */}
          
            <th>
                <button
                disabled={filterLoading}
                onClick={handleFilter} className='btn btn-neutral btn-outline btn-sm '>
                   {filterLoading ? <Loading/> : 'Filter it.'}
                </button>
            </th>
        </tr>
    )
}

export default LeaveTableFilter
