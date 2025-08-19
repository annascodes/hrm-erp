import React from 'react'
import DynamicTable from './DynamicTable'

const DynamicTableBtn = ({id,name=null, data }) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-neutral btn-outline btn-xs  tracking-wider" onClick={() => document.getElementById(`${id}-dynamictablebtn`).showModal()}>
                {name || 'details'}
            </button>
            <dialog id={`${id}-dynamictablebtn`} className="modal">
                <div className="modal-box">
                  <DynamicTable data={data} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default DynamicTableBtn
