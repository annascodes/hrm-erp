import React from 'react'
import DynamicTable from './DynamicTable'
import { FiEye } from "react-icons/fi";


const UserSummary = ({title=null,user = null}) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button 
            className=" text-xs tracking-widest cursor-pointer hover:text-blue-400 " 
            onClick={() => document.getElementById(`${user._id}-UserSummary`).showModal()}>
                {title ? title:   <FiEye className='text-base' /> }
             
            </button>
            <dialog id={`${user._id}-UserSummary`} className="modal">
                <div className="modal-box">
                    {
                        user
                        ? <DynamicTable data={user} />
                        :<h3 className="font-bold text-lg">Nothing to show</h3>
                    }
                   
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default UserSummary
