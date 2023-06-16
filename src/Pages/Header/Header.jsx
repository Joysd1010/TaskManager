import React, { useState, useContext } from "react";
import { ImMenu } from "react-icons/im";
import { GiCrossedBones } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import img from "../../assets/Task Manager.png";

import Nav from "./Nav";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

// ----------Log out button-------------------

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
//----------------responsive button control---------------
  const [menu, setMenu] = useState(true);
  const handleMenuOpen = () => {
    setMenu(false);
  };
  const handleMenuClose = () => {
    setMenu(true);
  };

  return (
    <div className="">
      <nav className=" mx-5 md:mx-20 flex items-center py-3 md:py-3 justify-between ">
        <div className=" flex items-center">
          <img
            className=" rounded-3xl w-14 md:w-20"
            src={img}
            alt=""
          />
          <h1 className="text-2xl md:text-5xl px-4 ">Task Manager</h1>
        </div>
        <div className="flex items-center">
          <div
            className={`flex items-center flex-col gap-3 md:flex-row md:static absolute ${
              menu ? "-top-80 right-16" : " right-16 bg-blue-200 md:bg-white px-1 py-2 rounded-lg top-10" 
            } duration-500 z-20`}
          >
            <Nav menu={menu} />
            {!user ? (
              <div>
                <Link to={"/login"}>
                  <button className="btn btn-info hover:bg-blue-500 hover:text-white text-yellow-50 md:ml-10">
                    
                    Sign in
                  </button>
                </Link>
              </div>
            ) : (
              <button onClick={handleLogOut} className="btn btn-info hover:bg-blue-500 hover:text-white text-yellow-50 md:ml-10">
                {" "}
                Sign Out
              </button>
            )}
            <div className={`${user?"block":"hidden"}`}>
              <div
              className="tooltip  tooltip-primary"
              data-tip={user?.displayName ||user?.email}
            >
              <div className="avatar">
                <div className="w-12 md:w-14 md:ml-10  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {
                user?.photoURL? <img src={user?.photoURL}/>: <FaUserAlt/>
                
              }
                 {console.log(user?.photoURL)}

                </div>
              </div>
            </div>
            </div>
            
          </div>
          <div className=" md:hidden ml-5">
            {menu ? (
              <div className=" border-2 border-blue-500 p-1 rounded-lg">
                <ImMenu onClick={handleMenuOpen} size={20} />
              </div>
            ) : (
              <div className=" border-2 border-blue-500 p-1 rounded-lg">
                <GiCrossedBones onClick={handleMenuClose} size={20} />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
