import React, { useState } from 'react';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  FileText, 
  User,
  HelpCircle,
  Mail,
  Phone,
  Clock,
  Home,
  Search,
  Settings,
  BarChart3,
  Folder,
  Code,
  Terminal
} from 'lucide-react';

const Sidebar = ({ isOpen = true }) => {
  const [activeItem, setActiveItem] = useState('catalog');

  const handleNavigation = (path, itemId) => {
    setActiveItem(itemId);
    try {
      window.location.href = path;
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const navigationItems = [
    { 
      id: 'catalog',
      name: 'Fabric Catalog', 
      icon: Package, 
      path: '/fabric-catalog-browse',
      description: 'Browse premium fabrics'
    },
    { 
      id: 'designers',
      name: 'Designers', 
      icon: Users, 
      path: '/designer-directory-profiles',
      description: 'Find talented designers'
    },
    { 
      id: 'cart',
      name: 'Shopping Cart', 
      icon: ShoppingCart, 
      path: '/shopping-cart-checkout',
      description: 'Review your selections'
    },
    { 
      id: 'orders',
      name: 'Order Management', 
      icon: FileText, 
      path: '/order-management-dashboard',
      description: 'Track your orders'
    },
    { 
      id: 'vendor',
      name: 'Vendor Dashboard', 
      icon: BarChart3, 
      path: '/vendor-dashboard-inventory',
      description: 'Manage inventory'
    },
    { 
      id: 'admin',
      name: 'Admin Panel', 
      icon: Settings, 
      path: '/admin-control-panel',
      description: 'System administration'
    }
  ];

  const quickActions = [
    { name: 'New Project', icon: Folder, action: () => console.log('New project') },
    { name: 'Import Data', icon: Code, action: () => console.log('Import data') },
    { name: 'Terminal', icon: Terminal, action: () => console.log('Open terminal') }
  ];

  if (!isOpen) {
    return (
      <div className="w-12 bg-bg-soft border-r border-border h-full flex flex-col items-center py-4 space-y-4">
        {navigationItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path, item.id)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                activeItem === item.id
                  ? 'bg-accent text-white'
                  : 'text-ink-dim hover:text-ink hover:bg-bg-elevate'
              }`}
              title={item.name}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full bg-bg-soft border-r border-border h-full flex flex-col">
      {/* Brand Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={() => handleNavigation('/fabric-catalog-browse', 'catalog')}
          className="flex items-center space-x-3 w-full text-left group"
        >
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Package size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-ink group-hover:text-accent transition-colors">
              FabricHub
            </h1>
            <p className="text-xs text-ink-dim">B2B Textile Platform</p>
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-semibold text-ink-dim uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="space-y-1">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.name}
                onClick={action.action}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-ink-dim hover:text-ink hover:bg-bg-elevate rounded-lg transition-colors group"
              >
                <Icon size={16} className="text-ink-mute group-hover:text-accent" />
                <span className="text-sm font-medium">{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs font-semibold text-ink-dim uppercase tracking-wider mb-3">
          Navigation
        </h3>
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path, item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors group ${
                  activeItem === item.id
                    ? 'bg-accent text-white'
                    : 'text-ink-dim hover:text-ink hover:bg-bg-elevate'
                }`}
              >
                <Icon size={18} className={`${
                  activeItem === item.id ? 'text-white' : 'text-ink-mute group-hover:text-accent'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-sm ${
                    activeItem === item.id ? 'text-white' : 'text-ink group-hover:text-ink'
                  }`}>
                    {item.name}
                  </div>
                  <div className={`text-xs ${
                    activeItem === item.id ? 'text-white/80' : 'text-ink-mute'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Support Section */}
      <div className="border-t border-border p-4">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-ink-dim uppercase tracking-wider flex items-center">
            <HelpCircle size={14} className="mr-2" />
            Support
          </h3>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-ink-dim hover:text-ink transition-colors">
              <Mail size={12} />
              <a href="mailto:support@fabrichub.com" className="hover:text-accent">
                support@fabrichub.com
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-ink-dim hover:text-ink transition-colors">
              <Phone size={12} />
              <a href="tel:+15551234567" className="hover:text-accent">
                +1 (555) 123-4567
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-ink-dim">
              <Clock size={12} />
              <span>Mon-Fri 9AM-6PM EST</span>
            </div>
          </div>

          <button
            onClick={() => handleNavigation('/support', 'support')}
            className="w-full text-xs bg-bg-elevate hover:bg-accent hover:text-white text-ink-dim px-3 py-2 rounded-lg transition-colors border border-border"
          >
            Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

export { Sidebar }