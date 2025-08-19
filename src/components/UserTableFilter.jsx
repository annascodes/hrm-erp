import React, { useState } from 'react'
import RoleBadges from './RoleBadges'
import { LiaFilterSolid } from "react-icons/lia";


const UserTableFilter = () => {
    const [formData, setFormData] = useState()
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleFilter = () => {
        if (handle)
            handle(formData)
    }
    return (
        <tr className='mb-4'>
            <th></th>
             
            <th>
                <input type="text"
                    name='username'
                    onChange={handleChange}
                    placeholder="username" className="input input-sm" />
            </th>
            <th>
                <input type="text"
                    name='email'
                    onChange={handleChange}
                    placeholder="email" className="input input-sm" />
            </th>
            <th>
                <div className="form-control">

                    <input
                        type="date"
                        name="createdAt"
                        className="input input-sm input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={formData?.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
            </th>
            <th className='flex justify-between items-center'>
                <div className="form-control ">

                    <select
                        name="leaveType"
                        className="select select-bordered w-full rounded-md focus:outline-none focus:ring-2 select-sm focus:ring-primary"
                        value={formData?.leaveType}
                        onChange={handleChange}
                        required
                    >
                        <option>-</option>
                        <option value="admin"> <RoleBadges role='admin' /> </option>
                        <option value="hr"> <RoleBadges role='hr' /></option>
                        <option value="employee"> <RoleBadges role='employee' /></option>
                    </select>
                </div>
                 <button onClick={handleFilter} className='btn btn-neutral btn-outline btn-sm flex justify-center items-center gap-1 border-none tracking-widest'>
                  <LiaFilterSolid  className='text-2xl ' />
                  filter
                </button>
            </th>

            

            
            {/* <th> </th> */}
            {/* <th> </th> */}

           
        </tr>
    )
}

export default UserTableFilter
