'use client'
import React from 'react'

const InputField = ({ prompt = null, defaultValue=null, type='text', optional = null, setValue = null, className=null }) => {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{prompt && prompt }</legend>
            <input
                type={type}
                onChange={(e)=>{
                    e.preventDefault()
                    setValue(e.target.value)
                }}
                className={`input ${className}`}
                defaultValue={defaultValue}
                placeholder="Type here" />
            {

                optional?.error && <p className="label text-red-500">{optional.error}</p>
            }
            {

                optional?.msg && <p className="label text-blue-500">{optional.msg}</p>
            }
        </fieldset>
    )
}

export default InputField
