'use client'
import InputField from '@/components/InputField'
import useApiReq from '@/lib/hooks/useApiReq'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confPassword, setConfPassword] = useState(null)
    const [err, setErr] = useState(null)

    const { request, data, loading, err: RegErr } = useApiReq()

    const handleLogin = (e) => {
        e.preventDefault()
        // console.log('email: ', email)
        // console.log('username: ', username)
        // console.log('password: ', password)
        // console.log('confPassword: ', confPassword)


        if (!email || email.trim() === '' || !(email.includes('@'))) {
            toast.error('Enter valid email')
            return
        }
        if (!username || username.trim() === '') {
            toast.error('Enter valid username')
            return
        }
        if (!password || password === '') {
            toast.error('Enter valid password')
            return
        }
        if (password !== confPassword){
             setErr('Passwords are not matching!')
             toast.error('Passwords are not matching!')
             return
        }


        request(`/api/register`, 'POST', {
            email: email.trim(),
            username: username.trim(),
            password,
            confPassword
        })
    }
    useEffect(() => {
        if (data && data.success) {
            toast.success('Registered successfully')
            redirect('/login')
        }
    }, [data])
    useEffect(() => {
        if (RegErr) {
            toast.error(RegErr.error)
            console.log(RegErr)
        }
    }, [RegErr])
    console.log(RegErr)
    return (
        <div>
            <h1 className='text-center text-4xl font-extrabold mt-10'>Register</h1>
            <form action=""
                className='p-5 md:w-6/12 lg:w-4/12 mx-auto '
            // className='p-5'
            >
                <InputField prompt={'Email'} defaultValue={email} type={'email'} setValue={setEmail} className={'w-full'} />
                <InputField prompt={'Username'} defaultValue={username} setValue={setUsername} className={'w-full'} />
                <InputField prompt={'Password'} defaultValue={password} type={'password'} setValue={setPassword} className={'w-full'} />
                <InputField prompt={'Confirm Password'} defaultValue={confPassword} type={'password'} optional={{ error: err }} setValue={setConfPassword} className={'w-full'} />
                <div className='flex justify-center '>
                    <button disabled={loading} onClick={handleLogin} className='btn btn-neutral btn-outline btn-sm mt-5'>
                        {loading ? <span className='loading loading-spinner loading-sm'></span> : "Register"}
                    </button>
                </div>
            </form>

        </div>
    )
}

export default page
