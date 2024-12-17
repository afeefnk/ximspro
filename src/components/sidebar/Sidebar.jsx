import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import dashboard from "../../assets/images/Sidebar/dashboard.svg";
import company from "../../assets/images/Sidebar/company.svg";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(() => {
    // Retrieve the saved active item from localStorage or default to "dashboard"
    return localStorage.getItem("activeItem") || "dashboard";
  });

  useEffect(() => {
    // Update activeItem state based on the current path
    const currentPath = location.pathname;
    if (currentPath.includes("dashboard")) {
      setActiveItem("dashboard");
    } else if (currentPath.includes("companies")) {
      setActiveItem("companies");
    }
  }, [location]);

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    localStorage.setItem("activeItem", item); // Save the active item in localStorage
    navigate(path);
  };

  return (
    <div className="h-screen bg-[#F7F7F7] border-r border-[#E9E9E9] flex flex-col items-center transition-all duration-300 mainsidebar">
      {/* Logo */}
      <img src={logo} alt="XIMSpro Logo" className="logo mb-8" />

      {/* Navigation */}
      <nav className="lg:flex lg:flex-col items-center lg:space-y-3 relative lg:top-20 sidebartab">
        {/* Dashboard */}
        <div
          onClick={() => handleItemClick("dashboard", "/admin/dashboard")}
          className={`flex flex-col items-center cursor-pointer item ${
            activeItem === "dashboard" ? "active" : ""
          }`}
        >
          <div className="flex items-center justify-center">
            <img
              src={dashboard}
              alt="Dashboard icon"
              className="w-5 h-5 sideicon"
            />
          </div>
          <span className="mt-1 spans">Dashboard</span>
        </div>

        {/* Companies */}
        <div
          onClick={() => handleItemClick("companies", "/admin/companies")}
          className={`flex flex-col items-center cursor-pointer item ${
            activeItem === "companies" ? "active" : ""
          }`}
        >
          <div className="flex items-center justify-center">
            <img
              src={company}
              alt="Company icon"
              className="w-5 h-5 sideicon"
            />
          </div>
          <span className="mt-1 spans">Companies</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;