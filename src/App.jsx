import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import Routes from "./Routes";
import AppShell from './components/layout/AppShell';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Tabs } from './components/layout/Tabs';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <AppShell
            sidebar={<Sidebar/>}
            topbar={<Topbar/>}
            editor={
              <div className="h-full flex flex-col overflow-hidden">
                <Tabs/>
                <div className="flex-1 overflow-auto">
                  <Routes/>
                </div>
              </div>
            }
            terminal={
              <div className="h-full bg-bg-elevate border-t border-border overflow-auto">
                <div className="p-3 font-mono text-xs text-ink-dim">
                  <div className="mb-2 text-success">✓ FabricHub development server running</div>
                  <div className="mb-2 text-ink-mute">→ Local: http://localhost:4028</div>
                  <div className="mb-2 text-ink-mute">→ Network: use --host to expose</div>
                  <div className="text-ink-mute">Ready in 1.2s</div>
                </div>
              </div>
            }
          />
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;