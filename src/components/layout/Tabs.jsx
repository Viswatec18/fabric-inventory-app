import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Tabs = () => {
  const location = useLocation();
  const [tabs] = useState([
    { id: 'main', label: 'FabricHub', path: location.pathname },
    { id: 'catalog', label: 'Catalog', path: '/fabric-catalog-browse' },
    { id: 'designers', label: 'Designers', path: '/designer-directory-profiles' }
  ]);
  const [activeTab, setActiveTab] = useState('main');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const tab = tabs.find(t => t.id === tabId);
    if (tab && tab.path !== location.pathname) {
      try {
        window.location.href = tab.path;
      } catch (error) {
        console.error('Tab navigation error:', error);
      }
    }
  };

  return (
    <div className="flex items-center bg-bg-soft border-b border-border overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          type="button"
          className={`px-4 py-2 text-sm font-medium border-r border-border transition-colors whitespace-nowrap ${
            location.pathname === tab.path || (tab.id === 'main' && location.pathname === '/')
              ? 'bg-bg text-ink'
              : 'text-ink-dim hover:text-ink hover:bg-bg-elevate'
          }`}
        >
          {tab.label}
        </button>
      ))}
      <div className="flex-1 border-r border-border"></div>
    </div>
  );
};