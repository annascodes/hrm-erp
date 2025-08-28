'use client'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Hero = () => {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div  >
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content    shadow-2xl flex-col lg:flex-row-reverse">
          <img
            src="https://i.pinimg.com/1200x/6c/9b/27/6c9b27f2f01c3f40d5518516116ac86a.jpg"
            className="max-w-xs rounded-lg shadow-2xl"
          />
          <div className=" max-w-2xl">
            <h1 className="text-5xl font-bold">HRM-ERP system.</h1>
            <p className="py-6">
              Manage everything and anything in one place. This is humane resource management system where you can manage your employees and their related actions.

            </p>
            {
              !currentUser && <>
                <Link href={'/register'} className="btn btn-primary ml-2 ">Get Registered</Link>
                <Link href={'/login'} className="btn btn-primary btn-outline  ml-2">Let's login.</Link>
              </>
            }

          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero
