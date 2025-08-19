import React from 'react';
import { Star, Eye, ShoppingCart, Verified } from 'lucide-react';
import AppImage from '../../../components/AppImage';

const FabricCard = ({ fabric, viewMode, onQuickPreview }) => {
  if (!fabric) return null;

  const primaryImage = fabric?.fabric_images?.[0]?.image_url || '/assets/images/no_image.png';
  const vendor = fabric?.vendor || {};
  const isVerified = vendor?.verified || false;

  const handleQuickPreview = () => {
    onQuickPreview?.(fabric);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })?.format(price || 0);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex gap-6">
          {/* Image */}
          <div className="w-28 h-28 flex-shrink-0">
            <AppImage
              src={primaryImage}
              alt={fabric?.name || 'Fabric'}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-xl text-gray-900 mb-1 truncate">
                  {fabric?.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base text-gray-600">{vendor?.name}</span>
                  {isVerified && (
                    <div className="flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full">
                      <Verified className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {fabric?.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 ml-6">
                <button
                  onClick={handleQuickPreview}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors"
                  title="Quick preview"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-6">
                <div>
                  <span className="font-semibold text-2xl text-gray-900">
                    {formatPrice(fabric?.price_per_yard)}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">/yard</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>MOQ: {fabric?.minimum_order_quantity} yards</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg font-medium text-gray-900">
                    {fabric?.material}
                  </span>
                </div>
              </div>
              
              {fabric?.rating > 0 && (
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-current text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {fabric?.rating?.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({fabric?.review_count || 0})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="relative aspect-square">
        <AppImage
          src={primaryImage}
          alt={fabric?.name || 'Fabric'}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay on hover with macOS-style blur effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleQuickPreview}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-lg transition-colors"
            title="Quick preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {fabric?.is_featured && (
            <span className="bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              Featured
            </span>
          )}
          {fabric?.status === 'active' && fabric?.stock_quantity > 0 && (
            <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              In Stock
            </span>
          )}
        </div>
        
        {/* Rating badge */}
        {fabric?.rating > 0 && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-yellow-500" />
            <span className="text-sm font-medium text-gray-900">
              {fabric?.rating?.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 leading-tight">
          {fabric?.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-600">{vendor?.name}</span>
          {isVerified && (
            <div className="flex items-center justify-center w-4 h-4 bg-blue-600 rounded-full">
              <Verified className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="px-3 py-1 bg-gray-100 rounded-lg font-medium text-gray-900 border border-gray-200">
            {fabric?.material}
          </span>
          <span className="text-gray-600">{fabric?.gsm} GSM</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <div className="font-semibold text-xl text-gray-900">
              {formatPrice(fabric?.price_per_yard)}
            </div>
            <div className="text-sm text-gray-600">per yard</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">MOQ</div>
            <div className="text-sm font-medium text-gray-900">
              {fabric?.minimum_order_quantity} yards
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricCard;