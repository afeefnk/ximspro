import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import "./editcompany.css";
import { BASE_URL } from "../../Utils/Config";
import uploadIcon from "../../assets/images/Companies/choose file.svg";

const EditCompany = () => {
  const [fileName, setFileName] = useState("Choose File");
  const [companies, setCompanies] = useState([]);
  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const [formDataState, setFormDataState] = useState({
    company_name: "",
    company_admin_name: "",
    email_address: "",
    phone_no1: "",
    phone_no2: "",
    user_id: "",
    password: "",
    permissions: [],
    company_logo: "",
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
        permissions: companyData.permissions ? companyData.permissions : [],
        company_logo: companyData.company_logo || "",
      });
  
      // Update the file name to the actual logo file name or "Choose File" if no logo
      if (companyData.company_logo) {
        setFileName(truncateFileName(companyData.company_logo));
        setCompanyLogoPreview(companyData.company_logo); // Set logo preview
      } else {
        setFileName("Choose File");
        setCompanyLogoPreview(null); // Reset preview if no logo
      }
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
    setFileName(file ? truncateFileName(file.name) : "No file chosen");  // Show the actual file name
    setFormDataState((prevState) => ({
      ...prevState,
      company_logo: file,
    }));


    // Show the logo preview
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setCompanyLogoPreview(fileReader.result);
    };
    if (file) {
      fileReader.readAsDataURL(file); // Convert image file to base64
    } else {
      setCompanyLogoPreview(null); // Reset if no file is selected
    }
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
  
    const formData = new FormData();
    formData.append("company_name", formDataState.company_name);
    formData.append("company_admin_name", formDataState.company_admin_name);
    formData.append("email_address", formDataState.email_address);
    formData.append("password", formDataState.password);
    formData.append("phone_no1", formDataState.phone_no1);
    formData.append("phone_no2", formDataState.phone_no2);
    formData.append("user_id", formDataState.user_id);
  
    // Convert permissions to expected format
    formData.append(
      "permissions",
      JSON.stringify(formDataState.permissions.map((perm) => parseInt(perm, 10)))
    );
  
    // Add company logo only if it is a valid file
    if (formDataState.company_logo instanceof File) {
      formData.append("company_logo", formDataState.company_logo);
    }
  
    try {
      const response = await axios.put(
        `${BASE_URL}/accounts/companies/update/${companyId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Company updated successfully!");
  
        // Assuming `companies` is your list of companies
        setCompanies((prevCompanies) => 
          prevCompanies.map((company) =>
            company.id === companyId
              ? { ...company, ...formDataState }  // Update the specific company with new data
              : company
          )
        );
  
        // Delay navigation to allow the toast to display
        setTimeout(() => {
          navigate("/admin/companies");
        }, 1500); // 1.5-second delay
      }
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error("Failed to update company. Please try again.");
    }
  };
  
  const truncateFileName = (name, maxLength = 20) => {
    // If name is a URL (starts with http:// or https://), extract the file name
    const fileName = name.includes("://") ? name.split("/").pop() : name;
  
    // Truncate if necessary
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.split(".").pop();
    const baseName = fileName.substring(0, maxLength - extension.length - 5);
    return `${baseName}...${extension}`;
  };
  
  
  return (
    <div className="flex flex-col md:flex-row w-full border rounded-lg min-h-screen gap-10 maineditcmpy">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Form Section */}
      <div className="w-full md:w-2/3 bg-white rounded-lg p-5">
        <h2 className="text-[#25282B] editcmpnyhead">Edit Company</h2>

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
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none editcmpyinput"
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
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none editcmpyinput"
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
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none editcmpyinput"
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
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none editcmpyinput"
                />
              </div>
              <div>
                <label htmlFor="phone_no2">Phone No 2</label>
                <input
                  type="tel"
                  id="phone_no2"
                  value={formDataState.phone_no2}
                  onChange={handleInputChange}
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none editcmpyinput"
                />
              </div>
              <div>
                <label htmlFor="company_logo">Company Logo</label>
                <input
                  type="file"
                  id="company_logo"
                  className="hidden editcmpyinput"
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

                {/* Display the logo preview below */}
                {companyLogoPreview && (
                  <div className="mt-4">
                    <img
                      src={companyLogoPreview}
                      alt="Company Logo Preview"
                      className="w-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-[#677487] mb-2">Permissions</h3>
            <div className="flex flex-wrap gap-4">
              {permissionList.map((permission) => (
                <label
                  key={permission.id}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox border border-[#E9E9E9]"
                    value={permission.id}
                    checked={formDataState.permissions.includes(
                      permission.id.toString()
                    )}
                    onChange={handlePermissionChange}
                  />
                  <span className="ml-2">{permission.name}</span>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompany;
