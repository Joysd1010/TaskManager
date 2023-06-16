import React from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useTitle from "../../Hooks/useTitle";
import Pagetitle from "../../Hooks/Pagetitle";



const AddTask = () => {
    useTitle('Add Task')
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  
  

  const onSubmit = (data) => {
    const {task_name,task_deadline,task_description,image}=data

    const newTask={
        image:image,
        task_name:task_name,
        task_deadline:task_deadline,
        task_description:task_description,
        task_approve_status:'pending',
        total_completed:0

    }
    
            fetch('http://localhost:5000/addTask',{
                method:'POST',
                headers: { "content-type": "application/json" },
                body:JSON.stringify(newTask)
            })
            .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {   
                reset()         
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully sent Added task , ask admin to Approve",
                showConfirmButton: false,
                timer: 2000,
              });
                
              }});
        }
      
  

  return (<div className="mx-20">
    <Pagetitle title={'Add a Task'}/>
    <div className="p-10 bg-gradient-to-br from-violet-700 to-blue-200 rounded-xl flex justify-around mx-60">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
        {/* Class name */}
        <div className="flex gap-5">
        
          <input
            type="text"
            placeholder="Task Name"
            id="task_name"
            {...register("task_name", { required: true })}
            className="input input-bordered input-info w-full max-w-xs"
            />
       
          
          <input
            type="date"
            
            placeholder="Task deadline"
            id="task_deadline"
            className="input input-bordered input-info w-full max-w-xs"
            {...register("task_deadline", { required: true })}
          />
        </div>
        <div className="flex justify-around">
          <textarea
            type="text"
            placeholder="Task Description"
            id="task_description"
            className="input input-bordered input-info w-full max-w-xs"
            {...register("task_description", { required: true })}
          />
          
        </div>
        <div className="flex  justify-around">
          <input
            type="text"
            placeholder="Enter the Task image link"
            id="image"
            className="input input-bordered input-info w-full max-w-xs"
            {...register("image", { required: true })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
    
  );
};

export default AddTask;
