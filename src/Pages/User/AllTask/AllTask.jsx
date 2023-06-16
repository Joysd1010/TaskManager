import React from 'react';
import useTitle from '../../Hooks/useTitle';
import Pagetitle from '../../Hooks/Pagetitle';
import useTask from '../../Hooks/useTask';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AllTask = () => {
    useTitle('All Tasks')
    const {user}=useAuth()
    const navigate=useNavigate()
    const [task,refetch]=useTask()
    const showingTask=task.filter(job=>job.task_approve_status=='approved')
    const handlecart = (data) => {
        if(user){
            const {task_name,_id,task_deadline,image}=data
            const cartTask = {
              classId: _id,
              task_deadline:task_deadline,
              email: user.email,
              image:image,
              status:'On Progress',
              task_name:task_name,
           
            };
            fetch("https://task-manager-server-puce.vercel.app/cart", {
              method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(cartTask),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  refetch();
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully Added to MyTasks, Take necessary steps to complete this task",
                    showConfirmButton: false,
                    timer: 2000,
                  })
      
                  
                }
              });
        }
        else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please Login in to perform a task",
                showConfirmButton: false,
                timer: 2000,
              })
              navigate('/login')
        }
       
        
      };
    
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
                        <button onClick={()=>handlecart(job)} className='btn btn-primary'>Take attempt</button>
                    </div>
                    </div>)
            }</div>
        </div>
    );
};

export default AllTask;