'use client'
import EmployeeForm from '@/components/EmployeeForm'
import UserRegistrationForm from '@/components/UserRegForm'
import useApiReq from '@/lib/hooks/useApiReq'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const { request: RegUser, data, loading: RegUserLoading, err: RegUserErr } = useApiReq()
  const [RegUserRes, setRegUserRes] = useState(null)
  const [empCreated, setEmpCreated] = useState(false)



  const handleUserReg = (formData) => {
    console.log(formData)
    RegUser(`/api/register`, 'POST', formData)
  }
  useEffect(() => {
    if (data && data.success) {
      setRegUserRes(data)
      toast.success(data.msg)
    }
  }, [data])
  useEffect(() => {
    if (RegUserErr) {
      toast.error(RegUserErr.error)
    }
  }, [RegUserErr])
  useEffect(() => {
    if (empCreated)
        setRegUserRes(null)
  }, [empCreated])
  return (
    <div>

      {!RegUserRes &&
        <UserRegistrationForm handleUserReg={handleUserReg} loading={RegUserLoading} />
      }
      {RegUserRes &&
        <EmployeeForm user={RegUserRes.user} setCreated={setEmpCreated} />
      }

    </div>
  )
}

export default page
