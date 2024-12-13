import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import "./addcompany.css";
import addcompany from "../../assets/images/Companies/addcompanyimg.svg";
import uploadIcon from "../../assets/images/Companies/choose file.svg";

const AddCompany = () => {
  const [fileName, setFileName] = useState("Choose File");

  // Helper function to truncate file names
  const truncateFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop();
    const baseName = name.substring(0, maxLength - extension.length - 5); // Leave space for "..." and extension
    return `${baseName}...${extension}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? truncateFileName(file.name) : "No file chosen");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form validation or API submission
    const isValid = Math.random() > 0.5; // Randomly simulate success/failure

    if (isValid) {
      toast.success("Company added successfully!");
    } else {
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
                <label  htmlFor="companyName">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label  htmlFor="adminName">
                  Company Admin Name *
                </label>
                <input
                  type="text"
                  id="adminName"
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                  required
                />
              </div>
              <div>
                <label  htmlFor="phone1">
                  Phone No 1
                </label>
                <input
                  type="tel"
                  id="phone1"
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="phone2">
                  Phone No 2
                </label>
                <input
                  type="tel"
                  id="phone2"
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="logo">
                  Company Logo
                </label>
                <input
                  type="file"
                  id="logo"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="logo"
                  className="flex items-center justify-between border border-[#E9E9E9] text-sm cursor-pointer rounded px-3 w-1/2 h-11"
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
                <label htmlFor="userId">
                  User ID
                </label>
                <input
                  type="text"
                  id="userId"
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full border border-[#E9E9E9] text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-[#677487] mb-2">Permissions</h3>
            <div className="flex flex-wrap gap-4">
              {[
                "Quality",
                "Environment",
                "Health and Safety",
                "Energy",
                "IMS",
              ].map((permission) => (
                <label
                  key={permission}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox border border-[#E9E9E9]"
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
