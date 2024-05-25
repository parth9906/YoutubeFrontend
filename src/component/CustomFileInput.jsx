import React, { useRef, useState } from 'react'


const CustomFileInput = ({
    value, 
    onChange,
    defaultText="choose a file",
    accept='*',
    error,
    helperText,
}) => {
    const uploadInputRef = useRef(null);
   

    const handleClick = ()=>{
        uploadInputRef.current.click();
    }
  return (
    <div>
      <input ref={uploadInputRef} accept={accept} type="file" className='hidden' onChange={(e)=>onChange(e)}/>
      <div className={`cursor-pointer min-h-16 border-2 border-dashed border-sky-300 rounded flex flex-col justify-center items-center bg-slate-200 hover:bg-slate-300 hover:outline outline-1 ${error?"border-[#d32f2f]":""}`  } onClick={handleClick}> 
        <div className='text-sky-600 px-4 py-2 w-full text-center'>{ 
            value?.length >0 ?
            new Array(value?.length).fill(0)?.map((_,index)=>
                (<div key={index} className='text-sm truncate'>{value[index].name}</div>)
            ) : defaultText
        }</div>
            
      </div>
      <div className={`${error?'text-[#d32f2f]':''} text-sm mx-[14px]`}>{helperText}</div>
    </div>
  )
}

export default CustomFileInput;


