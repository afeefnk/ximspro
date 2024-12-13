import React, { useState } from "react";
import view from "../../assets/images/Companies/view.svg";
import edit from "../../assets/images/Companies/edit.svg";
import deletes from "../../assets/images/Companies/delete.svg";
import permission from "../../assets/images/Companies/permission.svg";
import com_logo from "../../assets/images/Companies/image 1.svg";
import searchIcon from "../../assets/images/Companies/search.svg";
import csvicon from "../../assets/images/Companies/csv icon.svg";
import addicon from "../../assets/images/Companies/add.svg";
import "./companies.css";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      logo: com_logo,
      name: "International Development Company For Oil Equipment",
      adminName: "Gisco Administrator",
      email: "khalid.oumeijoud@global.psm.com",
      phone: "0502276924",
      status: "Active",
    },
    {
      id: 2,
      logo: com_logo,
      name: "International Development Company For Oil Equipment",
      adminName: "Gisco Administrator",
      email: "khalid.oumeijoud@global.psm.com",
      phone: "0502276924",
      status: "Blocked",
    },
    {
      id: 3,
      logo: com_logo,
      name: "International Development Company For Oil Equipment",
      adminName: "Gisco Administrator",
      email: "khalid.oumeijoud@global.psm.com",
      phone: "0502276924",
      status: "Active",
    },
    {
      id: 4,
      logo: com_logo,
      name: "International Development Company For Oil Equipment",
      adminName: "Gisco Administrator",
      email: "khalid.oumeijoud@global.psm.com",
      phone: "0502276924",
      status: "Blocked",
    },
    {
      id: 5,
      logo: com_logo,
      name: "International Development Company For Oil Equipment",
      adminName: "Gisco Administrator",
      email: "khalid.oumeijoud@global.psm.com",
      phone: "0502276924",
      status: "Active",
    },
    // Additional companies...
  ]);

  const navigate = useNavigate();

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter companies based on search query
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.phone.includes(searchQuery)
  );

  // Calculate indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleBlockStatus = (id) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === id
          ? {
              ...company,
              status: company.status === "Active" ? "Blocked" : "Active",
            }
          : company
      )
    );
  };

  const handleAddCompany = () => {
    navigate("/admin/addcompany")
  }


  const handleExportToCSV = () => {
    const csvHeaders = ["ID", "Name", "Admin Name", "Email", "Phone", "Status"];
    const csvRows = paginatedCompanies.map((company) => [
      company.id,
      company.name,
      company.adminName,
      company.email,
      company.phone,
      company.status,
    ]);

    // Combine headers and rows into a single CSV string
    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "companies.csv";
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL
  };


  

  return (
    <div>
      <div className="border rounded-lg main">
        <h1 className="text-[#25282B]">Companies</h1>
        <div className="flex gap-3 p-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-[#E9E9E9] rounded px-3 py-2 pr-10 focus:outline-none w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img
              src={searchIcon}
              alt="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
          </div>
          <button className="bg-[#677487] rounded duration-200 hover:bg-[#4f5763] text-white topbtn" onClick={handleExportToCSV}>
            <img src={csvicon} alt="Export" className="w-5 h-5" />
            Export to CSV
          </button>
          <button className="bg-[#1BC194] duration-200 text-white rounded hover:bg-[#21ab86] topbtn" onClick={handleAddCompany}>
            <img src={addicon} alt="Add" className="w-4 h-4" />
            Add New Company
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="companieslist">
            <thead className="border-t border-b border-[#E9E9E9] listheads">
              <tr className="bg-[#F7F7F7] border-b">
                <th className=" companiesthead">Sl</th>
                <th className="text-start p-0 companiesthead">Logo</th>
                <th className="text-start companiesthead">Company Name</th>
                <th className="text-start companiesthead">Admin Name</th>
                <th className="text-start companiesthead">Email</th>
                <th className="text-start companiesthead">Phone</th>
                <th className="text-start companiesthead">Status</th>
                <th className=" companiesthead">View</th>
                <th className=" companiesthead">Edit</th>
                <th className=" companiesthead">Block</th>
                <th className=" companiesthead">Delete</th>
                <th className=" companiesthead">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCompanies.map((company, index) => (
                <tr key={company.id} className="hover:bg-gray-100 cursor-pointer">
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td className="p-0">
                    <img src={company.logo} alt="Logo" />
                  </td>
                  <td>{company.name}</td>
                  <td>{company.adminName}</td>
                  <td>{company.email}</td>
                  <td>{company.phone}</td>
                  <td className="w-[90px]">
                    <span
                      className={`p-1 rounded ${
                        company.status === "Active"
                          ? "bg-green-100 text-[#24D6A5]"
                          : "bg-violet-200 text-[#8239BC]"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td className="justify-items-center">
                    <img
                      src={view}
                      alt="View"
                      className="cursor-pointer duration-300 hover:scale-105"
                    />
                  </td>
                  <td className="justify-items-center">
                    <img
                      src={edit}
                      alt="Edit"
                      className="cursor-pointer duration-300 hover:scale-105"
                    />
                  </td>
                  <td className="justify-items-center">
                    <button
                      className={` items-center rounded-full p-1 toggle ${
                        company.status === "Blocked"
                          ? "bg-[#F36643]"
                          : "bg-[#1BC194]"
                      }`}
                      onClick={() => toggleBlockStatus(company.id)}
                    >
                      <div
                        className={`bg-white  rounded-full transform transition-transform bar ${
                          company.status === "Blocked"
                            ? "translate-x-2"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="justify-items-center">
                    <img
                      src={deletes}
                      alt="Delete"
                      className="cursor-pointer duration-300 hover:scale-105"
                    />
                  </td>
                  <td className="justify-items-center">
                    <img src={permission} alt="Permissions" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-1">
        <p className="pagination">
          Showing{" "}
          <span className="text-[#1E4DA1]">
            {itemsPerPage * (currentPage - 1) + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredCompanies.length)} of{" "}
            {filteredCompanies.length}
          </span>{" "}
          entries
        </p>
        <div className="flex">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-0 py-2 ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed font-extrabold"
              : "text-[#25282B] font-extrabold"
          }`}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-2 py-2 ${
              currentPage === i + 1
                ? "border-[#1E4DA1] text-[#1E4DA1] underline pageno"
                : "border-gray-300 text-[#898989] pageno"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-0 py-2 ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed font-extrabold"
              : "text-[#25282B] font-extrabold rounded-lg"
          }`}
        >
          &gt;
        </button>
        </div>
      </div>
    </div>
  );
};

export default Companies;
