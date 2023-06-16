import React,{useContext} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { TailSpin } from 'react-loader-spinner'


const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location=useLocation()

    if(loading){
        return <div className='flex justify-around'><TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /></div>
    }

    if(user){
        return children;
       }
       return <Navigate state={{from: location}} to="/login"  replace></Navigate>
    };

export default PrivateRoute;