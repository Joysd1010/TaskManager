import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useAdmin=()=>{
    const [adminUser,setUser]=useState([])
    const {user}=useAuth()
  
    useEffect(()=>{fetch(`http://localhost:5000/user/${user?.email}`)
    .then(res=>res.json())
    .then(data=>{

        // console.log(data.role=='admin')
        setUser(data.role==='admin')
    })},[user])
    


    return adminUser

}
export default useAdmin;