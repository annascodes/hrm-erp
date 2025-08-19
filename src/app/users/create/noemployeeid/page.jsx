'use client'
import EmployeeForm from '@/components/EmployeeForm'
import InputField from '@/components/InputField'
import Loading from '@/components/Loading'
import SelectUser from '@/components/SelectUser'
import useApiReq from '@/lib/hooks/useApiReq'
import React, { useEffect, useState } from 'react'
import { MdArrowLeft, MdTurnLeft } from 'react-icons/md'
import { RiCheckboxCircleFill } from "react-icons/ri";

const page = () => {
    const [query, setQuery] = useState(null)
    const { request, data, loading, err } = useApiReq()
    const [user, setUser] = useState(null)
    const [showEmpForm, setShowEmpForm] = useState(false)



    const handleSearchUser = () => {
        // console.log(query)
        request(`/api/user?query=${query}`)
    }
    useEffect(() => {
        if (data)
            console.log(data)
    }, [data])
    return (
        <div className='p-5'>
            {!showEmpForm &&
                <>
                    <form action={handleSearchUser}>
                        <div className='  w-sm mx-auto '>
                            <InputField
                                prompt={'Add from existing users'}
                                className={'max-w-full'}
                                setValue={setQuery}
                            />
                            {loading && <div className='max-w-full flex justify-center'>
                                <Loading type='dots' />
                            </div>}

                        </div>
                    </form>

                     

                    {data && data.length > 0 ?
                        <SelectUser
                            users={data}
                            user={user} setUser={setUser} />
                            : data && <h1 className='text-center text-sm my-5'>no user found</h1>
                    }

                    {user && <div className='flex justify-center my-5'>
                        <button disabled={user.employeeId} onClick={() => setShowEmpForm(true)} className='btn btn-neutral btn-outline btn-sm'>

                            {user.employeeId 
                            ? <span className='flex flex-row items-center text-black'>Assigned <RiCheckboxCircleFill className='text-xl mx-2 text-green-400' /> </span> 
                            : 'NEXT'}
                        </button>
                    </div>}

                </>}


            {
                user && showEmpForm &&
                <div>
                    <button onClick={() => setShowEmpForm(!showEmpForm)} className='btn btn-neutral btn-outline border-none btn-sm'>
                        Back
                    </button>
                    <EmployeeForm user={user} />

                </div>
            }

        </div>
    )
}

export default page
