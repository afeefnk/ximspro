import React from "react";
import "./recentActivities.css";
import { useTheme } from "../../ThemeContext";

const RecentActivities = ({ activities }) => {
   const { theme } = useTheme();

  return (
    <div className={`border rounded-lg recent-activities ${theme === "dark" ? "dark" : "light"}`}>
      <h2 className="recenthead">Companies<br/>Recent Activities</h2>
      <div className="lg:space-y-4 mb-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="border cursor-pointer accards"
          >
            <div className="icon-container flex items-center justify-center w-10 h-10 rounded-full">
              <img
                src={activity.icon}
                alt="Activity Icon"
                className="w-5 h-5"
              />
            </div>
            <div className="activity-details">
              <p className="activitytitle">{activity.title}</p>
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
