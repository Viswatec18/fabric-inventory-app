import React from 'react';
import FabricCard from './FabricCard';

const FabricGrid = ({ fabrics, viewMode, isLoading, onQuickPreview }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading fabrics...</p>
        </div>
      </div>
    );
  }

  if (!fabrics || fabrics?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-xl text-gray-900 mb-2">No fabrics found</h3>
        <p className="text-gray-600 max-w-md">
          We couldn't find any fabrics matching your criteria. Try adjusting your search terms or filters.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {fabrics?.map((fabric, index) => (
          <div key={fabric?.id}>
            <FabricCard
              fabric={fabric}
              viewMode={viewMode}
              onQuickPreview={onQuickPreview}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {fabrics?.map((fabric, index) => (
        <div key={fabric?.id}>
          <FabricCard
            fabric={fabric}
            viewMode={viewMode}
            onQuickPreview={onQuickPreview}
          />
        </div>
      ))}
    </div>
  );
};

export default FabricGrid;