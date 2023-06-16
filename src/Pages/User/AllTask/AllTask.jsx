import React from 'react';
import useTitle from '../../Hooks/useTitle';
import Pagetitle from '../../Hooks/Pagetitle';
import useTask from '../../Hooks/useTask';

const AllTask = () => {
    useTitle('All Tasks')
    const [task,refetch]=useTask()
    const showingTask=task.filter(job=>job.task_approve_status=='approved')

    
    return (
        <div className='mx-20'>
            <Pagetitle title={'Here are all tasks for you'}/>
            <div className=' grid grid-cols-2 gap-10'>
            {
                showingTask.map(job=><div key={job._id} className='p-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500  rounded-tl-3xl rounded-br-3xl '>
                    <div className='flex justify-around '>
                        <img src={job.image} className='w-2/3 rounded-3xl h-56 border-2 border-white' />
                    </div>
                    <div className='flex justify-between mx-10 my-3 items-center'>
                        <div className='font-bold text-3xl text center'>
                        {
                            job.task_name
                        }
                        </div>
                        <div className='font-bold text-xl'>
                            Deadline: {job.task_deadline}
                        </div>

                    </div>
                    <div className='flex items-end mx-10 '>
                        <h1> <span className='font-bold text-xl'>Task description : </span> 
                            {job.task_description}
                        </h1>
                        <button className='btn btn-primary'>Take attempt</button>
                    </div>
                    </div>)
            }</div>
        </div>
    );
};

export default AllTask;