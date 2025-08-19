'use client'
import Loading from '@/components/Loading'
import UsersTable from '@/components/UsersTable'
import useApiReq from '@/lib/hooks/useApiReq'
import React, { useEffect, useState } from 'react'

const page = () => {
  const { request, data, loading, err } = useApiReq()
  const [allUsers, setAllUsers] = useState(null)
  useEffect(() => {
    request('/api/user')
  }, [])
  useEffect(() => {
    if (data)
      setAllUsers(data)
  }, [data])
  return (
    <div>
      {
        loading
          ? <div className='flex justify-center items-center h-56'> <Loading /> </div>
          : <UsersTable users={allUsers} />

      }

    </div>
  )
}

export default page
