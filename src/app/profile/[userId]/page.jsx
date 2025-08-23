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

const page = ({ params }) => {
  const unWrapParams = use(params);
  const { userId } = unWrapParams;
  const { request, data, loading, err } = useApiReq()
  useEffect(() => {
    request(`/api/user/${userId}`)
  }, [])
  

  return (
    <div className='max-w-7xl m-5 mx-auto '>
      {loading && <Loading />}
     
      <div className='relative h-44 rounded-2xl'>
        <img src="https://cdn.dribbble.com/userupload/12008583/file/original-5d877be0dbb7e50ed67aaa7472e6d1cd.png?resize=1024x768&vertical=center" alt="" className='w-full h-full object-cover rounded-2xl opacity-75' />

        <div className=' absolute -bottom-20 left-10 border-8 border-stone-400  w-48 h-48 overflow-hidden rounded-full'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s" className='w-full h-full object-cover' alt="" />
        </div>
      </div>


      <div className='flex flex-row flex-wrap justify-center mt-20 '>

        {/* first */}
        <div className='w-1/2 flex flex-col gap-3 p-5 '>

          <div className='flex flex-row items-center gap-3'>
            <div className='flex flex-row items-center gap-1 font-extrabold '>
              <FiAtSign className='text-xl' />
              {/* <h1>usernam</h1> */}
            </div>
            <h1>anas</h1>
          </div>


          <div className='flex flex-row items-center gap-3'>
            <div className='flex flex-row items-center gap-1 font-extrabold '>
              <LuSquareUserRound className='text-xl' />
              {/* <h1>fullnam</h1> */}
            </div>
            <h1>Anas Shuaib</h1>
          </div>


          <div className='flex flex-row items-center gap-3'>
            <div className='flex flex-row items-center gap-1 font-extrabold '>
              <FiMail className='text-xl' />
              {/* <h1>emai</h1> */}
            </div>
            <h1>anas@test.com</h1>
          </div>



          <div className='flex flex-row items-center gap-3'>
            <div className='flex flex-row items-center gap-1 font-extrabold '>
              <GrUserWorker className='text-xl' />
              {/* <h1>emai</h1> */}
            </div>
            <h1>Sales Manager <span className='mx-2'>|</span> Sales Depart. </h1>
            {/* <span className='tracking-widest text-xs text-gray-400'> Sales Department </span> */}
            <LuSquareArrowOutUpRight className='text-xl cursor-pointer text-blue-400' />
          </div>


          <div className='flex flex-row items-center gap-3'>
            <div className='flex flex-row items-center gap-1 font-extrabold '>
              <LuCalendarDays className='text-xl' />
              {/* <h1>emai</h1> */}
            </div>
            <h1>{moment(new Date).format('ddd Do MMMM YYYY')}</h1>
            <span className='tracking-widest text-xs text-gray-400'> (joining) </span>
          </div>



        </div>
        {/* second */}
        <div className='w-1/2'>
          {/* <h1 className='text-center'>Second</h1> */}
          <div className='flex flex-row flex-wrap justify-center items-center gap-3 max-w-lg  '>
            <StatDiv name={'Sick Leaves'} figure={4} icon={<> <FaHeartbeat className="text-2xl" />  </>} />
            <StatDiv name={'Annual Leaves'} figure={2} icon={<> <FaUmbrellaBeach className="text-2xl" />  </>} />
            <StatDiv name={'Casual Leaves'} figure={2} icon={<> <FaRegSmileBeam className="text-2xl" />  </>} />
            <StatDiv name={'Unpaid Leaves'} figure={2} icon={<> <FaMoneyBillAlt className="text-2xl" />  </>} />
          </div>
        </div>

      </div>

       <pre className='text-xs'>
        {JSON.stringify(data, null, 10)}
      </pre>
    </div>
  )
}

export default page


const leaveIcons = {
  Annual: <FaUmbrellaBeach className=" text-2xl" />, // vacation
  Sick: <FaHeartbeat className="text-2xl" />, // medical
  Casual: <FaRegSmileBeam className=" text-2xl" />, // casual/fun
  Unpaid: <FaMoneyBillAlt className=" text-2xl" />, // money
};


const LeaveBalanceHolidays = ({ name, total, css }) => {
  return (
    <div className={`flex flex-row gap-2 items-center justify-center p-2 rounded-xl md:min-w-xs min-w-3  ${css} `}>
      <div>{leaveIcons[name] || <LuSquareDot className="text-blue-500 text-2xl" />}</div>
      <h1 className='text-lg font-bold'>{name}</h1>
      <h1 className='text-4xl'>{total} <span className='text-base'>/ 12</span> </h1>
    </div>
  )
}


function LeaveBalanceHolidaysTwo({ name, total }) {
  return (
    <div className="flex items-center gap-3 border p-3 rounded-md shadow-sm">
      <div>{leaveIcons[name] || <FaRegSmileBeam className="text-blue-500 text-2xl" />}</div>
      <div className="flex flex-col">
        <span className="font-semibold">{name} Leave</span>
        <span className="text-sm">{total} days</span>
      </div>
    </div>
  );
}
