import React, { useState, useRef, useEffect } from 'react';

const AppShell = ({ sidebar, topbar, editor, terminal }) => {
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [terminalHeight, setTerminalHeight] = useState(35);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);
  
  const sidebarRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingSidebar) {
        const newWidth = Math.max(200, Math.min(400, e.clientX));
        setSidebarWidth(newWidth);
      }
      
      if (isResizingTerminal) {
        const rect = terminalRef.current?.getBoundingClientRect();
        if (rect) {
          const newHeight = Math.max(35, Math.min(85, ((window.innerHeight - rect.top - e.clientY) / (window.innerHeight - rect.top)) * 100));
          setTerminalHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
      setIsResizingTerminal(false);
    };

    if (isResizingSidebar || isResizingTerminal) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar, isResizingTerminal]);

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
        
        {/* Main content with editor/terminal split */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor area */}
          <div 
            className="bg-bg overflow-hidden"
            style={{ height: `${100 - terminalHeight}%` }}
          >
            {editor}
          </div>
          
          {/* Terminal resize handle */}
          <div
            className="h-1 bg-border cursor-row-resize hover:bg-accent-soft transition-colors"
            onMouseDown={() => setIsResizingTerminal(true)}
          />
          
          {/* Terminal area */}
          <div 
            ref={terminalRef}
            className="bg-bg-soft border-t border-border overflow-hidden"
            style={{ height: `${terminalHeight}%` }}
          >
            {terminal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShell;