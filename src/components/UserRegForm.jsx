'use client'
import moment from 'moment';
import React, { useState } from 'react';


// UserRegistrationForm Component
const UserRegistrationForm = ( {handleUserReg=null, loading = false,btnName='Register User', formName='User Registration', preFill=null} ) => {
  // State to hold form input values
  const [formData, setFormData] = useState({
    email: preFill?.email,
    username: preFill?.username,
    password: '',
    // profileImg: 'https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg', // Default from schema
    // role: 'employee', // Default from schema
    // employeeId: '', // Optional field
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
    handleUserReg(formData)

    
  };

  return (
    <form  className="card bg-base-100 max-w-2xl mx-auto shadow-2xl  p-6 md:p-8 rounded-lg">
        <h1 className='text-2xl font-bold text-center mb-10'>{formName}</h1>
      {/* Email Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-info-content">Email</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="your@example.com"
          className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.email}
          onChange={handleChange}
        
        />
      </div>

      {/* Username Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-info-content">Username</span>
        </label>
        <input
          type="text"
          name="username"
          placeholder="Choose a username"
          className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.username}
          onChange={handleChange}
        
        />
      </div>

      {/* Password Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-info-content">Password</span>
        </label>
        <input
          type="text"
          name="password"
          placeholder="Strong password"
          className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.password}
          onChange={handleChange}
     
        />
      </div>

      {/* Profile Image URL Input */}
      {/* <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-info-content">Profile Image URL (Optional)</span>
        </label>
        <input
          type="url"
          name="profileImg"
          placeholder="https://example.com/your-image.jpg"
          className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.profileImg}
          onChange={handleChange}
        />
      </div> */}

      {/* Role Select */}
      {/* <div className="form-control mb-4">
        <label className="label">
          <span className="label-text text-info-content">Role</span>
        </label>
        <select
          name="role"
          className="select select-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
          <option value="admin">Admin</option>
        </select>
      </div> */}

      {/* Employee ID Input (Optional) */}
      {/* <div className="form-control mb-6">
        <label className="label">
          <span className="label-text text-info-content">Employee ID (Optional)</span>
          <span className="label-text-alt text-warning-content">MongoDB ObjectId</span>
        </label>
        <input
          type="text"
          name="employeeId"
          placeholder="e.g., 60c72b2f9f1d4a001c8e2b2a"
          className="input input-bordered w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.employeeId}
          onChange={handleChange}
        />
        <label className="label">
          <span className="label-text-alt text-neutral-content">Leave empty if not applicable.</span>
        </label>
      </div> */}

      {/* Submission Button */}
      <div className="form-control mt-6">
        <button 
        onClick={handleSubmit}
        type="submit" className="btn btn-primary rounded-md w-full" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            btnName
          )}
        </button>
      </div>


 

      {
        preFill &&
        <div className='my-5 text-xs'>
          Last updated <span className='btn btn-active cursor-default  btn-primary tracking-wider btn-xs mx-2 '>{moment(preFill?.updatedAt).fromNow()} </span>
        </div>
      }
      
    </form>
  );
};

export default UserRegistrationForm;
