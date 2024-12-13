import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import AdminLogin from "./pages/Admin Login/AdminLogin";
import Password from "./pages/Forgot Password/Password";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Companies from "./pages/Companies/Companies";    
import AddCompany from "./pages/Add Company/addCompany";  

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<AdminLogin />} />
          <Route path="forgotpassword" element={<Password />} />
        </Route>

        <Route path="/admin" element={<Layout/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="companies" element={<Companies/>}/>
          <Route path="addcompany" element={<AddCompany/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
