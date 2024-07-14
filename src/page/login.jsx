import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundVideo from "../assets/nature.mp4"; // Update with the correct path to your video
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "@/Redux/Actions/user";
// import backgroundVideo from "../assets/videoClip.mp4"; // Update with the correct path to your video

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(LoginUser(data));
    navigate("/");
    reset();
  };

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
          <h2 className="text-2xl font-bold mb-6 text-green-200 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link to="/forget-password">
              <button className="text-sm text-indigo-500 hover:underline">
                Forgot Password?
              </button>
            </Link>
            <p className="mt-2 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-indigo-500 hover:underline"
              >
                Signup
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
