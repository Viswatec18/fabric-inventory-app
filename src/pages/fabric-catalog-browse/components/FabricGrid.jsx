import React from 'react';
import FabricCard from './FabricCard';

const FabricGrid = ({ fabrics, viewMode, isLoading, onQuickPreview }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 bg-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full animate-spin"></div>
          <p className="text-ink-dim font-medium">Loading fabrics...</p>
        </div>
      </div>
    );
  }

  if (!fabrics || fabrics?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-bg">
        <div className="w-24 h-24 bg-bg-elevate rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-ink-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-xl text-ink mb-2">No fabrics found</h3>
        <p className="text-ink-dim max-w-md">
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