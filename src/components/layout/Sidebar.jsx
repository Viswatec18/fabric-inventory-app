import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Palette,
  TrendingUp,
  FileText
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', active: false },
    { icon: Package, label: 'Fabric Catalog', path: '/fabric-catalog-browse', active: true },
    { icon: ShoppingCart, label: 'Shopping Cart', path: '/shopping-cart-checkout', active: false },
    { icon: FileText, label: 'Orders', path: '/order-management-dashboard', active: false },
    { icon: Users, label: 'Designers', path: '/designer-directory-profiles', active: false },
    { icon: TrendingUp, label: 'Vendor Dashboard', path: '/vendor-dashboard-inventory', active: false },
    { icon: Settings, label: 'Admin Panel', path: '/admin-control-panel', active: false },
  ];

  return (
    <div className={`bg-surface border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground">FabricHub</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  item.active
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;