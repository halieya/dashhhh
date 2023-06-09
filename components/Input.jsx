import React from 'react'

const Input = ( {label,htmlFor,...props}) => {
  return (

    <div className='flex flex-col mb-1'>
        <label htmlFor={htmlFor}>{label}</label>
        <input {...props} className='h-7 bg-slate-100 rounded border pl-2'/>
    </div>
  )
}

export default Input