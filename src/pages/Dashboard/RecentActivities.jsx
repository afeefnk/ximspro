import React from "react";
import "./recentActivities.css";

const RecentActivities = ({ activities }) => {
  return (
    <div className="border border-[#E9E9E9] rounded-lg recent-activities">
      <h1 className="text-[#25282B] recenthead">Companies<br/>Recent Activities</h1>
      <div className="space-y-4 mb-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="border border-[#E9E9E9] cursor-pointer hover:bg-gray-100 accards"
          >
            <div className="icon-container flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF7E7]">
              <img
                src={activity.icon}
                alt="Activity Icon"
                className="w-5 h-5"
              />
            </div>
            <div className="activity-details">
              <p className="text-[#25282B]">{activity.title}</p>
              <p className="text-[#677487]">
                {activity.date}
                <span className="text-[#898989] ml-2">{activity.time}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
