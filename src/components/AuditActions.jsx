import React from 'react'
import { IoLogIn } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { RiRegisteredFill } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import { TiUserAddOutline } from "react-icons/ti";
import { TbFileExcel } from "react-icons/tb";
import { TbFilePlus } from "react-icons/tb";
import { TbFileCheck } from "react-icons/tb";
import { LuUserPen } from "react-icons/lu";
import { LuUserPlus } from "react-icons/lu";








/* const ACTIONS = {
'Logged In'
'Logged Out' 
'Registered'
'Leave posted',
'Employee created'
'Leave Approved'
'Leave Rejected'
'Update User'
'Update Employee'

}
 */
const AuditActions = ({action=null , className=null}) => {
  return (
    <div>

        {

            action === 'Logged In' &&  <IoLogIn className={`${className} text-gray-900`} />

        }
        {

            action === 'Logged Out'  && <IoLogOut className={`${className} text-red-400`} />

        }
        {

            action === 'Registered'  && <RiRegisteredFill className={`${className} text-gray-900`} />

        }
        {

            action === 'Employee created'  && <LuUserPlus className={`${className} text-gray-900`} />

        }
        {

            action === 'Leave Rejected'  && <TbFileExcel className={`${className} text-red-400`} />

        }
        {

            action ===  'Leave posted'  && <TbFilePlus className={`${className} text-gray-900`} />

        }
        {

            action ===  'Leave Approved '  && <TbFileCheck className={`${className} text-gray-900`} />

        }
        {

            action ===  'Update User'  && <LuUserPen className={`${className} text-gray-900`} />

        }
        {

            action ===  'Update Employee'  && <LuUserPen className={`${className} text-gray-900`} />

        }
      
    </div>
  )
}

export default AuditActions
