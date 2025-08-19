import React from 'react'

const StatDiv = ({ name, figure, icon, info=null }) => {
    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    {icon}
                </div>
                <div className="stat-title">{name}</div>
                <div className="stat-value">{figure}</div>
                <div className="stat-desc">{info}</div>
                
            </div>


        </div>
    )
}

export default StatDiv
