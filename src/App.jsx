import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Password from "./pages/ForgotPassword/Password";

// import Layout from "./pages/Layout";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Companies from "./pages/Companies/Companies";    
// import AddCompany from "./pages/AddCompany/AddCompany"; 
// import ViewCompany from "./pages/ViewCompany/ViewCompany";
// import EditCompany from "./pages/EditCompany/EditCompany";

const App = () => {
  return (
    <div className="App">
      {/* Use BrowserRouter here */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/forgotpassword" element={<Password />} />

          {/* Uncomment these routes if needed */}
          {/* 
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="companies" element={<Companies />} />
            <Route path="addcompany" element={<AddCompany />} />
            <Route path="viewcompany/:companyId" element={<ViewCompany />} /> 
            <Route path="editcompany/:companyId" element={<EditCompany />} /> 
          </Route> 
          */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
