'use client'
import LinkBtn from '@/components/LinkBtn'
import LinkCarousel from '@/components/LinkCarousel'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FiUmbrella, FiCalendar, FiFolder, FiBarChart2, FiFileText } from "react-icons/fi";
import { LuCalendarX } from "react-icons/lu";

const layout = ({ children }) => {

    const pathName = usePathname()
    return (
        <div>
              <h1 className='text-center text-base lg:text-3xl font-semibold lg:my-10 my-2'>Employee <span className='text-xs lg:text-sm'>Dashboard</span> </h1>
            <div className='flex flex-col  lg:flex-row '>

                <div className='w-full  lg:w-2/12 overflow-auto  flex flex-row lg:flex-col p-5 rounded-4xl lg:items-start  gap-3 '>

                    <LinkBtn href={'/employee/leaveapplication'}
                        activeOn={`/employee/leaveapplication`}
                        className={''}
                        btnSize={'lg:btn btn-xs hover:text-white'}
                        name={<> <LuCalendarX className='text-base' /> Leaves  </>}
                    />

                    <LinkBtn
                        href={'/employee/calender'}
                        className={'  '}
                        btnSize={'lg:btn btn-xs hover:text-white'}
                        name={<> <FiCalendar className='text-base' /> Calender  </>}
                    />
                    <LinkBtn
                        href={'/employee/projects'}
                        className={' '}
                          btnSize={'lg:btn btn-xs hover:text-white'}
                        name={<> <FiFolder className='text-base' /> Projects  </>}
                    />
                    <LinkBtn
                        href={'/employee/reports'}
                        className={' '} 
                          btnSize={'lg:btn btn-xs hover:text-white'}
                       name={<> <FiBarChart2 className='text-base' /> Reporsts  </>}
                    />
                    <LinkBtn
                        href={'/employee/notes'}
                        className={' '}
                          btnSize={'lg:btn btn-xs hover:text-white'}
                        name={<> <FiFileText className='text-base' /> Notes  </>}
                    />
                </div>




                <div className='w-full lg:w-10/12 '>
                    {children}
                </div>





            </div>

        </div>
    )
}

export default layout
