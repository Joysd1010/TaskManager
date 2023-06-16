import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Home/Home";
import Login from "../LoginRegister/Login";
import Register from "../LoginRegister/Register";
import AllTask from "../User/AllTask/AllTask";
import PrivateRoute from "../Private/PrivateRoute";
import MyTask from "../User/MyTask/MyTask";
import AddTask from "../Admin/AddTask/AddTask";
import ManageUser from "../Admin/Manageuser/ManageUser";
import ManageTask from "../Admin/ManageTask/ManageTask";
import Update from "../Admin/ManageTask/Update";
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
        {
            path:'/allTask',
            element:<AllTask/>
        },
        {
            path:'/mytask',
            element:<PrivateRoute><MyTask/></PrivateRoute>
        },
        {
            path:'/addTask',
            element:<AddTask/>
        },
        {
            path:'/manageUser',
            element:<ManageUser/>
        },
        {
            path:'/manageTask',
            element:<ManageTask/>
        },
        {
            path:'/update',
            element:<Update/>
        },
      ]
    },
  ]);
export default Router;