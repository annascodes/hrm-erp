'use client'
import EmployeeForm from '@/components/EmployeeForm';
import EmployeeForm2 from '@/components/EmployeeForm2';
import ErrDiv from '@/components/ErrDiv';
import Loading from '@/components/Loading';
import UserRegistrationForm from '@/components/UserRegForm'
import useApiReq from '@/lib/hooks/useApiReq';
import React, { use, useEffect } from 'react'
import toast from 'react-hot-toast';

const page = ({ params }) => {
    const unWrapParams = use(params);
    const { userId } = unWrapParams;
    const { request, data, loading, err } = useApiReq()
    const { request: UpdEmp, data: UpdEmpRes, loading: UpdEmpLoading, err: UpdEmpErr } = useApiReq()
    useEffect(() => {
        request(`/api/user/${userId}`)
    }, [])


    const handleUpdate = (arg) => {
        console.log('sending this to api as arg:', arg)
        if (arg.userId)
            UpdEmp(`/api/employee/${arg.userId._id}`, 'PUT', arg)

    }
    useEffect(() => {
        if (UpdEmpRes) {
            toast.success('Employee updated successfully.')
        }


    }, [UpdEmpRes, UpdEmpErr])
    if (loading) {
        return <Loading container={true} />
    }
    return (
        <div>


            {
                data &&
                <div className='my-10'>
                    <EmployeeForm2
                        user={data.employee}
                        formName='Update Employee'
                        btnName='Update it.'
                        submit={handleUpdate}
                        loading={UpdEmpLoading} />
                </div>
            }


            {
                UpdEmpErr &&
                <ErrDiv error={UpdEmpErr.error} />
            }
            {/* <pre className='text-xs my-20'>
                {data && JSON.stringify(data, null, 10)}
            </pre> */}
            {/* <pre className='text-xs'>
                {UpdEmpRes && JSON.stringify(UpdEmpRes, null, 10)}
            </pre> */}
        </div>
    )
}

export default page
