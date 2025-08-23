'use client'
import EmployeeForm from '@/components/EmployeeForm';
import EmployeeForm2 from '@/components/EmployeeForm2';
import ErrDiv from '@/components/ErrDiv';
import UserRegistrationForm from '@/components/UserRegForm'
import useApiReq from '@/lib/hooks/useApiReq';
import React, { use, useEffect } from 'react'
import toast from 'react-hot-toast';

const page = ({ params }) => {
    const unWrapParams = use(params);
    const { userId } = unWrapParams;
    const { request, data, loading, err } = useApiReq()
    const { request: UpdUser, data: UpdUserRes, loading: UpdUserLoading, err: UpdUserErr } = useApiReq()
    useEffect(() => {
        request(`/api/user/${userId}`)
    }, [])


    const handleUpdateUser = (data) => {
        console.log('updating user :', data)
        UpdUser(`/api/user/${userId}`, 'POST', data)

    }
    useEffect(() => {
        if (UpdUserRes) {
            toast.success('User is updated successfully.')
        }
        if (UpdUserErr) {
            toast.error('Failed updation process.')
        }

    }, [UpdUserRes, UpdUserErr])
    return (
        <div>

            {
                data &&
                <div className='my-10'>
                    <UserRegistrationForm
                        handleUserReg={handleUpdateUser}
                        formName='Update User'
                        btnName='Update it.'
                        preFill={data.user}
                        loading={UpdUserLoading}
                    />
                </div>
            }

            {UpdUserErr &&
                <ErrDiv error={UpdUserErr.error} />
            }
            {err &&
                <ErrDiv error={err.error} />
            }



            <pre className='text-xs'>
                {JSON.stringify(UpdUserRes, null, 10)}
            </pre>
        </div>
    )
}

export default page
