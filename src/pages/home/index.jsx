import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Image from '../../components/AppImage';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalFabrics: 500,
    totalVendors: 45,
    totalDesigners: 28,
    totalOrders: 1250
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const featuredFabrics = [
    {
      id: 'featured-1',
      name: 'Premium Cotton Blend',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop',
      price: 12.50,
      vendor: 'Premium Textiles Co.',
      rating: 4.8
    },
    {
      id: 'featured-2',
      name: 'Luxury Silk Satin',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      price: 28.75,
      vendor: 'Silk Masters Inc.',
      rating: 4.9
    },
    {
      id: 'featured-3',
      name: 'Organic Linen',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop',
      price: 18.90,
      vendor: 'Eco Fabrics Ltd.',
      rating: 4.7
    }
  ];

  const quickActions = [
    {
      title: 'Browse Fabrics',
      description: 'Explore our extensive fabric catalog',
      icon: 'Search',
      color: 'bg-primary',
      path: '/fabric-catalog-browse'
    },
    {
      title: 'Find Designers',
      description: 'Connect with talented fashion designers',
      icon: 'Users',
      color: 'bg-secondary',
      path: '/designer-directory-profiles'
    },
    {
      title: 'Vendor Dashboard',
      description: 'Manage your inventory and orders',
      icon: 'BarChart3',
      color: 'bg-success',
      path: '/vendor-dashboard-inventory'
    },
    {
      title: 'My Orders',
      description: 'Track your order status and history',
      icon: 'Package',
      color: 'bg-warning',
      path: '/order-management-dashboard'
    }
  ];

  const recentActivity = [
    {
      type: 'order',
      title: 'New order placed',
      description: 'Order #FH20250115001 for Premium Cotton Blend',
      time: '2 hours ago',
      icon: 'ShoppingCart',
      color: 'text-success'
    },
    {
      type: 'fabric',
      title: 'New fabric listed',
      description: 'Bamboo Fiber Blend added by Green Fiber Co.',
      time: '4 hours ago',
      icon: 'Package',
      color: 'text-primary'
    },
    {
      type: 'designer',
      title: 'Designer consultation',
      description: 'Sarah Johnson accepted your project request',
      time: '6 hours ago',
      icon: 'User',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="h-full bg-bg text-ink overflow-auto">
      <Header userRole={userProfile?.role || 'buyer'} onNavigate={handleNavigation} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-ink mb-2">
                Welcome to FabricHub
                {user && userProfile?.full_name && (
                  <span className="text-ink-dim">, {userProfile.full_name}</span>
                )}
              </h1>
              <p className="text-ink-dim text-lg">
                Your premier B2B textile marketplace connecting vendors, buyers, and designers
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center">
                  <Icon name="Layers" size={32} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink-dim">Total Fabrics</p>
                <p className="text-2xl font-bold text-ink">{stats.totalFabrics.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Package" size={24} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink-dim">Verified Vendors</p>
                <p className="text-2xl font-bold text-ink">{stats.totalVendors}</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Store" size={24} className="text-success" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink-dim">Expert Designers</p>
                <p className="text-2xl font-bold text-ink">{stats.totalDesigners}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon name="Users" size={24} className="text-secondary" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink-dim">Orders Completed</p>
                <p className="text-2xl font-bold text-ink">{stats.totalOrders.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={24} className="text-warning" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-ink mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(action.path)}
                className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth cursor-pointer group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon name={action.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">{action.title}</h3>
                <p className="text-ink-dim text-sm">{action.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Fabrics */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-ink">Featured Fabrics</h2>
              <Button
                variant="outline"
                onClick={() => handleNavigation('/fabric-catalog-browse')}
                iconName="ArrowRight"
                iconPosition="right"
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredFabrics.map((fabric) => (
                <div
                  key={fabric.id}
                  className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-smooth cursor-pointer"
                  onClick={() => handleNavigation('/fabric-product-detail')}
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={fabric.image}
                      alt={fabric.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-ink mb-1">{fabric.name}</h3>
                    <p className="text-sm text-ink-dim mb-2">by {fabric.vendor}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-ink">${fabric.price}/yard</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-warning fill-current" />
                        <span className="text-sm text-ink-dim">{fabric.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-ink mb-6">Recent Activity</h2>
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color} bg-opacity-10`}>
                      <Icon name={activity.icon} size={16} className={activity.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink">{activity.title}</p>
                      <p className="text-sm text-ink-dim">{activity.description}</p>
                      <p className="text-xs text-ink-mute mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => handleNavigation('/order-management-dashboard')}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  View All Activity
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Textile Business?</h2>
            <p className="text-xl text-white/90 mb-6">
              Join thousands of businesses already using FabricHub to streamline their textile sourcing and connect with industry professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleNavigation('/fabric-catalog-browse')}
                iconName="Search"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Explore Catalog
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleNavigation('/designer-directory-profiles')}
                iconName="Users"
                iconPosition="left"
                className="border-white text-white hover:bg-white/10"
              >
                Find Designers
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ink mb-8 text-center">Why Choose FabricHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">Verified Quality</h3>
              <p className="text-ink-dim">
                All vendors are GST verified and quality assured for your peace of mind
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-success" />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">Fast Delivery</h3>
              <p className="text-ink-dim">
                Quick processing and reliable shipping across all major cities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">Expert Support</h3>
              <p className="text-ink-dim">
                24/7 customer support and designer consultation services
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;