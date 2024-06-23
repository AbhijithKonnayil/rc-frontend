import React, { useState } from "react";
import "./tabbar.css";
const TabBar = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex-1">
      <div className="flex  h-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button  ${tab.id === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-panel ${tab.id === activeTab ? "active" : ""}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
