import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./viewcompany.css";
import { BASE_URL } from "../../Utils/Config";

const ViewCompany = () => {
  const [formDataState, setFormDataState] = useState({
    company_name: "",
    company_admin_name: "",
    email_address: "",
    phone_no1: "",
    phone_no2: "",
    permissions: [],
    company_logo: "",
  });
  const [permissionList, setPermissionList] = useState([]);
  const { companyId } = useParams();

  // Fetch permissions from backend
  const fetchPermission = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/accounts/permissions/`);
      setPermissionList(response.data || []);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast.error("Failed to fetch permissions.");
    }
  };

  // Fetch existing company data when the component mounts
  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/accounts/companies/${companyId}/`);
      const companyData = response.data[0];

      setFormDataState({
        company_name: companyData.company_name || "",
        company_admin_name: companyData.company_admin_name || "",
        email_address: companyData.email_address || "",
        phone_no1: companyData.phone_no1 || "",
        phone_no2: companyData.phone_no2 || "",
        permissions: companyData.permissions ? companyData.permissions.map(String) : [],
        company_logo: companyData.company_logo || "",
      });
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast.error("Failed to fetch company data.");
    }
  };

  useEffect(() => {
    fetchPermission();
    fetchCompanyData();
  }, [companyId]);

  return (
    <div className="view-company-container">
      
      <h2 className="headercmpy">Company Information</h2>

      <div className="space-y-6">
        {/* Company Information */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="viewcpmylabels">Company Name</label>
              <p className="viewdata">{formDataState.company_name}</p>
            </div>
            <div>
              <label className="viewcpmylabels">Company Admin Name</label>
              <p className="viewdata">{formDataState.company_admin_name}</p>
            </div>
            <div>
              <label className="viewcpmylabels">Email Address</label>
              <p className="viewdata">{formDataState.email_address}</p>
            </div>
            <div>
              <label className="viewcpmylabels">Phone No 1</label>
              <p className="viewdata">{formDataState.phone_no1}</p>
            </div>
            <div>
              <label className="viewcpmylabels">Phone No 2</label>
              <p className="viewdata">{formDataState.phone_no2}</p>
            </div>
            <div>
              <label className="viewcpmylabels">Company Logo</label>
              {formDataState.company_logo ? (
                <img
                  src={formDataState.company_logo}
                  alt="Company Logo"
                  className="company-logos"
                />
              ) : (
                <p>No logo available</p>
              )}
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div>
          <h3 className="text-[#677487]">Permissions</h3>
          <ul className="lists">
            {formDataState.permissions.map((permissionId) => {
              const permission = permissionList.find(
                (perm) => perm.id.toString() === permissionId
              );
              return permission ? <li key={permission.id}>{permission.name}</li> : null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewCompany;
