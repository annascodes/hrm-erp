import React from 'react'
import DynamicTableBtn from './DynamicTableBtn'
import moment from 'moment'
import RoleBadges from './RoleBadges'
import { HiAtSymbol } from 'react-icons/hi2'
import AuditActions from './AuditActions'

const ActivityLogDiv = ({ action: a = null }) => {
    return (a &&
        <div className='flex flex-row items-center mx-5 my-0 px-3 py-1 gap-2 '>


          <div className='hidden md:flex'>
              <AuditActions action={a.action} className={'text-4xl '} />
          </div>

            <div className='p-5 bg-stone-50 rounded-xl w-full'>
                <div className='btn btn-active btn-primary tracking-widest btn-xs mb-3 cursor-default'>
                    {a.action}
                </div>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center bg-blue-100 rounded-lg p-1'>
                        <HiAtSymbol className='text-xl' />
                        <p> {a?.user?.username}</p>
                    </div>
                    <p> who is an </p>
                    <RoleBadges role={a?.user?.role} />

                </div>
                <h1 className='my-3 flex items-center gap-3'>


                    {a.desc}


                </h1>

                <div className='flex justify-between'>
                    <div className='[word-spacing:0.1rem] text-xs '>

                        <span className='btn btn-outline tracking-widest mr-2 btn-xs'> {moment(a.createdAt).fromNow()}</span>
                        {moment(a.createdAt).format("dddd, Do MMMM YYYY [at] h:mm a")}
                    </div>

                    <DynamicTableBtn id={a._id} name={a?.target} data={a.targetId} />
                </div>



            </div>
        </div>
    )
}

export default ActivityLogDiv
