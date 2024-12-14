import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import "./viewcompany.css";
import { BASE_URL } from "../../Utils/Config";
import uploadIcon from "../../assets/images/Companies/choose file.svg";

const ViewCompany = () => {
  const [fileName, setFileName] = useState("Choose File");
  const [formDataState, setFormDataState] = useState({
    company_name: "",
    company_admin_name: "",
    email_address: "",
    phone_no1: "",
    phone_no2: "",
    user_id: "",
    password: "",
    permissions: [], // Permissions should be an array
    company_logo: "", // To handle logo URL or file
  });
  const [permissionList, setPermissionList] = useState([]);
  const { companyId } = useParams();
  const navigate = useNavigate();

  // Fetch permissions from backend
  const fetchPermission = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/accounts/permissions/`);
      const permissions = response.data;
      if (Array.isArray(permissions)) {
        setPermissionList(permissions);
      } else {
        setPermissionList([]);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast.error("Failed to fetch permissions.");
    }
  };

  // Fetch existing company data when the component mounts
  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/accounts/companies/${companyId}/`
      );
      const companyData = response.data[0]; // Assuming data is in an array
      setFormDataState({
        company_name: companyData.company_name || "",
        company_admin_name: companyData.company_admin_name || "",
        email_address: companyData.email_address || "",
        phone_no1: companyData.phone_no1 || "",
        phone_no2: companyData.phone_no2 || "",
        user_id: companyData.user_id || "",
        password: companyData.password || "",
        permissions: companyData.permissions ? companyData.permissions : [], // Permissions as array
        company_logo: companyData.company_logo || "", // Set logo URL
      });

      setFileName(companyData.company_logo ? "Logo uploaded" : "Choose File");
      console.log("kkkkkkkkkkk", response.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast.error("Failed to fetch company data.");
    }
  };

  useEffect(() => {
    fetchPermission();
    fetchCompanyData();
  }, [companyId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormDataState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? truncateFileName(file.name) : "No file chosen");
    setFormDataState((prevState) => ({
      ...prevState,
      company_logo: file,
    }));
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormDataState((prevState) => {
      const updatedPermissions = checked
        ? [...prevState.permissions, value] // Add permission if checked
        : prevState.permissions.filter((perm) => perm !== value); // Remove permission if unchecked
      return { ...prevState, permissions: updatedPermissions };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data using FormData
    const formData = new FormData();
    formData.append("company_name", formDataState.company_name);
    formData.append("company_admin_name", formDataState.company_admin_name);
    formData.append("email_address", formDataState.email_address);
    formData.append("password", formDataState.password);
    formData.append("phone_no1", formDataState.phone_no1);
    formData.append("phone_no2", formDataState.phone_no2);
    formData.append("user_id", formDataState.user_id);
    formData.append("permissions", formDataState.permissions.join(","));
    console.log("companyData.permissions:", formDataState.permissions);

    // Append the company logo file (if selected)
    if (formDataState.company_logo) {
      formData.append("company_logo", formDataState.company_logo);
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/accounts/companies/update/${companyId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Automatically handled by FormData
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Company updated successfully!");
        navigate("/admin/companies"); // Redirect to company list or dashboard
      }
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error("Failed to update company. Please try again.");
    }
  };

  const truncateFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop();
    const baseName = name.substring(0, maxLength - extension.length - 5);
    return `${baseName}...${extension}`;
  };

  return (
    <div className="flex flex-col md:flex-row w-full border rounded-lg min-h-screen gap-10">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Form Section */}
      <div className="w-full md:w-2/3 bg-white rounded-lg p-5">
        <h2 className="text-[#25282B]">View Company</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Company Information */}
          <div>
            <h3 className="text-[#677487] head">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company_name">Company Name *</label>
                <input
                  type="text"
                  id="company_name"
                  value={formDataState.company_name}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="company_admin_name">Company Admin Name *</label>
                <input
                  type="text"
                  id="company_admin_name"
                  value={formDataState.company_admin_name}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email_address">Email Address *</label>
                <input
                  type="email"
                  id="email_address"
                  value={formDataState.email_address}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone_no1">Phone No 1</label>
                <input
                  type="tel"
                  id="phone_no1"
                  value={formDataState.phone_no1}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="phone_no2">Phone No 2</label>
                <input
                  type="tel"
                  id="phone_no2"
                  value={formDataState.phone_no2}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="company_logo">Company Logo</label>
                <input
                  type="file"
                  id="company_logo"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="company_logo"
                  className="flex items-center justify-between border border-[#E9E9E9] text-sm cursor-pointer rounded px-3 w-1/2 h-11 mt-2"
                >
                  <p
                    className={`filename ${
                      fileName === "Choose File" ||
                      fileName === "No file chosen"
                        ? "text-[#D2D2D2]"
                        : "text-black"
                    }`}
                  >
                    {fileName}
                  </p>
                  <img src={uploadIcon} alt="Upload" />
                </label>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div>
            <h3 className="text-[#677487]">Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div>
                <label htmlFor="user_id">User ID</label>
                <input
                  type="text"
                  id="user_id"
                  value={formDataState.user_id}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                />
              </div>
              {/* <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formDataState.password}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                />
              </div> */}
            </div>
          </div>

          {/* Permissions */}
          <div>
  <h3 className="text-[#677487] mb-2">Permissions</h3>
  <div className="flex flex-wrap gap-4">
    {permissionList.map((permission) => {
    
      console.log("Permission: ", permission);
      console.log("Selected Permissions: ", formDataState.permissions);
      console.log("Is Permission Checked: ", formDataState.permissions);
      console.log("Permission ID:", permission.id, "Permissions:", formDataState.permissions);

      return (
        <label key={permission.id} className="inline-flex items-center cursor-pointer">
         <input
  type="checkbox"
  className="form-checkbox border border-[#E9E9E9]"
  value={permission.id}
  checked={formDataState.permissions.includes(permission.id.toString())}

  onChange={handlePermissionChange}
/>

          <span className="ml-2">{permission.name}</span>
        </label>
      );
    })}
  </div>
</div>

        
          {/* <div className="flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#1E4DA1] text-white px-7 py-2 rounded duration-200 hover:bg-[#18366b] cursor-pointer"
            >
              Update
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ViewCompany;
