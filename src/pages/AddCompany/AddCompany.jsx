import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import "./addcompany.css";
import { BASE_URL } from "../../Utils/Config";
import addcompany from "../../assets/images/Companies/addcompanyimg.svg";
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
        ? [...prevState.permissions, value]
        : prevState.permissions.filter((perm) => perm !== value);
      return { ...prevState, permissions: updatedPermissions };
    });
  };

  const truncateFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop();
    const baseName = name.substring(0, maxLength - extension.length - 5);
    return `${baseName}...${extension}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(formDataState).forEach((key) => {
      if (key === "permissions") {
        formDataState[key].forEach((permission) => {
          formData.append("permissions[]", permission);
        });
      } else if (key === "company_logo" && formDataState[key]) {
        formData.append("company_logo", formDataState[key]);
      } else {
        formData.append(key, formDataState[key]);
      }
    });

    try {
      const response = awaitaxios.post(`${BASE_URL}/accounts/create-company/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Company added successfully!");
        setFormDataState({
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
        setFileName("Choose File");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add company. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full border rounded-lg min-h-screen gap-10">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Form Section */}
      <div className="w-full md:w-2/3 bg-white rounded-lg p-5">
        <h2 className="text-[#25282B]">Add New Company</h2>

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
                      fileName === "Choose File" || fileName === "No file chosen"
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
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formDataState.password}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-[#677487] mb-2">Permissions</h3>
            <div className="flex flex-wrap gap-4">
              {["Quality", "Environment", "Health and Safety", "Energy", "IMS"].map((permission) => (
                <label
                  key={permission}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox border border-[#E9E9E9]"
                    value={permission}
                    onChange={handlePermissionChange}
                  />
                  <span className="ml-2">{permission}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#1E4DA1] text-white px-7 py-2 rounded duration-200 hover:bg-[#18366b]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Right Illustration Section */}
      <div className="hidden md:flex md:w-1/3 justify-end">
        <img
          src={addcompany}
          alt="Increase your business"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AddCompany;
