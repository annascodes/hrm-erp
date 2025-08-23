import React from 'react'
import DynamicTable from '../DynamicTable'
import { getChanges } from '@/lib/helperFunctions'
import DynamicTableBtn from '../DynamicTableBtn'
import moment from 'moment'


const UpdateUserMeta = ({ action, meta }) => {

    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-neutral btn-outline btn-xs border-none tracking-widest text-blue-300" onClick={() => document.getElementById(`${action}-UpdateUserMetaModal`).showModal()}>
                details
            </button>
            <dialog id={`${action}-UpdateUserMetaModal`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg"> {action}  </h3>
                    <div className="py-4 flex flex-col gap-5 justify-around">

                        <DynamicTable data={getChanges(meta.before, meta.after)} />

                        <p>  User created on 
                            <span className='bg-yellow-200 rounded-md p-0.5'> {moment(meta.before.createdAt).format("dddd, Do MMMM YYYY [at] h:mm a")} </span>
                           .
                        </p>
                        <p className='leading-8'>Last time it was updated on
                            <span className='bg-yellow-200 rounded-md p-0.5 m-0.5'> {moment(meta.before.updatedAt).format("dddd, Do MMMM YYYY [at] h:mm a")} </span>
                            and this time
                            <span className='bg-yellow-200 rounded-md p-0.5 m-0.5'> {moment(meta.after.updatedAt).format("dddd, Do MMMM YYYY [at] h:mm a")} </span> .
                        </p>

                        <div className='flex flex-row flex-wrap gap-3 items-center justify-center'>
                            <DynamicTableBtn
                                id={`${meta.before._id}-beforeUpdateingUser`}
                                name={'Before'}
                                data={meta.before}
                            />
                            <p>and</p>

                            <DynamicTableBtn
                                id={`${meta.after._id}-afterUpdateingUser`}
                                name={'After'}
                                data={meta.after}
                            />
                        </div>


                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default UpdateUserMeta
