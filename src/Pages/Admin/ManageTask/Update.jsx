import React from "react";
import useTitle from "../../Hooks/useTitle";
import Pagetitle from "../../Hooks/Pagetitle";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Update = () => {
  useTitle("Update");


  const location = useLocation();
const navigate=useNavigate()
  const task = location.state.job;
  console.log(task)
  console.log(task.task_deadline)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = (data, event) => {
    // console.log(data);
    event.preventDefault();
    const { description, deadline,  name } = data;

    const newtask = {
        task_name: name,
      task_deadline: deadline,
      task_description: description,
    };
    fetch(`http://localhost:5000/updatetask/${task._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newtask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount ) {
          reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully registered",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate('/manageTask')
        }
      });
  };

  return (
    <div className="mx-20">
      <Pagetitle title={"Update task"} />
      <div className="flex justify-around">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 bg-blue-300 p-8">
        <label htmlFor="name" className="text-xl text-violet-600">
          Enter Name
        </label>
        <input
          type="text"
          defaultValue={task.task_name}
          id="name"
          {...register("name", { required: true })}
          placeholder="Enter Task Name here"
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="deadline" className="text-xl text-violet-600">
          Enter deadline
        </label>
        <input
          type="text"
          defaultValue={task.task_deadline}
          id="deadline"
          {...register("deadline", { required: true })}
          placeholder="Enter Deadline here"
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="description" className="text-xl text-violet-600">
          Enter Description
        </label>
        <textarea
          type="text"
          defaultValue={task.task_description}
          id="description"
          {...register("description", { required: true })}
          placeholder="Enter description here"
          className="input input-bordered w-full max-w-xs"
        />
        <input type="submit" value={'Update'} className="btn btn-primary" />
      </form></div>
    </div>
  );
};
export default Update;
