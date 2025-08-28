'use client'
import Loading from '@/components/Loading'
import UsersTable from '@/components/UsersTable'
import useApiReq from '@/lib/hooks/useApiReq'
import React, { useEffect, useState } from 'react'

const page = () => {
  const { request, data, loading, err } = useApiReq()
  const [allUsers, setAllUsers] = useState(null)

  const fetchUrl = (username, email, createdAt, role, startindex, limit) => {
    request(`/api/user/forAdmin?username=${username}&email=${email}&createdAt=${createdAt}&role=${role}&startindex=${startindex}&limit=${limit}`)
  }
  useEffect(() => {
    fetchUrl()
  }, [])
  useEffect(() => {
    if (data)
      setAllUsers(data)
  }, [data])
  const handleFilter = (data) => {
    console.log('handle filter data: ', data)
  }
  return (
    <div>
      {
        loading
          ? <div className='flex justify-center items-center h-56'> <Loading /> </div>
          : <UsersTable users={allUsers} handleFilter={handleFilter} />

      }

    </div>
  )
}

export default page
