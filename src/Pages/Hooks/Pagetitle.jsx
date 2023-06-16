import React from 'react';
 import img from '../../assets/Untitled design (5).png'
const Pagetitle = ({title}) => {
    return (
        <div className='my-5 ml-52'> <div>
            <img src={img}  className='w-2/3 h-28'/>
        </div>
        <h1 className='text-4xl text-white relative z-10 bottom-20 left-44'>
            {title} 
        </h1>
            
        </div>
    );
};

export default Pagetitle;