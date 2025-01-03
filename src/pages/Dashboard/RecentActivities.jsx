import React, { useState } from "react";
import "./recentActivities.css";

const RecentActivities = ({ activities }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const tabs = ['In 15 Days', 'In 30 Days', 'In 60 Days', 'In 90 Days'];
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedActivities = activities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='border rounded-lg recent-activities'>
      <h2 className="recenthead">Subscription Expiring</h2>
      <div>
        <div className="flex space-x-4 border-b border-gray-300 justify-between ">
          {tabs.map((tab, index) => (
            <button 
              key={index} 
              className={`expirydaystab ${index === activeTab ? 'expirydatesactive duration-200' : 'expirydatesInactive'}`} 
              onClick={() => setActiveTab(index)}
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

        <div className="flex justify-end items-center mt-1 pr-5"> 
          
          <div className="flex pageswipe">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-0 py-2 ${currentPage === 1 ? "text-gray-300 cursor-not-allowed font-extrabold" : "text-[#25282B] font-extrabold"}`}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-1 py-2 ${currentPage === i + 1 ? "border-[#1E4DA1] text-[#1E4DA1] underline pageno" : "border-gray-300 text-[#898989] pageno"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-0 py-2 ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed font-extrabold" : "text-[#25282B] font-extrabold rounded-lg"}`}
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
