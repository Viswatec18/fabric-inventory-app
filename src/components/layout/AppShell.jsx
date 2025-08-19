import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AppShell = ({ children }) => {
  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;