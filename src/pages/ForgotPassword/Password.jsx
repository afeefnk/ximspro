import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import closeIcon from "../../assets/images/close.svg"; // Import your close icon image
import "./password.css";

const Password = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center lg:bg-custom-pattern bg-cover bg-center lg:bg-[#F7F7F7]">
      {/* Logo Section */}
      <div className="mb-9">
        <img src={logo} alt="Logo" className="forgotpasslogo" />
      </div>

      {/* Login Card Section */}
      
      <div className="relative bg-white rounded-lg shadow-lg mainpass">
      <div className="header">
        {/* Close Icon */}
        <img
          src={closeIcon}
          alt="Close"
          className="absolute top-6 right-6 cursor-pointer close"
          onClick={handleClose}
        />

        <h2 className="text-[#25282B] forgotpasshead">
          Forgot Password
        </h2>
        </div>
        <form className="space-y-6">
          <div className="relative">
            <label className="text-[#898989] emaillabel">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="rounded-lg w-full border border-[#E9E9E9] mt-1 email forgotinputs"
            />
          </div>

          <div className="flex justify-end text-sm text-[#25282B]">
            <a href="/" className="hover:underline backlogin">
              Back to Login
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#254396] text-white py-2 px-4 rounded-lg my-6 hover:bg-[#1d3476] transition passbtn"
          >
            Send Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;
