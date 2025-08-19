'use client'
import InputField from '@/components/InputField'
import Loading from '@/components/Loading'
import { useUser } from '@/lib/context/userContext'
import useApiReq from '@/lib/hooks/useApiReq'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { signIn } from '@/lib/redux/user/userSlice'
import { useDispatch } from 'react-redux'

const page = () => {
    const {login} = useUser()
    const dispatch = useDispatch()
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const { request, data, loading, err } = useApiReq()

    const handleLogin = (e) => {
        e.preventDefault()
        request(`/api/login`, 'POST', { username, password })
    }
    useEffect(() => {
        if (data){
            toast.success('Welcome to HRM.')
            console.log(data)
            login(data)
            dispatch(signIn({...data, redux: true}))
            redirect('/')
        }
    }, [data])
    useEffect(()=>{
        if(err && err.error){
            toast.error(err.error)
            console.log(err)
        }

    }, [err])
    return (
        <div>
            <h1 className='text-center text-4xl font-extrabold mt-10'>Login</h1>
            <form action=""
                className='p-5 md:w-6/12 lg:w-4/12 mx-auto '
            // className='p-5'
            >
                <InputField prompt={'Username'} className={'w-full'} setValue={setUsername} />
                <InputField prompt={'Password'} className={'w-full'} type={'password'} setValue={setPassword} />
                <div className='flex justify-center '>
                    <button disabled={loading} onClick={handleLogin} className='btn btn-neutral btn-outline btn-sm mt-5'>
                        {loading ? <Loading/> : 'Login' }
                    </button>
                </div>
            </form>

        </div>
    )
}

export default page
