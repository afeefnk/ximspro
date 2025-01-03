import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import dashboard from "../../assets/images/Sidebar/dashboard.svg";
import company from "../../assets/images/Sidebar/company.svg";
import "./sidebar.css";
import { useTheme } from "../../ThemeContext";

const Sidebar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(() => {
    return localStorage.getItem("activeItem") || "dashboard";
  });

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes("dashboard")) {
      setActiveItem("dashboard");
    } else if (currentPath.includes("companies")) {
      setActiveItem("companies");
    }
  }, [location]);

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    localStorage.setItem("activeItem", item);
    navigate(path);
  };

  return (
    <div className={`h-screen border-r flex flex-col items-center transition-all duration-300 mainsidebar ${theme === "dark" ? "dark" : "light"}`}>
      {/* Logo */}
      <img src={logo} alt="XIMSpro Logo" className="logo mb-8" />

      {/* Navigation */}
      <nav className="lg:flex lg:flex-col items-center lg:space-y-3 relative lg:top-16 sidebartab">
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