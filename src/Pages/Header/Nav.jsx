import React from 'react';
import {  NavLink } from "react-router-dom";
import { TfiBook } from "react-icons/tfi";



const Nav = () => {
   
    return (
        <div>
            <div className='flex flex-col md:flex-row gap-2'>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold text-base md:text-xl px-5  duration-300"
                  : "text-gray-600 font-bold text-base md:text-xl px-5  duration-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/class"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold text-base md:text-xl px-5  duration-300"
                  : "text-gray-600 font-bold text-base md:text-xl px-5  duration-300"
              }
            >
              All Classes
            </NavLink>
            <NavLink
              to="/instruct"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold text-base md:text-xl px-5  duration-300"
                  : "text-gray-600 font-bold text-base md:text-xl px-5  duration-300"
              }
            >
              Instructors
            </NavLink>
           
           
          </div>
        </div>
    );
};

export default Nav;