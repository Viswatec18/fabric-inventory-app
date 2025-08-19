import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./Routes";
import AppShell from './components/layout/AppShell';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Tabs } from './components/layout/Tabs';

function App() {
  return (
    <AuthProvider>
      <AppShell
        sidebar={<Sidebar/>}
        topbar={<Topbar/>}
        editor={<div className="h-full flex flex-col"><Tabs/><Routes/></div>}
        terminal={<div className="font-mono text-xs text-ink-dim p-3">logs…</div>}
      />
    </AuthProvider>
  );
}

export default App;