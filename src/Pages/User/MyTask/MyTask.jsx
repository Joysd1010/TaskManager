import React from "react";
import useCart from "../../Hooks/useCart";
import useTask from "../../Hooks/useTask";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyTask = () => {
  const [cart, refetch] = useCart();
  const [task] = useTask();
//   console.log(task);

  const completeTask=(id,newComplete)=>{
     fetch(`https://task-manager-server-puce.vercel.app/number/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newComplete),
    })
      .then((res) => res.json())
      .then((info) => {
        if (info.modifiedCount > 0) {
          console.log(info);
            
         
        }
      });
  }

  const handleComplete = (data) => {
    const cartTaskId = task.find((job) => job._id === data.classId);
    const complete = parseInt(cartTaskId.total_completed);
    console.log(cartTaskId._id)
    const newComplete = complete + 1;
    fetch(`https://task-manager-server-puce.vercel.app/complete/${data._id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body:JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(newComplete)
          if (data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              position: "center",
              icon: "success",
              title: "This Task is completed",
              showConfirmButto1n: false,
              timer: 1500,
            });
            completeTask(cartTaskId._id,cartTaskId)
          }
        });
  };

  // ====================deleting========================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://task-manager-server-puce.vercel.app/cart/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };
  // console.log (cart)
  return (
    <div className="mx-20">
      {/* ----------------Table header------------------- */}
      <div className="grid grid-cols-5 bg-gradient-to-br from-blue-300 via-pink-500 to-violet-500 px-10 py-5 rounded-tr-3xl rounded-bl-3xl font-bold text-xl">
        <div>
          <h1>Task Image</h1>
        </div>
        <div>
          <h1> Task Name</h1>
        </div>
        <div>
          <h1> Task Status</h1>
        </div>
        <div>
          <h1>Deadline</h1>
        </div>

        <div>
          <h1>Action</h1>
        </div>
      </div>
      {/* -----------table body ------------- */}
      <div>
        {cart.map((job) => (
          <div
            key={job._id}
            className="grid grid-cols-5 bg-gradient-to-br from-violet-700 to-lightBlue-500 px-10 py-5 my-3 rounded-tr-3xl rounded-bl-3xl  font-semibold items-center "
          >
            <div>
              <img src={job.image} className="w-28 rounded-3xl" />
            </div>
            <div>
              <h1>{job.task_name}</h1>
            </div>

            <div>
              <h1>{job.status}</h1>
            </div>
            <div>
              <h1>{job.task_deadline}</h1>
            </div>
            <div className="flex items-center gap-2">
              {job.status == "completed" ? (
                <button disabled className="btn btn-primary">
                  Approve
                </button>
              ) : (
                <button
                  onClick={() => handleComplete(job)}
                  className="btn btn-primary"
                >
                  Complete
                </button>
              )}

              <button
                onClick={() => handleDelete(job._id)}
                className="btn btn-error"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {cart.length == 0 && (
          <div className="text-5xl font-bold text-center my-5">
            You have no task to complete
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTask;
