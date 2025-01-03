import React, { useState, useEffect } from "react";
import "./recentActivities.css";
import { useTheme } from "../../ThemeContext";

const RecentActivities = ({ activities }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getDateRange = (days) => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);
    return futureDate;
  };

  const filteredActivities = activities.filter((activity) => {
    const expiryDate = new Date(activity.expiryDate);
    const days = [15, 30, 60, 90][activeTab];
    return expiryDate <= getDateRange(days);
  });

  const tabs = [
    `In 15 Days `,
    `In 30 Days `,
    `In 60 Days`,
    `In 90 Days`
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={`border rounded-lg recent-activities ${theme === "dark" ? "dark" : "light"}`}>
      <h2 className="recenthead">Subscription Expiring</h2>
      <div>
        <div className="flex space-x-4 justify-between expirydaystabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`expirydaystab ${index === activeTab ? "expirydatesactive duration-200" : "expirydatesInactive"}`}
              onClick={() => { setActiveTab(index); setCurrentPage(1); }}
            >
              {tab}
            </button>
          ))}
        </div>

        {paginatedActivities.map((item, index) => (
          <div key={index} className="rounded-lg mx-5 activitytabs">
            <table className="w-full">
              <thead>
                <tr className="recentactivityheadclass">
                  <th className="text-left recentactivitythead px-2">No</th>
                  <th className="text-left recentactivitythead px-2">Company Name</th>
                  <th className="text-right recentactivitythead px-2">Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="recentactivitydataclass">
                  <td className="idtext px-2">{item.id}</td>
                  <td className="cmytext px-2">{item.company}</td>
                  <td className="cmytext text-right px-2">{item.expiryDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}

        <div className="flex justify-end items-center pr-5">
          <div className="flex pageswipe">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-0 py-2 ${currentPage === 1 ? "arrownotactive cursor-not-allowed font-extrabold" : "arrowactive font-extrabold"}`}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-1 py-2 ${currentPage === i + 1 ? "paginateactive underline" : "border-gray-300 text-[#898989] paginateInactive"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-0 py-2 ${currentPage === totalPages ? "arrownotactive cursor-not-allowed font-extrabold" : "arrowactive font-extrabold rounded-lg"}`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;
