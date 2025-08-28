import React from 'react'
import DynamicTable from './DynamicTable'

const DynamicTableBtn = ({id,name=null, data, className='btn btn-neutral btn-outline btn-xs tracking-wider', heading=null }) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className={className} onClick={() => document.getElementById(`${id}-dynamictablebtn`).showModal()}>
                {name || 'details'}
            </button>
            <dialog id={`${id}-dynamictablebtn`} className="modal">
                <div className="modal-box">
                  <DynamicTable data={data} heading={heading} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default DynamicTableBtn
