import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import backgroundVideo from "../assets/videoClip.mp4";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "@/Redux/Actions/user";
import Loading from "./custom/loader";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const bodyData = {
      ...data,
      token: token,
    };
    console.log("bodyData::", bodyData);
    dispatch(
      updatePassword(bodyData, (success) => {
        setIsSubmitting(false);
        if (success) {
          navigate("/login");
          reset();
        }
      })
    );
  };

  console.log("user::", user && user?.data?.message);
  // if (user.loading) {
  //   return <Loading />;
  // }

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
            Reset Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <label className="block text-gray-700">New Password</label>
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
                {...register("newPassword", {
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
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className={`w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="mt-2 text-sm">
              If you know password? You can Login{" "}
              <button
                className={`text-indigo-500 hover:underline ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
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

export default UpdatePassword;
