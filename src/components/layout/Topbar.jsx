import React from 'react';
import { Bell, Search, User, Settings } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="bg-surface border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">Fabric Catalog</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">John Doe</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;