import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Tabs = () => {
  const location = useLocation();
  const [tabs] = useState([
    { id: 'main', label: 'Main', path: location.pathname }
  ]);
  const [activeTab, setActiveTab] = useState('main');

  return (
    <div className="flex items-center bg-bg-soft border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-sm font-medium border-r border-border transition-colors ${
            activeTab === tab.id
              ? 'bg-bg text-ink'
              : 'text-ink-dim hover:text-ink hover:bg-bg-elevate'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};