import React, { useState } from 'react';
import "./navbar.css";
import bell from '../../assets/images/Navbar/bell.svg';
import setting from '../../assets/images/Navbar/settings.svg';
import profile from '../../assets/images/Navbar/admin.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout =()=> {
    localStorage.removeItem("adminAuthToken");
    navigate('/');
  }

  const handleChangePassword = () => {
    console.log("Change Password clicked");
    // Navigate to change password screen or modal
  };


  return (
    <div className="navbar h-24 border-b border-[#E9E9E9] flex items-center justify-between px-4 lg:px-5 shadow-sm relative">
      {/* Left Section */}
      <div className="flex flex-col -space-y-1">
        <span className="text-[#677487] span1">Welcome To,</span>
        <span className="text-[#25282B] span2">Logged in as Super Admin</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 icons justify-end">
        {/* Notification Icon */}
        <button aria-label="Notifications" className="icon-button duration-300 hover:scale-105">
          <img src={bell} alt="bell icon" />
        </button>

        {/* Settings Icon */}
        <button aria-label="Settings" className="icon-button duration-300 hover:scale-105">
          <img src={setting} alt="setting icon" />
        </button>

        {/* Vertical Divider */}
        <div className="divider" />

        {/* User Profile */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src={profile}
              alt="Profile Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="hidden lg:flex flex-col -space-y-1">
              <span className="text-[#25282B] span3">Hello, super admin</span>
              <span className="text-[#677487] span4">example@gmail.com</span>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-[#E9E9E9] shadow-md rounded-lg w-48">
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer text-sm text-[#25282B]"
                  onClick={handleChangePassword}
                >
                  Change Password
                </li>
                <li
                  className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer text-sm text-[#25282B]"
                  onClick={handleLogout}
                >

                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
