import React, { useState, useEffect } from "react";
import { useTheme } from "../../ThemeContext";
import "./navbar.css";
import bell from "../../assets/images/Navbar/bell.svg";
import setting from "../../assets/images/Navbar/settings.svg";
import profile from "../../assets/images/Navbar/profile.svg";
import logo from "../../assets/images/logo.svg";
import dashboardicon from "../../assets/images/Sidebar/dashboard.svg";
import { useNavigate } from "react-router-dom";

// Import SVG as regular images
import sunIcon from "../../assets/images/Navbar/sun.svg";
import moonIcon from "../../assets/images/Navbar/moon.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthToken");
    navigate("/");
  };

  const handleChangePassword = () => {
    console.log("Change Password clicked");
  };

  // Trigger rotation on theme change
  const handleThemeToggle = () => {
    setIsRotating(true);
    toggleTheme();
  };

  // Reset rotation animation after it's completed
  useEffect(() => {
    if (isRotating) {
      const timer = setTimeout(() => {
        setIsRotating(false);
      }, 600); // Match the duration of the animation
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isRotating]);

  return (
    <div
      className={`navbar h-20 flex items-center justify-between relative transition-all duration-300 ${theme}`}
    >
      {/* Left Section */}
      <div className="flex flex-col -space-y-1">
        <span className="text-[#677487] span1">Welcome Back,</span>
        <span className={`span2 ${theme === "dark" ? "dark" : "light"} duration-100`}>
          Logged in as Super Admin
        </span>
        <img src={logo} alt="" className="navlogo" />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 icons justify-end">
        <button
          aria-label="Toggle Theme"
          className={`icon-button rotate outline-none toggle-theme-btn ${theme === "dark" ? "dark" : "light"}`}
          onClick={handleThemeToggle}
        >
          {/* Conditionally render Sun or Moon based on theme */}
          <img
            src={theme === "dark" ? sunIcon : moonIcon}
            alt="Theme Icon"
            className={`theme-icon ${isRotating ? "rotate" : ""}`} // Apply rotate class conditionally
          />
        </button>
        <button aria-label="Notifications" className={`icon-button bellicon ${theme === "dark" ? "dark" : "light"} duration-200`}>
          <img src={bell} alt="bell icon" className="bellimg" />
        </button>
        <button aria-label="Settings" className={`icon-button settingicon ${theme === "dark" ? "dark" : "light"} duration-200`}>
          <img src={setting} alt="setting icon" className="settingimg"/>
        </button>
        <div className={`divider ${theme === "dark" ? "dark" : "light"} duration-100`} />

        <div className="relative">
          <div
            className="flex items-center lg:space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src={profile}
              alt="Profile Avatar"
              className="w-10 h-10 rounded-full profileicon"
            />
            <button aria-label="Dashboard" className="dashboardicon">
              <img
                src={dashboardicon}
                alt="dashboard icon"
                className="imgdashicon"
              />
            </button>

            <div className="lg:flex flex-col -space-y-1 adminname navbaritem">
              <span className={`span3 ${theme === "dark" ? "dark" : "light"} duration-100`}>Hello, super admin</span>
              <span className="text-[#677487] span4">example@gmail.com</span>
            </div>
          </div>

          <div
            className={`dropdown-menu absolute right-0 mt-2 bg-white border border-[#E9E9E9] shadow-md rounded-lg w-48 ${
              isDropdownOpen ? "show" : ""
            }`}
          >
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
