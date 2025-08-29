'use client'

import React, { useState, useEffect } from 'react'
import SingleDayInCalender from './Navbar/SingleDayInCalender';

const sampleUserData = [
    { date: '2025-07-22', name: 'Alice' },
    { date: '2025-07-24', name: 'Bob' },
    { date: '2025-07-29', name: 'Charlie' },
]



const getDaysInMonthTemp = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // last day of month
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
}

// Helper: Get days in current month
const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1)
    const days = []
    while (date.getMonth() === month) {
        days.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }
    return days
}

const Calendar = ({ userData = [] }) => {
    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()) //e.g 08 
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())//e.g 2025

    const days = getDaysInMonth(currentYear, currentMonth)

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    // Create map for userData keyed by date string
    const userMap = userData.reduce((acc, entry) => {
        const dateStr = new Date(entry.date).toDateString()
        acc[dateStr] = entry
        return acc
    }, {})

    // console.log('userMap:' ,userMap)
    // console.log('days:' ,days)
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
                <h1 className="hidden md:flex text-3xl font-bold text-center mb-6">Employee Calendar {currentYear} </h1>

            {/*left------- buttons--------- right  */}
            <div className="flex justify-between items-center  mb-10">

                <button
                    className="btn btn-sm"
                    disabled={currentMonth === 0}
                    onClick={() => setCurrentMonth((prev) => prev - 1)}>
                    &larr;
                </button>

                <h2 className="text-xl font-bold  flex items-center justify-center gap-2">

                    <fieldset className="fieldset flex flex-row ">
                        {/* <legend className="fieldset-legend">Year</legend> */}
                        <input onChange={(e) =>{
                            if(e.target.value >2000 && e.target.value<100000)
                            setCurrentYear(e.target.value)
                        } } type="number" defaultValue={currentYear} className="input input-sm" placeholder="Enter Year" />
                    </fieldset>
                    {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}

                </h2>

                <button
                    className="btn btn-sm"
                    disabled={currentMonth === 11}
                    onClick={() => setCurrentMonth((prev) => prev + 1)}>
                    &rarr;
                </button>

            </div>

            <div className="grid grid-cols-7  gap-2 text-center font-semibold text-sm  text-black">
                {weekDays.map(day => <div key={day}>{day}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-2 mt-2">
                {
                    // Fill initial empty days
                    Array((days[0].getDay() + 6) % 7).fill(null).map((_, i) => (
                        <div key={'empty-' + i}></div>
                    ))
                }

                {days.map((day, index) => {
                    const dayStr = day.toDateString()
                    const user = userMap[dayStr]

                    return (

                        <SingleDayInCalender key={index} day={day} />
                        // <div key={index} className="border rounded-lg p-2 min-h-[80px] bg-base-100 shadow-sm hover:bg-base-200 transition-all">
                        //     <div className="text-xs font-bold">{day.getDate()}</div>
                        //     {user && (
                        //         <div className="text-xs mt-1 text-primary-content bg-primary rounded px-1 py-[2px]">
                        //             {user.name}
                        //         </div>
                        //     )}
                        // </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Calendar
