import React from 'react'
import { HiCheckBadge } from "react-icons/hi2";
import { BiSolidUserBadge } from "react-icons/bi";
import { MdBadge } from "react-icons/md";




const RoleBadges = ({ role = 'employee', text = null }) => {
  if(!role) return ;
  return (
    <div>

      {role === 'employee' &&
        <div className='flex flex-row justify-start items-center gap-1'> <BiSolidUserBadge className='text-xl text-blue-400' />
          Employee
        </div>
      }
      {role === 'admin' && <div className='flex flex-row justify-start items-center gap-1'> <HiCheckBadge className='text-xl text-green-400' /> Admin  </div>}

      {role === 'hr' && <div className='flex flex-row justify-start items-center gap-1'> <MdBadge className='text-xl text-yellow-400' /> Hr  </div>}

    </div>
  )
}

export default RoleBadges
