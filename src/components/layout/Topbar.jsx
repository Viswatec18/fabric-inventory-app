import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

const Topbar = ({ onMenuToggle, isMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
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
    <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="text-gray-300 hover:text-white p-1 rounded"
          type="button"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fabrics, designers..."
              className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={handleDocsClick}
          className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
          type="button"
        >
          Docs
        </button>
        <button
          onClick={handleGetStartedClick}
          className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-3 py-1.5 rounded-md transition-colors"
          type="button"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Topbar;

export { Topbar }