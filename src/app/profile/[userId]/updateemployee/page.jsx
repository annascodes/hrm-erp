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
    const {request:UpdEmp, data:UpdEmpRes, loading:UpdEmpLoading, err:UpdEmpErr} = useApiReq()
    useEffect(() => {
        request(`/api/user/${userId}`)
    }, [])


    const handleUpdate = (data) => {
        // console.log('updating user ', data)
        if(data.userId)
            UpdEmp(`/api/employee/${data.userId}`, 'PUT', data)
       
    }
    useEffect(()=>{
        if(UpdEmpRes){
            toast.success('Employee updated successfully.')
        }
        

    },[UpdEmpRes, UpdEmpErr])
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
    <ErrDiv error={UpdEmpErr.error}  />
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
