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
    <div className='max-w-7xl m-5 mx-auto '>
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

      <div className='border-0 border-stone-400  w-48 h-48 overflow-hidden rounded-full'>
        <img src={
          data?.user?.profileImg
          ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s"
        } className='w-full h-full object-cover' alt="" />
      </div>

      <div className='flex flex-row flex-wrap justify-center mt-5 '>

        {/* first */}
        <div className='w-1/2 flex flex-col gap-3 p-5 '>

          <div className='flex flex-row items-center gap-3'>
            <div className='flex flex-row items-center gap-1 font-extrabold '>
              <FiAtSign className='text-xl' />
              {/* <h1>usernam</h1> */}
            </div>
            <h1>{data?.user.username}</h1>
          </div>


          {data?.employee?.firstName &&
            <div className='flex flex-row items-center gap-3'>
              <div className='flex flex-row items-center gap-1 font-extrabold '>
                <LuSquareUserRound className='text-xl' />
                {/* <h1>fullnam</h1> */}
              </div>
              <h1>{data?.employee?.firstName} {data?.employee?.lastName}</h1>
            </div>
          }


          <div className='flex flex-row items-center gap-3'>
            <div className='flex flex-row items-center gap-1 font-extrabold '>
              <FiMail className='text-xl' />
              {/* <h1>emai</h1> */}
            </div>
            <h1>{data?.user?.email}</h1>
          </div>



          <div className='flex flex-row items-center gap-3'>
            <div className='flex flex-row items-center gap-1 font-extrabold '>
              <GrUserWorker className='text-xl' />

            </div>
            <div className='flex flex-row flex-wrap items-center gap-2'> humane being <span className='mx-2'>|</span> <RoleBadges role={data?.user?.role} /> </div>
            {/* <span className='tracking-widest text-xs text-gray-400'> Sales Department </span> */}

            <DynamicTableBtn id={data?.user?._id}
              name={
                <>
                  <LuSquareArrowOutUpRight className='text-xl cursor-pointer text-blue-400 hover:text-blue-500' />
                </>
              }
              data={data?.employee}
              className={''}
              heading={'Employee'}
            />
          </div>


          <div className='flex flex-row items-center gap-3'>
            <div className='flex flex-row items-center gap-1 font-extrabold '>
              <LuCalendarDays className='text-xl' />
              {/* <h1>emai</h1> */}
            </div>
            <h1>{data?.user?.createdAt && moment(data.user.createdAt).format('ddd Do MMMM YYYY')}</h1>
            <span className='tracking-widest text-xs text-gray-400'> (joining) </span>
          </div>



        </div>
        {/* second */}
        {
          data?.leaveBalance &&
          <div className='w-1/2'>
            {/* <h1 className='text-center'>Second</h1> */}
            <div className='flex flex-row flex-wrap justify-center items-center gap-3 max-w-lg  '>
              <StatDiv name={'Sick Leaves'} figure={data?.leaveBalance.sick} icon={<> <FaHeartbeat className="text-2xl" />  </>} />
              <StatDiv name={'Annual Leaves'} figure={data?.leaveBalance.annual} icon={<> <FaUmbrellaBeach className="text-2xl" />  </>} />
              <StatDiv name={'Casual Leaves'} figure={data?.leaveBalance.casual} icon={<> <FaRegSmileBeam className="text-2xl" />  </>} />
              <StatDiv name={'Unpaid Leaves'} figure={data?.leaveBalance.unpaid} icon={<> <FaMoneyBillAlt className="text-2xl" />  </>} />
            </div>

          </div>
        }

      </div>

      {/* <pre className='text-xs'>
        {JSON.stringify(data, null, 10)}
      </pre> */}
    </div>
  )
}

export default page








