import React, { useState } from 'react';
import {AiFillCloseCircle} from'react-icons/ai';

const AddModal = ({show,children, onclose}) => {
if(!show){
    return null;
}
  return (
    <>
    
        <div className='display flex justify-center items-center fixed left-0 bottom-0 right-0 top-0 bg-black/[0.3]'>
        <div className='bg-white rounded-md p-4 relative '>
        <AiFillCloseCircle size='25' color='red' className='absolute -top-2 -right-2 cursor-pointer' onClick={onclose}/>
        {children}
        </div>

    </div>
    </>
  )
  
}

export default AddModal;