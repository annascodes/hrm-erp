import React from 'react'

const SingleDayInCalender = ({ day }) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="border rounded-lg p-2 min-h-[80px] bg-base-100 shadow-sm hover:bg-base-200 transition-all w-full cursor-pointer flex justify-start" onClick={() => document.getElementById(`${day}-singleDayInCalender`).showModal()}>

                <div
                    // className="border rounded-lg p-2 min-h-[80px] bg-base-100 shadow-sm hover:bg-base-200 transition-all"
                    className=' flex flex-col items-start '
                >
                    <div className="text-xs font-bold">{day.getDate()}</div>

                    <div className='flex flex-row flex-wrap justify-start gap-1'>
                        <span className='text-xs bg-blue-50 rounded-2xl p-1 font-semibold '>7 tasks</span>
                        <span className='text-xs bg-blue-50 rounded-2xl p-1 font-semibold '>2 Meetings</span>
                        <span className='text-xs bg-blue-50 rounded-2xl p-1 font-semibold '>1 Zoom</span>
                        <span className='text-xs bg-blue-50 rounded-2xl p-1 font-semibold '>... more</span>
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
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default SingleDayInCalender
