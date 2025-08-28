'use client'
import useApiReq from '@/lib/hooks/useApiReq'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ActivityLogDiv from '@/components/ActivityLogDiv';
import moment from 'moment';
import { MdCancel } from 'react-icons/md';
import { ActivityActions } from '@/lib/helperFunctions';


const page = () => {
    const { request, data, loading, err } = useApiReq()
    const [activities, setActivities] = useState(null)
    const [date, setDate] = useState(null)
    const [startIndex, setStartIndex] = useState(0)
    const [limit, setLimit] = useState(5)
    useEffect(() => {
        request(`/api/activity/admin?startIndex=${startIndex}&limit=${limit}`)
    }, [])
    useEffect(() => {
        if (data) {

            if (startIndex === 0) {
                // console.log("initial load");
                setActivities(data);
            } else {
                // console.log("pagination load");
                setActivities(prev => [...prev, ...data]);
            }

        }
        if (err) {
            toast.error(err.error)
        }
    }, [data, err])

    const handleSeeMore = () => {
        let temp = startIndex + limit
        setStartIndex(temp)
        request(`/api/activity/admin?startIndex=${temp}&limit=${limit}`)

    }

    const handleDate = () => {
        setActivities(null)
        setStartIndex(0)
        request(`/api/activity/admin?date=${date}`)
    }
    // console.log('activities: ', activities)
    return (
        <div className='md:p-5 '>
            <div className='flex flex-wrap justify-around gap-4 mb-10  '>
                <div>
                    <h1 className='text-5xl font-extrabold  '>Activity Log</h1>


                </div>

                <div className='flex flex-row items-center gap-2'>
                    <input onChange={(e) => setDate(e.target.value)} type="date" className="input" />
                    <select defaultValue="Pick a color" className="select w-60">
                        <option disabled={true}>Pick tag</option>
                        {
                            ActivityActions.map((a, i) => {
                                return (
                                    <option key={`${i}-ActivityAction`} value={a} >{a}</option>
                                )
                            })
                        }
                    </select>

                    <button onClick={handleDate} className='btn btn-neutral btn-outline btn-sm m-2 tracking-wider'>Go</button>
                </div>
            </div>

            {
                loading && <div className='flex flex-row justify-center p-10'><span className='loading loading-spinner '></span></div>
            }

            <div>
                <button
                    onClick={() => {
                        setActivities(null)
                        setStartIndex(0)
                        setDate(null)
                        request(`/api/activity/admin?startIndex=${startIndex}&limit=${limit}`)
                    }}
                    className='mx-2 btn btn-neutral btn-outline btn-xs tracking-widest'>refresh</button>
            </div>
            {
                activities && activities.map((a, i) => {
                    return (
                        <ActivityLogDiv key={a._id} action={a} />
                    )
                })
            }



            {
                (data && data.length >= limit) ?
                    !date && <div className='flex flex-row justify-center'>
                        <button
                            onClick={handleSeeMore}
                            className='btn btn-neutral btn-outline'>
                            {
                                loading ? <span className='loading loading-spinner loading-sm'></span> : "see more"
                            }

                        </button>
                    </div>
                    : <div className='btn btn-active btn-primary cursor-default w-full mt-5'>All caught up</div>
            }



            {/* 
            <pre className='text-xs'>
                {activities && JSON.stringify(activities, null, 10)}
            </pre> */}



        </div>
    )
}

export default page
