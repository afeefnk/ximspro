import React from 'react';
import "./navbar.css";
import bell from '../../assets/images/Navbar/bell.svg';
import setting from '../../assets/images/Navbar/settings.svg';
import profile from '../../assets/images/Navbar/profile.svg';

const Navbar = () => {
  return (
    <div className="navbar h-24 border-b border-[#E9E9E9] flex items-center justify-between px-4 lg:px-5 shadow-sm">
      {/* Left Section */}
      <div className="flex flex-col -space-y-1">
        <span className="text-[#677487] span1">Welcome Back,</span>
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
        <div className="flex items-center space-x-2">
          <img
            src={profile}
            alt="Profile Avatar"
            className="w-10 h-10 rounded-full cursor-pointer duration-300 hover:scale-105"
          />
          <div className="hidden lg:flex flex-col -space-y-1">
            <span className="text-[#25282B] span3">Hello, alimuhammadtn</span>
            <span className="text-[#677487] span4">example@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
