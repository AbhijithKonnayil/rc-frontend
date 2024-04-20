import React, { useState } from 'react';

const TabBar = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="tab-bar">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={tab.id === activeTab ? 'active' : ''}
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
            className={tab.id === activeTab ? 'tab-panel active' : 'tab-panel'}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
