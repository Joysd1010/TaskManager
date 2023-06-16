import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Home/Home";
import Login from "../LoginRegister/Login";
import Register from "../LoginRegister/Register";
const Router =createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
            path:'/',
            element: <Home/>     
        },
        {
            path:'/login',
            element: <Login/>   
        },
        {
            path:'/reg',
            element: <Register/>   
        },
      ]
    },
  ]);
export default Router;