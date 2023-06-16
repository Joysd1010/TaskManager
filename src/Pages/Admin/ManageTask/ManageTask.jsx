import React from 'react';
import useTitle from '../../Hooks/useTitle';
import useTask from '../../Hooks/useTask';
import Pagetitle from '../../Hooks/Pagetitle';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';


const ManageTask = () => {
    useTitle('Manage Task')
    const [task,refetch]=useTask()
    // console.log(task)
    const navigate=useNavigate()
    const handleedit=(job)=>{
        navigate('/update',{state:{job:job}})

    }
    // ------------------deleting Operation-------------------------------
    const handleDelete=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/tasks/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
          })

    }
    return (
        <div className='mx-20'>
           <Pagetitle title={'Manage Tasks'}/>
{/* -------------------------------------------the table header--------------------------------- */}
           <div className='grid grid-cols-6 bg-gradient-to-br from-violet-700 to-lightBlue-500 px-10 py-5 rounded-tr-3xl rounded-bl-3xl font-bold text-xl'>
            <div>
                <h1>Task Image</h1>
            </div>
            <div>
                <h1> Task Name</h1>
            </div>
            <div>
                <h1> Total Complete</h1>
            </div>
            <div>
                <h1>Deadline</h1>
            </div>
            <div>
                <h1>Status</h1>
            </div>
            <div>
                <h1>Action</h1>
            </div>
           </div>
{/* ------------------------------------Table body------------------------------------------- */}
           <div>
                {task.map(job=><div key={job._id} className='grid grid-cols-6 bg-gradient-to-br from-violet-700 to-lightBlue-500 px-10 py-5 my-3 rounded-tr-3xl rounded-bl-3xl  font-semibold items-center '>
                        <div>
                            <img src={job.image} className='w-28 rounded-3xl' />
                        </div>
                        <div><h1>{job.task_name}</h1></div>
                        <div className='text-center'><h1>{job.total_completed}</h1></div>
                        <div><h1>{job.task_deadline}</h1></div>
                        <div><h1>{job.task_approve_status}</h1></div>
                        <div className='flex items-center gap-2'>{job.task_approve_status=='approved'?<button disabled className='btn btn-primary'>Approve</button>:<button  className='btn btn-primary'>Approve</button>

                            }
                            
                                <button onClick={()=>handleDelete(job._id)} className='btn btn-error'><FaTrash/></button>
                                <button onClick={()=>handleedit(job)} className='btn btn-info'><FaEdit/></button>
                                
                            
                        </div>
                        
                    </div>
                )
                    
                }
           </div>
        </div>
    );
};

export default ManageTask; 