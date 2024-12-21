import React, { useState, useEffect } from "react";
import axios from "axios";
import view from "../../assets/images/Companies/view.svg";
import edit from "../../assets/images/Companies/edit.svg";
import deletes from "../../assets/images/Companies/delete.svg";
import permission from "../../assets/images/Companies/permission.svg";
// import com_logo from "../../assets/images/Companies/image 1.svg";
import searchIcon from "../../assets/images/Companies/search.svg";
import csvicon from "../../assets/images/Companies/csv icon.svg";
import addicon from "../../assets/images/Companies/add.svg";
import arrow from "../../assets/images/Companies/downarrow.svg";
import { motion, AnimatePresence } from "framer-motion";
import "./companies.css";
import { BASE_URL } from "../../Utils/Config";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Fetch companies data from the API when the component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts/companies/`);
        setCompanies(response.data);
        console.log("response data", response.data);
      } catch (error) {
        console.error("Error fetching companies data:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleDeleteClick = (companyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (confirmDelete) {
      axios
        .delete(`${BASE_URL}/accounts/company/${companyId}/delete/`)
        .then((response) => {
          setCompanies(companies.filter((company) => company.id !== companyId));
          console.log("Company deleted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error deleting company:", error);
        });
    }
  };

  // Update company status using the API
  const toggleBlockStatus = (companyId, currentStatus) => {
    const newAction =
      currentStatus.toLowerCase() === "active" ? "block" : "active";

    axios
      .post(`${BASE_URL}/accounts/company/${companyId}/change-status/`, {
        action: newAction,
      })
      .then(() => {
        console.log("Status updated successfully");

        // Update the company data locally
        setCompanies((prevCompanies) =>
          prevCompanies.map((company) =>
            company.id === companyId
              ? {
                  ...company,
                  status: newAction === "block" ? "Blocked" : "Active",
                }
              : company
          )
        );
      })
      .catch((error) => {
        console.error(
          "Error updating status:",
          error.response?.data || error.message
        );
      });
  };

  const filteredCompanies = companies
  .filter((company) => {
    const nameMatch =
      company.company_name &&
      company.company_name.toLowerCase().includes(searchQuery.toLowerCase());
    const adminNameMatch =
      company.company_admin_name &&
      company.company_admin_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const emailMatch =
      company.email_address &&
      company.email_address.toLowerCase().includes(searchQuery.toLowerCase());
    const phoneMatch =
      company.phone_no1 && company.phone_no1.includes(searchQuery);
    return nameMatch || adminNameMatch || emailMatch || phoneMatch;
  })
  .sort((a, b) => b.id - a.id); // Sort in descending order by ID


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

  const handleAddCompany = () => {
    navigate("/admin/addcompany");
  };

  const handleExportToCSV = () => {
    const csvHeaders = ["ID", "Name", "Admin Name", "Email", "Phone", "Status"];
    const csvRows = paginatedCompanies.map((company) => [
      company.id,
      company.company_name,
      company.company_admin_name,
      company.email_address,
      company.phone_no1,
      company.status,
    ]);

    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "companies.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleView = (companyId) => {
    navigate(`/admin/viewcompany/${companyId}`);
  };

  const handleEdit = (companyId) => {
    navigate(`/admin/editcompany/${companyId}`);
  };

  const toggleDropdown = (companyId) => {
    setActiveDropdown((prev) => (prev === companyId ? null : companyId));
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div>
      <div className="border rounded-lg main">
        <h1 className="text-[#25282B] cmpilisthead">Companies</h1>
        <div className="lg:flex gap-3 p-5 navcomitems">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-[#E9E9E9] rounded focus:outline-none search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img
              src={searchIcon}
              alt="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 listserachicon"
            />
          </div>
          <div className="topbtns gap-x-3">
            <button
              className="bg-[#677487] rounded duration-200 hover:bg-[#4f5763] text-white topbtn excsv gap-1"
              onClick={handleExportToCSV}
            >
              <img src={csvicon} alt="Export" className="w-5 h-5" />
              Export to CSV
            </button>
            <button
              className="bg-[#1BC194] duration-200 text-white rounded hover:bg-[#21ab86] topbtn addcmpny gap-2"
              onClick={handleAddCompany}
            >
              <img src={addicon} alt="Add" className="w-4 h-4" />
              <p className="addnewcmpy">Add New Company</p>
              <p className="addcmpymob">Add Company</p>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="companieslist">
            <thead className="lg:border-t border-[#E9E9E9] listheads">
              <tr className="bg-[#F7F7F7] lg:border-b comhead">
                <th className="companiesthead companiestheadsl">Sl</th>
                <th className="text-start companiestheadlogo">Logo</th>
                <th className="text-start companiesthead compnyname">
                  Company Name
                </th>
                <th className="text-start companiesthead comadminname nodisplayhead">
                  Admin Name
                </th>
                <th className="text-start companiesthead compnyemail nodisplayhead">
                  Email
                </th>
                <th className="text-start companiesthead nodisplayhead">
                  Phone
                </th>
                <th className="text-start companiesthead nodisplayhead">
                  Status
                </th>
                <th className="companiesthead nodisplayhead">View</th>
                <th className="companiesthead nodisplayhead">Edit</th>
                <th className="companiesthead nodisplayhead">Block</th>
                <th className="companiesthead nodisplayhead">Delete</th>
                <th className="companiesthead compnyper nodisplayhead">
                  Permissions
                </th>
                <div className="drophead"></div>
              </tr>
            </thead>
            <tbody>
              {paginatedCompanies.map((company, index) => (
                <React.Fragment key={company.id}>
                  <tr
                    key={company.id}
                    className={`lg:hover:bg-gray-100 cursor-pointer tblrows ${
                      activeDropdown === company.id ? "no-border" : ""
                    }`}
                  >
                    <td className="companiesdatasl">
                      {String(index + 1 + indexOfFirstItem).padStart(2, "0")}
                    </td>
                    <td className="companiestheadlogo">
                      <img src={company.company_logo} alt="Logo" />
                    </td>
                    <td className="companiesdata companydataname">
                      {company.company_name}
                    </td>
                    <td className="companiesdata nodisplaydata">
                      {company.company_admin_name}
                    </td>
                    <td className="companiesdata companyemaildata nodisplaydata">
                      {company.email_address}
                    </td>
                    <td className="companiesdata nodisplaydata">
                      {company.phone_no1}
                    </td>
                    <td className="companiesdata nodisplaydata">
                      <span
                        className={`p-1 rounded block ${
                          company.status.toLowerCase() === "active"
                            ? "bg-green-100 text-[#24D6A5]"
                            : "bg-violet-100 text-[#8239BC]"
                        }`}
                      >
                        {company.status.charAt(0).toUpperCase() +
                          company.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="justify-items-center companiesdata nodisplaydata">
                      <img
                        src={view}
                        alt="View"
                        className="cursor-pointer w-5 h-auto"
                        onClick={() => handleView(company.id)}
                      />
                    </td>
                    <td className="justify-items-center companiesdata nodisplaydata">
                      <img
                        src={edit}
                        alt="Edit"
                        className="cursor-pointer w-auto h-auto"
                        onClick={() => handleEdit(company.id)}
                      />
                    </td>
                    <td className="justify-items-center companiesdata nodisplaydata">
                      <div className="justify-items-center">
                        <button
                          className={`items-center rounded-full p-1 toggle ${
                            company.status.toLowerCase() === "blocked"
                              ? "bg-[#F36643]"
                              : "bg-[#1BC194]"
                          }`}
                          onClick={() =>
                            toggleBlockStatus(company.id, company.status)
                          }
                        >
                          <div
                            className={`bg-white rounded-full transform transition-transform bar ${
                              company.status.toLowerCase() === "blocked"
                                ? "translate-x-2"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="justify-items-center companiesdata nodisplaydata">
                      <img
                        src={deletes}
                        alt="Delete"
                        className="cursor-pointer w-auto h-auto"
                        onClick={() => handleDeleteClick(company.id)}
                      />
                    </td>
                    <td className="justify-items-center companiesdata comperdata nodisplaydata">
                      <img src={permission} alt="Permissions" />
                    </td>
                    <div
                      className={`bgarrow ${
                        activeDropdown === company.id ? "active" : ""
                      }`}
                    >
                      <img
                        src={arrow}
                        alt=""
                        className={`dropdown-img ${
                          activeDropdown === company.id ? "rotated" : ""
                        }`}
                        onClick={() => toggleDropdown(company.id)}
                      />
                    </div>
                  </tr>
                  <AnimatePresence>
                    {activeDropdown === company.id && (
                      <motion.tr
                        className="dropdown-row"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                      >
                        <td colSpan="12" className="dropdownlist">
                          {/* Dropdown content goes here */}
                          <div className="flex justify-between gap-3 ">
                            <div>
                              <h4 className="mobhead">Admin Name</h4>
                              <p className="mobdata mobcmpyadmin">
                                {company.company_admin_name}
                              </p>
                            </div>
                            <div>
                              <h4 className="mobhead">Phone</h4>
                              <p className="mobdata mobcmpyphone">
                                {company.phone_no1}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-end mobhead">Status</h4>
                              <span
                                className={`rounded block text-xs blocks ${
                                  company.status.toLowerCase() === "active"
                                    ? "bg-green-100 text-[#24D6A5]"
                                    : "bg-violet-100 text-[#8239BC]"
                                }`}
                              >
                                {company.status.charAt(0).toUpperCase() +
                                  company.status.slice(1).toLowerCase()}
                              </span>
                            </div>
                          </div>
                          <div className="mobemaildiv">
                            <h4 className="mobhead">Email</h4>
                            <p className="mobdata">{company.email_address}</p>
                          </div>
                          <div className="flex justify-between mobactions">
                            <div className="justify-items-center">
                              <h4 className="mobhead">View</h4>
                              <img
                                src={view}
                                alt="View"
                                className="w-5 h-auto mobicon mobviewicon"
                                onClick={() => handleView(company.id)}
                              />
                            </div>
                            <div className="justify-items-center">
                              <h4 className="mobhead">Edit</h4>
                              <img
                                src={edit}
                                alt="Edit"
                                className=" w-auto h-auto mobicon"
                                onClick={() => handleEdit(company.id)}
                              />
                            </div>
                            <div className="justify-items-center">
                              <h4 className="mobhead">Block</h4>
                              <button
                                className={`items-center rounded-full p-1 toggle mobicon ${
                                  company.status.toLowerCase() === "blocked"
                                    ? "bg-[#F36643]"
                                    : "bg-[#1BC194]"
                                }`}
                                onClick={() =>
                                  toggleBlockStatus(company.id, company.status)
                                }
                              >
                                <div
                                  className={`bg-white rounded-full transform transition-transform bar ${
                                    company.status.toLowerCase() === "blocked"
                                      ? "translate-x-2"
                                      : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>
                            <div className="justify-items-center">
                              <h4 className="mobhead">Delete</h4>
                              <img
                                src={deletes}
                                alt="Delete"
                                className="cursor-pointer w-auto h-auto mobicon"
                                onClick={() => handleDeleteClick(company.id)}
                              />
                            </div>
                            <div className="justify-items-center">
                              <h4 className="mobhead">Permissions</h4>
                              <img
                                src={permission}
                                alt="Permissions"
                                className="mobicon"
                              />
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-1 paginationmob">
        <p className="pagination">
          Showing{" "}
          <span className="text-[#1E4DA1]">
            {itemsPerPage * (currentPage - 1) + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredCompanies.length)} of{" "}
            {filteredCompanies.length}
          </span>{" "}
          entries
        </p>
        <div className="flex pageswipe">
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
              className={`px-1 py-2 ${
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
