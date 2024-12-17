import React from "react";
import "./companytable.css";

const CompanyTable = ({ companies }) => {
  return (
    <div className="border border-[#E9E9E9] rounded-lg companytable">
      <h4 className=" text-[#25282B] regcompany">
        Recent Registered Companies
      </h4>
      <div className="table-container">
        <table className="min-w-full text-left dashtable">
          <thead className="theads">
            <tr>
              <th className="tableheading tableheadingsl rightborder">No</th>
              <th className="tableheading headingname">Company Name</th>
              <th className="tableheading headingdate rightborder">
                Company Name & Date
              </th>
              <th className="tableheading headdate">Date</th>
              <th className="tableheading rightborder">Phone</th>
              <th className="tableheading">Status</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index} className="hover:bg-gray-100 cursor-pointer">
                <td className="index data">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </td>
                <td className="w-1/3 data">
                  {company.name}
                  <div className="tabledateres">
                    {company.date}
                    <div className="borderright" />
                    <span className="tabledatespan">{company.time}</span>
                  </div>
                </td>
                <td className="data tabledate">
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
