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
            editor={<div className="h-full flex flex-col"><Tabs/><Routes/></div>}
            terminal={<div className="font-mono text-xs text-ink-dim p-3">logs…</div>}
          />
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;