import React from 'react'
import { GoDotFill } from "react-icons/go";
const SingleDayInCalender = ({ day }) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="border rounded-lg p-2 min-h-[80px] bg-base-100 shadow-sm hover:bg-base-200 transition-all w-full cursor-pointer flex justify-start" onClick={() => document.getElementById(`${day}-singleDayInCalender`).showModal()}>

                <div
                    // className="border rounded-lg p-2 min-h-[80px] bg-base-100 shadow-sm hover:bg-base-200 transition-all"
                    className=' flex flex-col items-start '
                >
                    <div className="text-xs font-bold text-center">{day.getDate()}</div>

                    <div className='hidden md:flex flex-row flex-wrap justify-start items-center gap-1'>
                        <div className='badge badge-accent badge-sm border-none bg-red-400 rounded-2xl'>T</div>
                        <div className='badge badge-accent badge-sm border-none bg-yellow-400 rounded-2xl'>P</div>
                        <div className='badge badge-accent badge-sm border-none bg-green-400 rounded-2xl'>M</div>
                        <div className='badge badge-accent badge-sm border-none bg-blue-400 rounded-2xl'>W</div>
                        <div className='badge badge-accent badge-sm border-none bg-stone-700 rounded-2xl'>...</div>
                    </div>




                    <div className='md:hidden flex flex-col flex-wrap justify-start  gap-1'>
                        <div className='w-6 h-1.5 bg-red-400 rounded-2xl'></div>
                        <div className='w-6 h-1.5 bg-yellow-400 rounded-2xl'></div>
                        <div className='w-6 h-1.5 bg-green-400 rounded-2xl'></div>
                        <div className='w-6 h-1.5 bg-blue-400 rounded-2xl'></div>
                        <div className='w-6 h-1.5 bg-stone-700 rounded-2xl'></div>

                    </div>


                    {/* {user && (
                        <div className="text-xs mt-1 text-primary-content bg-primary rounded px-1 py-[2px]">
                            {user.name}
                        </div>
                    )} */}
                </div>

            </button>
            <dialog id={`${day}-singleDayInCalender`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Upcoming feature!</h3>
                    <p className="py-4"> coming soon</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default SingleDayInCalender
