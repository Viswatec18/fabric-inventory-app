import React from 'react';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  FileText, 
  User,
  HelpCircle,
  Mail,
  Phone,
  Clock
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const handleNavigation = (path) => {
    try {
      window.location.href = path;
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const navigationItems = [
    { 
      name: 'FabricHub Catalog', 
      icon: Package, 
      path: '/fabric-catalog-browse',
      description: 'Browse our fabric collection'
    },
    { 
      name: 'Designers', 
      icon: Users, 
      path: '/designer-directory-profiles',
      description: 'Find talented designers'
    },
    { 
      name: 'Cart Items', 
      icon: ShoppingCart, 
      path: '/shopping-cart-checkout',
      description: 'View your cart'
    },
    { 
      name: 'Fabrics Details', 
      icon: FileText, 
      path: '/fabric-product-detail',
      description: 'Detailed fabric information'
    },
    { 
      name: 'Designers Details', 
      icon: User, 
      path: '/designer-directory-profiles',
      description: 'Designer profiles and portfolios'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Brand */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => handleNavigation('/fabric-catalog-browse')}
          className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
          type="button"
        >
          FabricHub
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors group"
                type="button"
              >
                <Icon size={18} className="text-gray-500 group-hover:text-orange-600" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Support Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center">
            <HelpCircle size={16} className="mr-2" />
            Support
          </h3>
          
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail size={12} />
              <a href="mailto:support@fabrichub.com" className="hover:text-orange-600">
                support@fabrichub.com
              </a>
            </div>
            
            <div className="flex items-center space-x-2">
              <Phone size={12} />
              <a href="tel:+15551234567" className="hover:text-orange-600">
                +1 (555) 123-4567
              </a>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock size={12} />
              <span>Mon-Fri 9AM-6PM EST</span>
            </div>
          </div>

          <button
            onClick={() => handleNavigation('/support')}
            className="w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md transition-colors"
            type="button"
          >
            Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;