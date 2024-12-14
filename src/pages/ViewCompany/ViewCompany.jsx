import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook
import { BASE_URL } from "../../Utils/Config";
import "./viewcompany.css";

const ViewCompany = () => {
  const { companyId } = useParams(); // Get the companyId from the URL parameters
  const [company, setCompany] = useState(null); // To hold the company data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts/companies/${companyId}/`);
        setCompany(response.data); // Set the company data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch company.");
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompany(); // Fetch company data if companyId is available
    } else {
      setError("Company ID is missing.");
      setLoading(false);
    }
  }, [companyId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-company-container">
      <h2 className="header">Company Details</h2>
      {company ? (
        <table className="company-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Admin Name</th>
              <th>Email</th>
              <th>Phone 1</th>
              <th>Phone 2</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{company.company_name}</td>
              <td>{company.company_admin_name}</td>
              <td>{company.email_address}</td>
              <td>{company.phone_no1 || "N/A"}</td>
              <td>{company.phone_no2 || "N/A"}</td>
              <td>{company.permissions.join(", ") || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="no-data">No company found with this ID.</div>
      )}
    </div>
  );
};

export default ViewCompany;
