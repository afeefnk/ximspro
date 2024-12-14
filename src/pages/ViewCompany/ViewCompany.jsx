import React, { useEffect, useState } from "react";
import axios from "axios";
import "./viewcompany.css";
import { BASE_URL } from "../../Utils/Config";
import "./viewcompany.css";

const ViewCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts/view-companies/`);
        setCompanies(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch companies.");
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-company-container">
      <h2 className="header">Company Details</h2>
      {companies.length > 0 ? (
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
            {companies.map((company, index) => (
              <tr key={index}>
                <td>{company.company_name}</td>
                <td>{company.company_admin_name}</td>
                <td>{company.email_address}</td>
                <td>{company.phone_no1 || "N/A"}</td>
                <td>{company.phone_no2 || "N/A"}</td>
                <td>{company.permissions.join(", ") || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-data">No companies available to display.</div>
      )}
    </div>
  );
};

export default ViewCompany;
