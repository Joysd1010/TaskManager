import React from 'react';
import {  NavLink } from "react-router-dom";
import { TfiBook } from "react-icons/tfi";
import useAdmin from "../Hooks/useAdmin";
import useAuth from '../Hooks/useAuth';



const Nav = () => {
   //------------------checking admin or not-------------------
const {user}=useAuth()
const admin=useAdmin()
    return (
        <div>
            <div className='flex flex-col md:flex-row gap-2 '>
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
            
                {user&&admin?<NavLink
                     to="/addTask"
                     className={({ isActive }) =>
                       isActive
                         ? "text-blue-500 font-bold text-base md:text-xl px-5  duration-300"
                         : "text-gray-600 font-bold text-base md:text-xl px-5  duration-300"
                     }
                   >
                     Add task
                   </NavLink>:<NavLink
                     to="/allTask"
                     className={({ isActive }) =>
                       isActive
                         ? "text-blue-500 font-bold text-base md:text-xl px-5  duration-300"
                         : "text-gray-600 font-bold text-base md:text-xl px-5  duration-300"
                     }
                   >
                     All tasks
                   </NavLink>}   
                   {user&&admin?<NavLink
                     to="/managetask"
                     className={({ isActive }) =>
                       isActive
                         ? "text-blue-500 font-bold text-base md:text-xl px-5  duration-300"
                         : "text-gray-600 font-bold text-base md:text-xl px-5  duration-300"
                     }
                   >
                     Manage Task
                   </NavLink> :<NavLink
                     to="/myTask"
                     className={({ isActive }) =>
                       isActive
                         ? "text-blue-500 font-bold text-base md:text-xl px-5  duration-300"
                         : "text-gray-600 font-bold text-base md:text-xl px-5  duration-300"
                     }
                   >
                     My Tasks
                   </NavLink>

                   }  
                   {user&&admin&&<NavLink
                     to="/manageUser"
                     className={({ isActive }) =>
                       isActive
                         ? "text-blue-500 font-bold text-base md:text-xl px-5  duration-300"
                         : "text-gray-600 font-bold text-base md:text-xl px-5  duration-300"
                     }
                   >
                     Manage Users
                   </NavLink>}
            
           
           
           
          </div>
        </div>
    );
};

export default Nav;