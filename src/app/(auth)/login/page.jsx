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
import ErrDiv from '@/components/ErrDiv'
import { shadowAround } from '@/lib/helperFunctions'

const page = () => {
    const { login } = useUser()
    const dispatch = useDispatch()
    const [username, setUsername] = useState('anas')
    const [password, setPassword] = useState('123')
    const { request, data, loading, err } = useApiReq()

    const handleLogin = (e) => {
        e.preventDefault()
        if (!username || username.trim() === '') {
            toast.error('Enter valid username !!!')
            return
        }
        if (!password || password === '') {
            toast.error('Enter valid password !!!')
            return
        }

        // console.log('username', username)
        // console.log('password', password)
        request(`/api/login`, 'POST', { username, password })
    }
    useEffect(() => {
        if (data) {
            toast.success('Welcome to HRM.')
            console.log(data)
            login(data)
            dispatch(signIn({ ...data, redux: true }))
            redirect('/')
        }
    }, [data])
    useEffect(() => {
        if (err && err.error) {
            toast.error(err.error)
            console.log(err)
        }

    }, [err])

    // https://images.unsplash.com/photo-1713351531261-4dba3f6e8431?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
    return (
        <div className='flex flex-row  flex-wrap justify-center md:h-svh gap-5 items-center '

        // style={{
        //     backgroundImage:
        //         "url(https://i.pinimg.com/736x/10/1b/38/101b3830574f65db7171b088c6d9c4d9.jpg)",
        // }}
        >
            <div className='max-w-xl   p-5 rounded-4xl  '>
                <h1 className="text-5xl font-bold text-center m-2">HRM<span className='text-sm md:text-2xl'> ERP system.</span> </h1>
                <p className="hidden md:block py-6">
                    Manage everything and anything in one place. This is humane resource management system where you can manage your employees and their related actions.
                </p>

            </div>

            <div className={`max-w-xl  min-w-sm ${shadowAround}  rounded-4xl m-2`}>
                <h1 className='text-center text-4xl font-extrabold mt-10'>Login</h1>
                <div className=' mx-5 bg-yellow-200 p-2 rounded-2xl  my-1 animate-pulse'>
                    <h1 className='text-yellow-500 tracking-widest text-xs text-center animate-bounce '>demo</h1>
                    <div className='flex items-center justify-between'>
                        <div className='w-2/3'>
                              <h1 className=' text-xs tracking-widest badge badge-outline badge-neutral'> admin</h1>
                            <div>
                                <span className='opacity-55 text-xs'>Username</span> <span>anas</span>
                            </div>
                            <div>
                                <span className='opacity-55 text-xs'>Password</span> <span>123</span>
                            </div>
                        </div>
                        <div className='w-1/3'>
                            <h1 className=' text-xs tracking-widest badge badge-outline badge-neutral'> employee</h1>
                            <div>
                                <span className='opacity-55 text-xs'>Username</span> <span>baber</span>
                            </div>
                            <div>
                                <span className='opacity-55 text-xs'>Password</span> <span>123</span>
                            </div>
                        </div>
                    </div>
                </div>
                <form action=""
                    // className='p-5 md:w-6/12 lg:w-4/12 mx-auto '
                    className='p-5'
                >
                    <InputField prompt={'Username'} className={'w-full'} setValue={setUsername} />
                    <InputField prompt={'Password'} className={'w-full '} type={'password'} setValue={setPassword} />

                    {
                        err &&
                        <ErrDiv error={err?.error} />
                    }
                    <div className='flex justify-center '>
                        <button disabled={loading} onClick={handleLogin} className='btn btn-neutral btn-outline btn-sm mt-5'>
                            {loading ? <Loading /> : 'Login'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default page
