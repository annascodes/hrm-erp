'use client'
import useApiReq from '@/lib/hooks/useApiReq';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ErrDiv from './ErrDiv';
import { getLeaveDays } from '@/lib/apiHelpers/dateFilters';



// LeaveRequestForm Component
const LeaveRequestForm = ({ userId }) => {
  const { request, data, loading, err } = useApiReq()
  // State to hold form input values
  const [formData, setFormData] = useState({
    leaveType: 'Sick Leave', // Default value from enum
    startDate: '',
    endDate: '',
    reason: '',
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
    e.preventDefault(); // Prevent default browser form submission
    console.log(formData)
    let inDays = getLeaveDays(formData.startDate, formData.endDate)
    if (inDays > 1)
      request(`/api/employee/${userId}/leave`, 'POST', formData)
    else
      toast.error(`Pick dates carefully? You cannot get leave for ${inDays} days. `)
  };

  useEffect(() => {
    if (data && data.success) {
      console.log('data: ', data)
      toast.success(data.msg)
      setFormData({
        leaveType: 'Sick Leave', // Default value from enum
        startDate: '',
        endDate: '',
        reason: '',
      })
    }
    if (err) {
      console.log('err: ', err)
      toast.error(err.error)
    }

  }, [data, err])
  return (
    <form className=" max-w-2xl mx-auto card bg-base-100 shadow-xl p-6 md:p-8 rounded-lg">
      <h1 className='text-center text-2xl font-bold mb-10'>Leave application</h1>
      {/* Employee ID Display (Read-only, for context) */}
      {/* <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-info-content">Your Employee ID</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full rounded-md bg-base-200 cursor-not-allowed"
          value={employeeId || 'Not available'}
          readOnly
          disabled
        />
        <label className="label">
          <span className="label-text-alt text-neutral-content">This is automatically linked to your account.</span>
        </label>
      </div> */}

      {/* Leave Type Select */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-info-content">Leave Type</span>
        </label>
        <select
          name="leaveType"
          className="select select-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.leaveType}
          onChange={handleChange}
          required
        >
          <option value="Sick Leave">Sick Leave</option>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Unpaid Leave">Unpaid Leave</option>
        </select>
      </div>

      {/* Start Date Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-info-content">Start Date</span>
        </label>
        <input
          type="date"
          name="startDate"
          className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>

      {/* End Date Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-info-content">End Date</span>
        </label>
        <input
          type="date"
          name="endDate"
          className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>

      {/* Reason Textarea */}
      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text text-info-content">Reason for Leave</span>
        </label>
        <textarea
          name="reason"
          placeholder="Briefly explain why you are requesting leave..."
          className="textarea textarea-bordered h-24 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* Submission Button */}
      <div className="form-control mt-6">
        <button
          onClick={handleSubmit}
          type="submit" className="btn btn-primary w-full rounded-md" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            'Submit Leave Request'
          )}
        </button>
      </div>

      {
        err && <ErrDiv error={err.error} />
      }


    </form>
  );
};


export default LeaveRequestForm;