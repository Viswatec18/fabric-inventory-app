import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Plus, MoreHorizontal } from 'lucide-react';

export const Tabs = () => {
  const location = useLocation();
  const [tabs, setTabs] = useState([
    { id: 'main', label: 'FabricHub', path: location.pathname, isActive: true, canClose: false },
    { id: 'catalog', label: 'Catalog', path: '/fabric-catalog-browse', isActive: false, canClose: true },
    { id: 'designers', label: 'Designers', path: '/designer-directory-profiles', isActive: false, canClose: true }
  ]);
  const [activeTab, setActiveTab] = useState('main');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setTabs(prev => prev.map(tab => ({ ...tab, isActive: tab.id === tabId })));
    
    const tab = tabs.find(t => t.id === tabId);
    if (tab && tab.path !== location.pathname) {
      try {
        window.location.href = tab.path;
      } catch (error) {
        console.error('Tab navigation error:', error);
      }
    }
  };

  const handleCloseTab = (tabId, e) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== tabId);
      // If closing active tab, activate the first remaining tab
      if (activeTab === tabId && newTabs.length > 0) {
        setActiveTab(newTabs[0].id);
        try {
          window.location.href = newTabs[0].path;
        } catch (error) {
          console.error('Tab navigation error:', error);
        }
      }
      return newTabs;
    });
  };

  const handleNewTab = () => {
    const newTabId = `tab-${Date.now()}`;
    const newTab = {
      id: newTabId,
      label: 'New Tab',
      path: '/fabric-catalog-browse',
      isActive: false,
      canClose: true
    };
    setTabs(prev => [...prev, newTab]);
  };

  return (
    <div className="flex items-center bg-bg-elevate border-b border-border overflow-hidden">
      {/* Tab List */}
      <div className="flex items-center overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`group flex items-center space-x-2 px-4 py-2 border-r border-border transition-colors cursor-pointer min-w-0 ${
              location.pathname === tab.path || (tab.id === 'main' && location.pathname === '/')
                ? 'bg-bg text-ink border-b-2 border-accent'
                : 'text-ink-dim hover:text-ink hover:bg-bg-soft'
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className="text-sm font-medium truncate max-w-32">
              {tab.label}
            </span>
            {tab.canClose && (
              <button
                onClick={(e) => handleCloseTab(tab.id, e)}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-bg-elevate rounded transition-all"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* New Tab Button */}
      <button
        onClick={handleNewTab}
        className="flex-shrink-0 p-2 text-ink-dim hover:text-ink hover:bg-bg-soft transition-colors border-r border-border"
        title="New Tab"
      >
        <Plus size={16} />
      </button>

      {/* Tab Actions */}
      <div className="flex-1 flex justify-end items-center px-2">
        <button
          className="p-1.5 text-ink-dim hover:text-ink hover:bg-bg-soft rounded transition-colors"
          title="More options"
        >
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  );
};