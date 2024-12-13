import React from "react";
import "./companytable.css";

const CompanyTable = ({ companies }) => {
  return (
    <div className="border border-[#E9E9E9] rounded-lg">
      <h4 className="p-5 mb-3 text-[#25282B] regcompany">Recent Registered Companies</h4>
      <div className="table-container">
        <table className="min-w-full text-left dashtable">
          <thead className="theads">
            <tr>
              <th className="tableheading">No</th>
              <th className="tableheading">Company Name</th>
              <th className="tableheading">Date</th>
              <th className="tableheading">Phone</th>
              <th className="tableheading">Status</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index} className="hover:bg-gray-100 cursor-pointer">
                <td className="index data">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td className="w-1/3 data">{company.name}</td>
                <td className="data">
                  {company.date} <br />
                  <span className="text-sm text-[#898989] time">
                    {company.time}
                  </span>
                </td>
                <td className="data">{company.phone}</td>
                <td className="data">
                  <span
                    className={`status ${
                      company.status === "Active"
                        ? "bg-green-100 text-[#24D6A5]"
                        : "bg-violet-100 text-[#8239BC]"
                    }`}
                  >
                    {company.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyTable;
