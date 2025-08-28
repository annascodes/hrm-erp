'use client'
import Loading from '@/components/Loading';
import useApiReq from '@/lib/hooks/useApiReq';
import Link from 'next/link';
import React, { use, useEffect } from 'react'
import { LuSquareDot } from "react-icons/lu";
import { LuSquareUserRound } from "react-icons/lu";
import { GrUserWorker } from "react-icons/gr";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { FaUmbrellaBeach, FaHeartbeat, FaRegSmileBeam, FaMoneyBillAlt } from "react-icons/fa";
import StatDiv from '@/components/StatDiv';
import { FiAtSign, FiMail } from 'react-icons/fi';
import moment from 'moment';
import RoleBadges from '@/components/RoleBadges';
import DynamicTableBtn from '@/components/DynamicTableBtn';
import EmployeeCard from '@/components/EmployeeCard';
import UserCard from '@/components/UserCard';
import { shadowAround } from '@/lib/helperFunctions';
import LeaveBalanceCard from '@/components/LeaveBalanceCard';

const page = ({ params }) => {
  const unWrapParams = use(params);
  const { userId } = unWrapParams;
  const { request, data, loading, err } = useApiReq()
  useEffect(() => {
    request(`/api/user/${userId}`)
  }, [])


  if (loading)
    return <Loading container={true} />

  return data && (
    <div className='w-full md:max-w-7xl m-5 mx-auto '>
      {/* {loading && <Loading />} */}

      {/* <div className='relative h-44 rounded-2xl'>
        <img src="https://cdn.dribbble.com/userupload/12008583/file/original-5d877be0dbb7e50ed67aaa7472e6d1cd.png?resize=1024x768&vertical=center" alt="" className='w-full h-full object-cover rounded-2xl opacity-75' />

        <div className=' absolute -bottom-20 left-10 border-8 border-stone-400  w-48 h-48 overflow-hidden rounded-full'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s" className='w-full h-full object-cover' alt="" />
        </div>
      </div> */}
      {
        (data.employee === null && data?.user?.role !== 'admin') && <div className='text-yellow-600 text-xs tracking-wide flex flex-row flex-wrap items-center gap-2 '>
          <button className='btn btn-active btn-warning mx-1 btn-xs text-white uppercase tracking-wide'>warning !!!</button>
          <p>
            Seems like this user is not under employee umberalla
          </p>
        </div>
      }

<div className='flex flex-row justify-center items-center'>
        <div className='border-0 border-stone-400  w-48 h-48 overflow-hidden rounded-full'>
        <img src={
          data?.user?.profileImg
          ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s"
        } className='w-full h-full object-cover' alt="" />
      </div>
</div>


      <div className='flex flex-row flex-wrap justify-center gap-5 items-center '>

        {
          data?.user && <UserCard data={data} />
        }

        {
          data?.leaveBalance && <LeaveBalanceCard leaveBalance={data.leaveBalance} />
        }


      </div>
      <div className='flex flex-row flex-wrap justify-center'>

        {
        data?.employee && <EmployeeCard employee={data?.employee} />
      }
      </div>





      {/* <pre className='text-xs'>
        {JSON.stringify(data, null, 10)}
      </pre> */}


    </div>
  )
}

export default page







/* 


*/
