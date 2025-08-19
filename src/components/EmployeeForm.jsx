'use client'
import useApiReq from '@/lib/hooks/useApiReq';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from './Loading';

const EmployeeForm = ({ user = null , setCreated=null }) => {
    const { request, data, loading, err } = useApiReq()
    // State to hold form data
    const [formData, setFormData] = useState({
        firstName: user && user.username,
        lastName: 'Jr.',
        employeeCode: user && user.username,
        email: (user && user.email) || 'baber@test.com',
        phoneNumber: '090078601',
        address: 'A-123, A-Block, DHA phase 9, Lahore.',
        dateOfBirth: '1999-01-01', // Storing as string for date input
        hireDate: new Date().toISOString().split('T')[0],    // Storing as string for date input
        jobTitle: 'Sales-Manager',
        department: 'Sales',
        salary: '100000',      // Storing as string initially
        status: 'Active', // Default status
    });



    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user)
            request(`/api/employee/${user._id}`, 'POST', formData)
    };
    useEffect(() => {
        if (data && data.updateUser && data.newEmployee) {
            toast.success(`Employe Id has assigned to ${data.updateUser.username} which is ${data.updateUser.employeeId}`)
            console.log(data)
            if(setCreated)
                setCreated(true)
        }   
    }, [data])
    useEffect(() => {
        if (err) {
            toast.error('err')
            console.log('err in assinging employee id ')
            console.log(err)
        }
    }, [err])

    return (
        <div className="card w-full max-w-2xl bg-base-100  mx-auto my-5 shadow-xl rounded-lg p-8">
            {/* <pre className='text-xs'>{JSON.stringify(user, null, 10)}</pre> */}
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Add New Employee</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* First Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">First Name <span className="text-error">*</span></span>
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        className="input input-bordered w-full rounded-md"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Last Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Last Name <span className="text-error">*</span></span>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        className="input input-bordered w-full rounded-md"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Employee Code */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Employee Code</span>
                    </label>
                    <input
                        type="text"
                        name="employeeCode"
                        placeholder="EMP001"
                        className="input input-bordered w-full rounded-md"
                        value={formData.employeeCode}
                        onChange={handleChange}
                    />
                </div>

                {/* Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email <span className="text-error">*</span></span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="john.doe@example.com"
                        className="input input-bordered w-full rounded-md"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="+1234567890"
                        className="input input-bordered w-full rounded-md"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                {/* Address */}
                <div className="form-control md:col-span-2">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input
                        type="text"
                        name="address"
                        placeholder="123 Main St, Anytown, USA"
                        className="input input-bordered w-full rounded-md"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                {/* Date of Birth */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date of Birth</span>
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        className="input input-bordered w-full rounded-md"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>

                {/* Hire Date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Hire Date <span className="text-error">*</span></span>
                    </label>
                    <input
                        type="date"
                        name="hireDate"
                        className="input input-bordered w-full rounded-md"
                        value={formData.hireDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Job Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Title</span>
                    </label>
                    <input
                        type="text"
                        name="jobTitle"
                        placeholder="Software Engineer"
                        className="input input-bordered w-full rounded-md"
                        value={formData.jobTitle}
                        onChange={handleChange}
                    />
                </div>

                {/* Department */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Department</span>
                    </label>
                    <input
                        type="text"
                        name="department"
                        placeholder="Engineering"
                        className="input input-bordered w-full rounded-md"
                        value={formData.department}
                        onChange={handleChange}
                    />
                </div>

                {/* Salary */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Salary</span>
                    </label>
                    <input
                        type="number"
                        name="salary"
                        placeholder="60000"
                        className="input input-bordered w-full rounded-md"
                        value={formData.salary}
                        onChange={handleChange}
                    />
                </div>

                {/* Status */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Status</span>
                    </label>
                    <select
                        name="status"
                        className="select select-bordered w-full rounded-md"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Terminated">Terminated</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6 md:col-span-2">
                    <button type="submit" className="btn btn-primary w-full rounded-md">
                        {loading ? <Loading /> : ' Add Employee'}

                    </button>
                </div>
            </form>


        </div>
    );
};

export default EmployeeForm;
