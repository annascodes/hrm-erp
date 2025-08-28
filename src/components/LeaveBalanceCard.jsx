// import React from 'react'
// import StatDiv from './StatDiv'
// import { shadowAround } from '@/lib/helperFunctions'
// import { FaHeartbeat, FaMoneyBillAlt, FaRegSmileBeam, FaUmbrellaBeach } from 'react-icons/fa'

// const LeaveBalanceCard = ({leaveBalance}) => {
//     return (
//         <div>
//             <div className={`rounded-2xl ${shadowAround} p-5`}>
//                 {/* <h1 className='text-center'>Second</h1> */}
//                 <div className='flex flex-row flex-wrap justify-center items-center gap-3 max-w-lg  '>
//                     <StatDiv name={'Sick Leaves'} figure={ leaveBalance.sick} icon={<> <FaHeartbeat className="text-2xl" />  </>} />
//                     <StatDiv name={'Annual Leaves'} figure={ leaveBalance.annual} icon={<> <FaUmbrellaBeach  className="text-2xl" />  </>} />
//                     <StatDiv name={'Casual Leaves'} figure={ leaveBalance.casual} icon={<> <FaRegSmileBeam className="text-2xl" />  </>} />
//                     <StatDiv name={'Unpaid Leaves'} figure={ leaveBalance.unpaid} icon={<> <FaMoneyBillAlt className="text-2xl" />  </>} />
//                 </div>

//             </div>

//         </div>
//     )
// }

// export default LeaveBalanceCard


import { FaUmbrellaBeach, FaNotesMedical, FaUserClock, FaBan } from "react-icons/fa";

export default function LeaveBalanceCard({ leaveBalance }) {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl bg-white shadow-[0_0_15px_rgba(0,0,0,0.15)]">

                    <h1 className="btn btn-primary btn-xs tracking-wider  cursor-default  text-sm">Leave balance card</h1>
      {/* Annual */}
      <div className="flex flex-row items-center gap-3">
        <FaUmbrellaBeach className="text-xl text-green-500" />
        <span className="font-medium">Annual Leave:</span>
        <span className="font-semibold">{leaveBalance?.annual ?? 0}</span>
      </div>

      {/* Sick */}
      <div className="flex flex-row items-center gap-3">
        <FaNotesMedical className="text-xl text-red-500" />
        <span className="font-medium">Sick Leave:</span>
        <span className="font-semibold">{leaveBalance?.sick ?? 0}</span>
      </div>

      {/* Casual */}
      <div className="flex flex-row items-center gap-3">
        <FaUserClock className="text-xl text-blue-500" />
        <span className="font-medium">Casual Leave:</span>
        <span className="font-semibold">{leaveBalance?.casual ?? 0}</span>
      </div>

      {/* Unpaid */}
      <div className="flex flex-row items-center gap-3">
        <FaBan className="text-xl text-gray-500" />
        <span className="font-medium">Unpaid Leave:</span>
        <span className="font-semibold">{leaveBalance?.unpaid ?? 0}</span>
      </div>
    </div>
  );
}

