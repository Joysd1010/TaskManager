import React from 'react';
import img from "../../assets/5172658.jpg";
import RegestrationForm from './RegisterForm';
import useTitle from '../Hooks/useTitle';
const Registration = () => {
    useTitle('Registration')
    return (
        <div
      style={{ backgroundImage: `url(${img})` }}
      className=" bg-cover bg-no-repeat px-20"
    >
        <div className="py-20 mx-60 relative left-44">
            <RegestrationForm/>
        </div>
        
    </div>
    );
};

export default Registration;