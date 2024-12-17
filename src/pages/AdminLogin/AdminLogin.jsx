import React, { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from 'axios';
import { BASE_URL } from "../../Utils/Config";
import "./adminlogin.css";
import logo from "../../assets/images/logo.svg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error("Username and Password are required");
      return;
    }
  
    try {
      setLoading(true);
      console.log('Attempting to send request to backend...');
      const response = await axios.post(`${BASE_URL}/accounts/login/`, {
        email: email,
        password: password,
      });
      console.log('Response:', response);
      if (response.status === 200) {
        const adminToken = response.data.access;
        const expirationTime = 24 * 60 * 60 * 1000;
        const logoutTime = new Date().getTime() + expirationTime;
  
        localStorage.setItem('adminAuthToken', adminToken);
        localStorage.setItem('logoutTime', logoutTime);
  
        toast.success('Admin Login Success');
        navigate('/admin/dashboard');
      } else {
        throw new Error(response.data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login request:', error);
      if (error.response && error.response.status === 400) {
        toast.error("Invalid username or password");
      } else {
        toast.error(error.message || "An error occurred during login. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminToken = localStorage.getItem('adminAuthToken');
    const logoutTime = localStorage.getItem('logoutTime');

    if(adminToken && logoutTime) {
      const currentTime = new Date().getTime();
      if (currentTime >= logoutTime) {
        // Token has expired, perform logout
        localStorage.removeItem('adminAuthToken');
        localStorage.removeItem('logoutTime');
        navigate('/');
    } else {
        navigate('/admin/dashboard');
    }
    }
  },[navigate])

  return (
    <div className="flex flex-col h-screen items-center justify-center lg:bg-custom-pattern bg-cover bg-center lg:bg-[#F7F7F7]">
      <Toaster position="top-center" />
      {/* Logo Section */}
      <div className="mb-9">
        <img src={logo} alt="Logo" className="adminlogo"/>
      </div>

      {/* Login Card Section */}
      <div className="bg-white rounded-lg shadow-lg mains">
        <h2 className="mb-7 lg:ml-12 text-[#25282B] loginheading">Admin Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="text-[#898989] labels">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="rounded-lg border border-[#E9E9E9] mt-1 email outline-none inputs"
            />
          </div>

          <div className="relative">
            <label className="text-[#898989] labels">Password</label>
            <div className="relative w-full">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="rounded-lg w-full border border-[#E9E9E9] mt-1 outline-none inputs"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <IoEyeOff size={20} className="text-[#898989]" />
                ) : (
                  <IoEye size={20} className="text-[#898989]" />
                )}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-sm text-[#25282B]">
            <Link to="/forgotpassword"
              className="hover:underline forgotpassword"
            >
              Forgot password?
            </Link>
            <a href="" className="hover:underline adminlogin">
              Admin Login
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#254396] text-white py-2 px-4 rounded-lg my-6 hover:bg-[#1d3476] transition signin"
            disabled={loading}
          >
            {loading ? "Signing In..." : <p>Sign In</p>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
