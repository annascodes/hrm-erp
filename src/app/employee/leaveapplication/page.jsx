'use client'
import LeaveRequestForm from '@/components/LeaveForm'
import { useUser } from '@/lib/context/userContext'
import React from 'react'

const page = () => {
    const {user} = useUser()
  return (
    <div>
        {
            user && <LeaveRequestForm userId={user._id} />
        }
      
    </div>
  )
}

export default page
