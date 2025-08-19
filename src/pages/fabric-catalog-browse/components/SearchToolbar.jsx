import React from 'react';
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react';

const SearchToolbar = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultsCount,
  onFilterToggle
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'moq-low', label: 'MOQ: Low to High' },
    { value: 'moq-high', label: 'MOQ: High to Low' }
  ];

  return (
    <div className="bg-bg-elevate border-b border-border px-6 py-4">
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
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="input w-full pl-10 pr-4 py-3"
            />
          </div>
          
          {/* Filter Toggle */}
          <button
            onClick={onFilterToggle}
            className="btn px-4 py-3 lg:hidden"
            title="Toggle filters"
          >
            <SlidersHorizontal className="w-3 h-3 mr-2" />
            Filters
          </button>
        </div>

        {/* Center section - Results count */}
        <div className="hidden md:block">
          <span className="text-sm text-ink-dim font-medium">
            {resultsCount?.toLocaleString()} fabrics
          </span>
        </div>

        {/* Right section - Controls */}
        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e?.target?.value)}
            className="btn pr-8 appearance-none"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>

          {/* View Mode */}
          <div className="flex items-center bg-bg-soft rounded-lg border border-border p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === 'grid' ? 'bg-accent text-black' : 'text-ink-dim hover:text-ink'
              }`}
              title="Grid view"
            >
              <Grid3X3 className="w-3 h-3" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === 'list' ? 'bg-accent text-black' : 'text-ink-dim hover:text-ink'
              }`}
              title="List view"
            >
              <List className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchToolbar;