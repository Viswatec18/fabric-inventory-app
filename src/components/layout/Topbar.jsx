import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

export const Topbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleBrandClick = () => {
    try {
      navigate('/fabric-catalog-browse');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = '/fabric-catalog-browse';
    }
  };
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      try {
        navigate(`/fabric-catalog-browse?search=${encodeURIComponent(searchQuery)}`);
      } catch (error) {
        console.error('Search navigation error:', error);
        window.location.href = `/fabric-catalog-browse?search=${encodeURIComponent(searchQuery)}`;
      }
    }
  };

  const handleDocsClick = () => {
    try {
      window.open('https://docs.fabrichub.com', '_blank');
    } catch (error) {
      console.error('Docs navigation error:', error);
      // Fallback to internal help page
      navigate('/support/docs');
    }
  };

  const handleGetStarted = () => {
    try {
      navigate('/login-registration');
    } catch (error) {
      console.error('Get started navigation error:', error);
      window.location.href = '/login-registration';
    }
  };

  return (
    <div className="h-full flex items-center justify-between px-4">
      {/* Brand */}
      <button 
        onClick={handleBrandClick}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        type="button"
      >
        <div className="w-6 h-6 bg-accent rounded-full"></div>
        <span className="font-semibold text-ink">FabricHub</span>
      </button>
      
      {/* Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
          <input
            type="text"
            placeholder="Search fabrics, designers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-10"
            onKeyDown={handleSearch}
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-3">
        <button 
          onClick={handleDocsClick}
          type="button"
          className="btn text-ink-dim hover:text-ink"
        >
          Docs
        </button>
        <button 
          onClick={handleGetStarted}
          type="button"
          className="btn-accent"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};