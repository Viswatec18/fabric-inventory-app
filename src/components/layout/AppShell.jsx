import React, { useState, useRef, useEffect } from 'react';

const AppShell = ({ sidebar, topbar, editor, terminal }) => {
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingSidebar) {
        const newWidth = Math.max(200, Math.min(400, e.clientX));
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
    };

    if (isResizingSidebar) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar]);

  return (
    <div className="h-screen bg-bg text-ink grid grid-rows-[48px_1fr]">
      {/* Top bar */}
      <div className="bg-bg-elevate border-b border-border">
        {topbar}
      </div>
      
      {/* Main content area */}
      <div className="flex overflow-hidden">
        {/* Sidebar */}
        <div 
          ref={sidebarRef}
          className="bg-bg-soft border-r border-border flex-shrink-0 relative"
          style={{ width: `${sidebarWidth}px` }}
        >
          {sidebar}
          
          {/* Sidebar resize handle */}
          <div
            className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-accent-soft transition-colors"
            onMouseDown={() => setIsResizingSidebar(true)}
          />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 bg-bg overflow-hidden">
          {editor}
        </div>
      </div>
    </div>
  );
};

export default AppShell;