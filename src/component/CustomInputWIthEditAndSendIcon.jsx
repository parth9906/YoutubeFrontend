import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import EditIcon from '@mui/icons-material/Edit';

const CustomInputWIthEditAndSendIcon = ({
    value,
    onChange,
    palceholder,
    submit,
}) => {
    const [editMode, setEditMode] = useState(false);
    const inputRef = useRef(null)

    useEffect(()=>{
        if(editMode=== true){
            inputRef.current.focus()
        }
    },[editMode])

  return (
    <div className='flex'>
        <input 
            type="text" 
            placeholder={palceholder}
            className='truncate w-full focus:outline-none focus:ring-2 rounded focus:ring-gray-500 focus:border-transparent'  
            ref={inputRef} style={inputStyle} 
            disabled={!editMode} 
            value={value} 
            onChange={onChange}
            onBlur={()=>setEditMode(false)}
        />
            
        {
            editMode ? 
                (<button className='px-1' onClick={()=>{setEditMode(!editMode); submit()}}><SendIcon className=' text-gray-700'/></button>) 
                : (<button className='px-1' onClick={()=>{setEditMode(!editMode);}}> <EditIcon className=' text-gray-700'/></button>)
        }
    </div>
  )
}

export default CustomInputWIthEditAndSendIcon


const inputStyle = {
    // outline: '1px solid gray',
    display: 'inline-block',
    boxSizing: 'inherit',
    margin: 0,
    padding: 0,
    lineHeight: 'inherit',
    verticalAlign: 'inherit',
    color: 'inherit',
    font: 'inherit',
    background: 'none',
  }