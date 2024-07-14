import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/videoClip.mp4"; // Update with the correct path to your video
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "@/Redux/Actions/user";
import Loading from "./custom/loader";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(RegisterUser(data));
    reset();
  };

  console.log("user::", user && user?.data?.message);
  if (user.loading) {
    return <Loading />;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full">
        <div className="w-full max-w-md bg-white bg-opacity-30 backdrop-blur-lg rounded-lg p-8 shadow-lg border border-white border-opacity-30">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">
            Registration Form
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between gap-1 md:flex-row flex-col">
              <div className="flex-1">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 2,
                      message: "First Name must be at least 2 characters long",
                    },
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex-1 mt-1 md:mt-0">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 2,
                      message: "Last Name must be at least 2 characters long",
                    },
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Password"
              />
              <div
                className="absolute inset-y-11 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type={showConPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Confirm password must be at least 6 characters long",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Confirm Password"
              />
              <div
                className="absolute inset-y-11 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConPassword(!showConPassword)}
              >
                {showConPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
              >
                Signup
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="mt-2 text-sm">
              Already have an account?{" "}
              <button
                className="text-indigo-500 hover:underline "
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
