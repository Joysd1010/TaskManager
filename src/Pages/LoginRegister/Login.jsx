import React from "react";
import img from "../../assets/5172658.jpg";
import Form from "./Loginform";
import useTitle from "../Hooks/useTitle";

const Login = () => {
    useTitle("Login");
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className=" bg-cover bg-no-repeat px-20"
    >
        <div className="py-20 mx-60 relative left-44">
            <Form/>
        </div>
        
    </div>
  );
};

export default Login;
