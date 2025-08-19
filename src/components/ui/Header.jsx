import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';
import Icon from '../AppIcon';

const Header = ({ userRole, currentUser, onNavigate }) => {
  const { user, userProfile, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
      onNavigate?.('/login-registration');
    } catch (error) {
      console.error('Sign out error:', error);
      window.location.href = '/login-registration';
    }
  };

  const handleAuthAction = () => {
    try {
      onNavigate?.('/login-registration');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = '/login-registration';
    }
  };

  const handleNavigation = (path) => {
    try {
      onNavigate?.(path);
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = path;
    }
  };

  const currentUserData = user ? {
    name: userProfile?.full_name || user?.email?.split('@')?.[0] || 'User',
    email: user?.email,
    role: userProfile?.role || 'buyer'
  } : null;

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: 'Home' },
    { path: '/fabric-catalog-browse', label: 'Browse Fabrics', icon: 'Search' },
    { path: '/designer-directory-profiles', label: 'Designers', icon: 'Users' },
    { path: '/vendor-dashboard-inventory', label: 'Vendors', icon: 'Store' },
    { path: '/order-management-dashboard', label: 'Orders', icon: 'Package' }
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="nav-header">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavigation('/')}
          className="nav-brand"
          type="button"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Layers" size={18} className="text-white" />
          </div>
          <span>FabricHub</span>
        </button>

        {/* Navigation */}
        <nav className="nav-menu">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              type="button"
              className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
            >
              <Icon name={item.icon} size={16} className="mr-2" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {currentUserData ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('/shopping-cart-checkout')}
                type="button"
                className="relative"
              >
                <Icon name="ShoppingCart" size={18} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>

              <div className="user-menu">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  type="button"
                  className="user-menu-trigger"
                >
                  <div className="user-avatar">
                    {currentUserData?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-foreground">
                      {currentUserData?.name}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {currentUserData?.role}
                    </div>
                  </div>
                  <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                </button>

                {showUserMenu && (
                  <div className="user-menu-dropdown">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleNavigation('/');
                      }}
                      type="button"
                      className="user-menu-item"
                    >
                      <Icon name="Home" size={16} />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleNavigation('/order-management-dashboard');
                      }}
                      type="button"
                      className="user-menu-item"
                    >
                      <Icon name="Package" size={16} />
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleNavigation('/shopping-cart-checkout');
                      }}
                      type="button"
                      className="user-menu-item"
                    >
                      <Icon name="ShoppingCart" size={16} />
                      Shopping Cart
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to profile
                      }}
                      type="button"
                      className="user-menu-item"
                    >
                      <Icon name="User" size={16} />
                      Profile Settings
                    </button>
                    <div className="border-t border-border my-1"></div>
                    <button
                      onClick={handleSignOut}
                      type="button"
                      className="user-menu-item danger"
                    >
                      <Icon name="LogOut" size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAuthAction}
                type="button"
              >
                Sign In
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAuthAction}
                type="button"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 bg-black/20 md:hidden z-40" 
          onClick={() => setShowUserMenu(false)} 
        />
      )}
    </header>
  );
};

export default Header;