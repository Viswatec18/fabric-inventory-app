import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';
import Icon from '../AppIcon';

const Header = ({ userRole, currentUser, onNavigate }) => {
  const { user, userProfile, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
      onNavigate?.('/login-registration');
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback navigation
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

  return (
    <header className="w-full bg-bg-elevate border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="Palette" size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-ink">FabricHub</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/fabric-catalog-browse')}
              type="button"
              className="text-ink-dim hover:text-accent transition-colors"
            >
              Browse Fabrics
            </button>
            <button 
              onClick={() => handleNavigation('/designer-directory-profiles')}
              type="button"
              className="text-ink-dim hover:text-accent transition-colors"
            >
              Designers
            </button>
            <button 
              onClick={() => handleNavigation('/vendor-dashboard-inventory')}
              type="button"
              className="text-ink-dim hover:text-accent transition-colors"
            >
              Vendors
            </button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {currentUserData ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('/shopping-cart-checkout')}
                  type="button"
                >
                  <Icon name="ShoppingCart" size={18} />
                </Button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-bg-elevate transition-colors"
                  >
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {currentUserData?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-ink">
                        {currentUserData?.name}
                      </div>
                      <div className="text-xs text-ink-dim capitalize">
                        {currentUserData?.role}
                      </div>
                    </div>
                    <Icon name="ChevronDown" size={16} className="text-ink-mute" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-bg-elevate border border-border rounded-lg shadow-lg py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleNavigation('/order-management-dashboard');
                        }}
                        type="button"
                        className="w-full px-4 py-2 text-left text-sm hover:bg-bg-soft transition-colors text-ink"
                      >
                        <Icon name="Package" size={16} className="inline mr-2" />
                        Orders
                      </button>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          // Navigate to profile
                        }}
                        type="button"
                        className="w-full px-4 py-2 text-left text-sm hover:bg-bg-soft transition-colors text-ink"
                      >
                        <Icon name="User" size={16} className="inline mr-2" />
                        Profile
                      </button>
                      <hr className="my-2 border-border" />
                      <button
                        onClick={handleSignOut}
                        type="button"
                        className="w-full px-4 py-2 text-left text-sm hover:bg-bg-soft transition-colors text-danger"
                      >
                        <Icon name="LogOut" size={16} className="inline mr-2" />
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
      </div>

      {/* Mobile Menu Backdrop */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 bg-black/20 md:hidden" 
          onClick={() => setShowUserMenu(false)} 
        />
      )}
    </header>
  );
};

export default Header;