import React, { useState } from 'react';
import { Search, Menu, X, Play, Square, RotateCcw, Settings, User, Bell } from 'lucide-react';

const Topbar = ({ onMenuToggle, isMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isRunning, setIsRunning] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleRun = () => {
    setIsRunning(!isRunning);
    console.log(isRunning ? 'Stopping application...' : 'Starting application...');
  };

  const handleRestart = () => {
    console.log('Restarting application...');
    setIsRunning(false);
    setTimeout(() => setIsRunning(true), 1000);
  };

  const handleDocsClick = () => {
    try {
      window.open('https://docs.fabrichub.com', '_blank');
    } catch (error) {
      console.error('Failed to open docs:', error);
      window.location.href = '/docs';
    }
  };

  const handleGetStartedClick = () => {
    try {
      window.location.href = '/login-registration';
    } catch (error) {
      console.error('Navigation failed:', error);
      window.location.href = '/get-started';
    }
  };

  return (
    <div className="bg-bg-elevate border-b border-border px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="text-ink-dim hover:text-ink p-1 rounded transition-colors"
          type="button"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        {/* Project Info */}
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <div>
            <div className="text-sm font-medium text-ink">FabricHub</div>
            <div className="text-xs text-ink-dim">B2B Textile Marketplace</div>
          </div>
        </div>

        {/* Run Controls */}
        <div className="flex items-center space-x-2 ml-6">
          <button
            onClick={handleRun}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isRunning 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            type="button"
          >
            {isRunning ? <Square size={14} /> : <Play size={14} />}
            <span>{isRunning ? 'Stop' : 'Run'}</span>
          </button>
          
          <button
            onClick={handleRestart}
            className="p-1.5 text-ink-dim hover:text-ink hover:bg-bg-soft rounded-md transition-colors"
            type="button"
            title="Restart"
          >
            <RotateCcw size={16} />
          </button>
        </div>
        
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink-mute" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files, fabrics, designers..."
              className="w-full bg-bg-soft text-ink placeholder-ink-mute border border-border rounded-md pl-10 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center space-x-3">
        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs text-ink-dim">
            {isRunning ? 'Running' : 'Stopped'}
          </span>
        </div>

        {/* Notifications */}
        <button
          className="p-1.5 text-ink-dim hover:text-ink hover:bg-bg-soft rounded-md transition-colors relative"
          type="button"
        >
          <Bell size={16} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
            <span className="text-white text-xs">3</span>
          </div>
        </button>

        {/* Settings */}
        <button
          className="p-1.5 text-ink-dim hover:text-ink hover:bg-bg-soft rounded-md transition-colors"
          type="button"
        >
          <Settings size={16} />
        </button>

        {/* User Menu */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDocsClick}
            className="text-ink-dim hover:text-ink text-sm px-3 py-1.5 rounded-md hover:bg-bg-soft transition-colors"
            type="button"
          >
            Docs
          </button>
          <button
            onClick={handleGetStartedClick}
            className="bg-accent hover:bg-accent-hover text-white text-sm px-3 py-1.5 rounded-md transition-colors font-medium"
            type="button"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

export { Topbar }