import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const RegestrationForm = () => {
  

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";

  const { createUser, updateUser, setReload } = useContext(AuthContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const onSubmit = (data, event) => {
    console.log(data);
    event.preventDefault();
    const { email, password, imageAddress, name } = data;
    createUser(email, password)
      .then((result) => {
        const createdUser = result.user;
        console.log(createdUser);
        
              updateUser(name, imageAddress).then(() => {
                const user = { name: name, email: email,role:"user" };
        fetch("http://localhost:5000/user", {
          method: 'POST',
          headers: { "content-type": "application/json" },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully registered",
                showConfirmButton: false,
                timer: 1000,
              });
                setReload(Date.now());
                navigate('/');
              }});
            
          });
      })
      .catch((Error) => {
        console.log(Error);
        setError(Error);
      });
  };

  return (
    <div>
      <div>
        <div className="flex flex-col gap-2 bg-blue-500 w-96 px-10 py-5 rounded-xl">
          <h1 className="text-3xl text-white mb-10 text-center">
            Sign Up Here!!
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 "
          >
            <label htmlFor="name" className="text-xl text-white">
              Enter Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              placeholder="Enter Your Name here"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <span className=" text-red-500">*This field is required*</span>
            )}
            <label htmlFor="mail" className="text-xl text-white">
              Enter Email id
            </label>
            <input
              type="email"
              id="mail"
              placeholder="Enter mail here"
              className="input input-bordered w-full max-w-xs"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <span className=" text-red-500">
                *Please enter a valid email address*
              </span>
            )}
            <label htmlFor="photo" className="text-xl text-white">
              Enter image address
            </label>
            <input
              type="text"
              id="photo"
              placeholder="Enter mail here"
              className="input input-bordered w-full max-w-xs"
              {...register("imageAddress", { required: true })}
            />
            {errors.imageAddress && (
              <span className=" text-red-500">This field is required</span>
            )}
            <label htmlFor="pass" className="text-xl text-white">
              Enter password
            </label>
            <input
              type="password"
              id="pass"
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-xs "
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password should be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <label htmlFor="confirm_pass" className="text-xl text-white">
              Confirm password
            </label>
            <input
              type="password"
              id="confirm_pass"
              placeholder="Enter your confirm password"
              className="input input-bordered w-full max-w-xs "
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
            <input
              type="submit"
              value="Register"
              className="input input-bordered w-full max-w-xs btn my-5 "
            />{" "}
          </form>

          <p className="text-white">
            Already Registered ?
            <Link to={"/login"} className="underline text-blue-700">
              {" "}
              Login here!!.
            </Link>{" "}
          </p>
        </div>
      </div>
      {error && <span className=" text-red-500">{error}</span>}
    </div>
  );
};

export default RegestrationForm;
