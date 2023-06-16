import React from 'react';
import useTitle from '../Hooks/useTitle';
import Pagetitle from '../Hooks/Pagetitle';
import Slider from './Slider';
import useAdmin from '../Hooks/useAdmin';

const Home = () => {

    useTitle('Home')

    
    return (
        <div className='md:mx-20'>
           <Pagetitle title={'Welcome to TaskManager'}/>
           <Slider/>
        </div>
    );
};

export default Home;