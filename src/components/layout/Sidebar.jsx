import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'catalog', label: 'Catalog', icon: 'Search', path: '/fabric-catalog-browse' },
    { id: 'designers', label: 'Designers', icon: 'Users', path: '/designer-directory-profiles' },
    { id: 'vendors', label: 'Vendors', icon: 'Building2', path: '/vendor-dashboard-inventory' },
    { id: 'orders', label: 'Orders', icon: 'Package', path: '/order-management-dashboard' },
    { id: 'cart', label: 'Cart', icon: 'ShoppingCart', path: '/shopping-cart-checkout' },
    { id: 'support', label: 'Support', icon: 'HelpCircle', path: '/support' },
    { id: 'admin', label: 'Admin', icon: 'Settings', path: '/admin-control-panel' }
  ];

  const handleNavigation = (path) => {
    try {
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = path;
    }
  };

  return (
    <div className="h-full flex flex-col p-3">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              type="button"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-accent text-black' 
                  : 'text-ink-dim hover:text-ink hover:bg-bg-elevate'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};