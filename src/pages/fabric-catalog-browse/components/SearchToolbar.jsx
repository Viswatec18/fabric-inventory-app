import React, { useState } from 'react';
import { Search, Filter, Grid3X3, List, SlidersHorizontal, Download, RefreshCw } from 'lucide-react';

const SearchToolbar = ({
  searchQuery = '',
  onSearchChange,
  sortBy = 'newest',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  resultsCount = 0,
  onFilterToggle,
  filters = {},
  onFiltersChange
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'moq-low', label: 'MOQ: Low to High' },
    { value: 'moq-high', label: 'MOQ: High to Low' }
  ];

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
    onFilterToggle?.();
  };

  const handleExport = () => {
    console.log('Exporting fabric data...');
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
    window.location.reload();
  };

  return (
    <div className="bg-bg-elevate border-b border-border">
      {/* Main Toolbar */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left section - Search and Filter */}
          <div className="flex items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink-mute" />
              <input
                type="text"
                placeholder="Search fabrics, materials, or suppliers..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-bg-soft text-ink placeholder-ink-mute focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={handleFilterToggle}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
                isFilterOpen 
                  ? 'bg-accent text-white border-accent' 
                  : 'bg-bg-soft hover:bg-bg-elevate text-ink-dim hover:text-ink border-border'
              }`}
              title="Toggle filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Center section - Results count */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-ink-dim font-medium">
              {resultsCount.toLocaleString()} fabrics
            </span>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-ink-dim">Live</span>
            </div>
          </div>

          {/* Right section - Controls */}
          <div className="flex items-center gap-3">
            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRefresh}
                className="p-2 text-ink-dim hover:text-ink hover:bg-bg-soft rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleExport}
                className="p-2 text-ink-dim hover:text-ink hover:bg-bg-soft rounded-lg transition-colors"
                title="Export"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="bg-bg-soft border border-border text-ink px-3 py-2 rounded-lg pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex items-center bg-bg-soft rounded-lg border border-border p-1">
              <button
                onClick={() => onViewModeChange?.('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-accent text-white' 
                    : 'text-ink-dim hover:text-ink'
                }`}
                title="Grid view"
              >
                <Grid3X3 className="w-3 h-3" />
              </button>
              <button
                onClick={() => onViewModeChange?.('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-accent text-white' 
                    : 'text-ink-dim hover:text-ink'
                }`}
                title="List view"
              >
                <List className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar (when expanded) */}
      {isFilterOpen && (
        <div className="px-6 py-4 border-t border-border bg-bg-soft">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-ink-dim font-medium">Active Filters:</span>
            
            {filters?.materials?.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-ink-dim">Materials:</span>
                <div className="flex space-x-1">
                  {filters.materials.map(material => (
                    <span key={material} className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {(filters?.priceRange?.min || filters?.priceRange?.max) && (
              <div className="flex items-center space-x-2">
                <span className="text-ink-dim">Price:</span>
                <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">
                  ${filters.priceRange?.min || 0} - ${filters.priceRange?.max || '∞'}
                </span>
              </div>
            )}
            
            <button
              onClick={() => onFiltersChange?.({})}
              className="text-accent hover:text-accent-hover text-xs underline"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchToolbar;