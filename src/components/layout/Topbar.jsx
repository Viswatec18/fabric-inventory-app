import React from 'react';
import Icon from '../AppIcon';

export const Topbar = () => {
  return (
    <div className="h-full flex items-center justify-between px-4">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-accent rounded-full"></div>
        <span className="font-semibold text-ink">FabricHub</span>
      </div>
      
      {/* Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
          <input
            type="text"
            placeholder="Search fabrics, designers..."
            className="input w-full pl-10"
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="btn text-ink-dim hover:text-ink">
          Docs
        </button>
        <button className="btn-accent">
          Get Started
        </button>
      </div>
    </div>
  );
};