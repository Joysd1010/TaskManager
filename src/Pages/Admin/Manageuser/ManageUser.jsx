import React from "react";

import { useQuery } from "@tanstack/react-query";

import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser";
import useTitle from "../../Hooks/useTitle";
import Pagetitle from "../../Hooks/Pagetitle";

const ManageUser = () => {
    useTitle('Manage User')
  const [User,refetch]=useUser()
  
  const handleAdmin = (id,name) => {
    fetch(`http://localhost:5000/users/admin/${id}`,{
        method:'PATCH',
        
    }).then(res=>res.json())
    .then(data=>{
        if(data.modifiedCount>0){
            refetch();
            
            Swal.fire({
            position: "center",
            icon: "success",
            title: `${name} is Admin now`,
            showConfirmButto1n: false,
            timer: 1500,
          })
        }
        
    })
  };
  
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
          fetch(`http://localhost:5000/deleteUser/${id}`, {
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
  };
  return (
    <div className="mx-20">
      <Pagetitle title={`Manage ${User.length} users`} />
      <div className="w-full">
        <div className="w-full overflow-x-auto bg-indigo-300 rounded-lg">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="text-xl">
                <th>#</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {User?.map((item, index) => (
                <tr key={item._id}>
                  <td className="">{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td className="">{item?.role || "User"}</td>
                  <td className="flex gap-2">
                    {item?.role== 'admin'?<button disabled
                      onClick={() => handleAdmin(item._id,item.name)}
                      className="text-white bg-red-600  btn btn-ghost"
                    >
                      Make Admin
                    </button>:
                    <button
                      onClick={() => handleAdmin(item._id)}
                      className="text-white bg-red-600  btn btn-ghost"
                    >
                      Make Admin
                    </button>}
                    
                    
                    <button className="btn btn-warning" onClick={() => handleDelete(item._id)}>
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
