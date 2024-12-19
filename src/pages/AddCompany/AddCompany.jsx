import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import "./addcompany.css";
import { BASE_URL } from "../../Utils/Config";
import illustrate from "../../assets/images/AddCompany/Clip path group-cropped.svg";
import group from "../../assets/images/AddCompany/bottompic.svg";
import uploadIcon from "../../assets/images/Companies/choose file.svg";

const AddCompany = () => {
  const [fileName, setFileName] = useState("Choose File");
  const [formDataState, setFormDataState] = useState({
    company_name: "",
    company_admin_name: "",
    email_address: "",
    phone_no1: "",
    phone_no2: "",
    user_id: "",
    password: "",
    permissions: [],
    company_logo: null,
  });
  const [permissionList, setPermissionList] = useState([]);
  const [permission, setPermission] = useState([]);

  const fetchPermission = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/accounts/permissions/`);
      const permissions = response.data;

      if (Array.isArray(permissions)) {
        setPermissionList(permissions); // Update permissionList state
        console.log("Fetched Permissions:", permissions); // Log permissions to the console
      } else {
        console.warn("Unexpected data format:", permissions);
        setPermissionList([]);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast.error("Failed to fetch permissions.");
    }
  };

  useEffect(() => {
    fetchPermission(); // Fetch permissions when the component mounts
  }, []);

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

  const handlePermissionChange = (e, permissionId) => {
    const { checked } = e.target;

    setFormDataState((prevState) => {
      let updatedPermissions;

      if (checked) {
        updatedPermissions = [...prevState.permissions, permissionId];
      } else {
        updatedPermissions = prevState.permissions.filter(
          (id) => id !== permissionId
        );
      }

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

    // If the backend expects JSON array, use JSON.stringify
    // formData.append('permissions', JSON.stringify(formDataState.permissions));

    // Append the company logo file (if selected)
    if (formDataState.company_logo) {
      formData.append("company_logo", formDataState.company_logo);
    }

    // Log the FormData content to the console (it's not directly visible in the console, so we need to log it manually)
    console.log("FormData content:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      // Log the request config, URL, and headers
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Automatically handled by FormData
        },
      };
      console.log("Making request to:", `${BASE_URL}/accounts/create-company/`);
      console.log("Request headers:", config.headers);

      const response = await axios.post(
        `${BASE_URL}/accounts/create-company/`,
        formData,
        config
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Company added successfully!");
        // Reset form state if necessary
        setFormDataState({
          company_name: "",
          company_admin_name: "",
          email_address: "",
          phone_no1: "",
          phone_no2: "",
          user_id: "",
          password: "",
          // permissions: [],     company_logo: null,
        });
        setFileName("Choose File");
      }
    } catch (error) {
      console.error("Error adding company:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      toast.error("Failed to add company. Please try again.");
    }
  };

  const truncateFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop();
    const baseName = name.substring(0, maxLength - extension.length - 5);
    return `${baseName}...${extension}`;
  };

  return (
    <div className="flex flex-col md:flex-row w-full border rounded-lg addmaincmpy">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Form Section */}
      <div className="w-full md:w-2/3 bg-white rounded-lg p-5">
        <h2 className="text-[#25282B] addcmpnyhead">Add New Company</h2>

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
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none addcmyinputs"
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
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none addcmyinputs"
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
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none addcmyinputs"
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
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none addcmyinputs"
                />
              </div>
              <div>
                <label htmlFor="phone_no2">Phone No 2</label>
                <input
                  type="tel"
                  id="phone_no2"
                  value={formDataState.phone_no2}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none addcmyinputs"
                />
              </div>
              <div>
                <label htmlFor="company_logo">Company Logo</label>
                <input
                  type="file"
                  id="company_logo"
                  className="hidden addcmyinputs"
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
            <h3 className="text-[#677487] credentials">Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div>
                <label htmlFor="user_id">User ID</label>
                <input
                  type="text"
                  id="user_id"
                  value={formDataState.user_id}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none addcmyinputs"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formDataState.password}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none addcmyinputs"
                />
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-[#677487] mb-2">Permissions</h3>
            <div className="flex flex-wrap gap-6">
              {permissionList.map((permission) => (
                <label
                  key={permission.id}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox border border-[#E9E9E9] addcmyinputs"
                    value={permission.id}
                    onChange={(e) => handlePermissionChange(e, permission.id)}
                  />
                  <span className="ml-2 capitalize">{permission.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#1E4DA1] text-white px-7 py-2 rounded duration-200 hover:bg-[#18366b] cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Right Illustration Section */}
      <div className="flex md:w-1/3 justify-end illustrateimg">
        <div className="business-container">
          <img src={illustrate} alt="Illustration" className="background-img" />
          <p className="business-text">
            Want more? <br /> Increase your business
          </p>
          <img src={group} alt="Group" className="group-img" />
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
