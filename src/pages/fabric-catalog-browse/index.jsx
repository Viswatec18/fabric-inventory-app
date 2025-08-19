import React, { useState, useEffect } from 'react';
import { getFabrics, getFabricMaterials } from '../../services/fabricService';
import { mockFabrics } from '../../data/seed.js';
import SearchToolbar from './components/SearchToolbar';
import FilterSidebar from './components/FilterSidebar';
import FabricGrid from './components/FabricGrid';
import Pagination from './components/Pagination';
import QuickPreviewModal from './components/QuickPreviewModal';

const FabricCatalogBrowse = () => {
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    materials: [],
    priceRange: { min: '', max: '' },
    gsmRange: { min: '', max: '' },
    moqRange: { min: '', max: '' },
    search: '',
    sortBy: 'newest'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 24,
    totalItems: 0
  });
  const [availableMaterials, setAvailableMaterials] = useState(['Cotton', 'Silk', 'Linen', 'Denim', 'Wool', 'Bamboo']);
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    // Set mock data immediately and show it
    console.log('Setting mock fabrics:', mockFabrics);
    setFabrics(mockFabrics);
    setPagination(prev => ({ ...prev, totalItems: mockFabrics.length }));
  }, [filters, pagination.currentPage]);

  // Apply client-side filtering to mock data
  const getFilteredFabrics = () => {
    let filtered = [...mockFabrics];

    if (filters.materials?.length > 0) {
      filtered = filtered.filter(fabric => 
        filters.materials.includes(fabric.material)
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(fabric =>
        fabric.name.toLowerCase().includes(searchLower) ||
        fabric.material.toLowerCase().includes(searchLower) ||
        fabric.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.priceRange?.min) {
      filtered = filtered.filter(fabric => 
        fabric.price_per_yard >= parseFloat(filters.priceRange.min)
      );
    }

    if (filters.priceRange?.max) {
      filtered = filtered.filter(fabric => 
        fabric.price_per_yard <= parseFloat(filters.priceRange.max)
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price_per_yard - b.price_per_yard);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price_per_yard - a.price_per_yard);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }

    return filtered;
  };

  const filteredFabrics = getFilteredFabrics();

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handleQuickPreview = (fabric) => {
    setSelectedFabric(fabric);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedFabric(null);
  };

  console.log('Rendering with fabrics:', filteredFabrics.length);

  return (
    <div className="min-h-screen bg-background">
      <div className="h-full flex flex-col">
        <SearchToolbar 
          searchQuery={filters.search}
          onSearchChange={(query) => setFilters(prev => ({ ...prev, search: query }))}
          sortBy={filters.sortBy}
          onSortChange={(sort) => setFilters(prev => ({ ...prev, sortBy: sort }))}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultsCount={filteredFabrics.length}
          onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
          filters={filters}
          onFiltersChange={handleFilterChange}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFilterChange}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
            onClearAll={() => setFilters({
              materials: [],
              priceRange: { min: '', max: '' },
              gsmRange: { min: '', max: '' },
              moqRange: { min: '', max: '' },
              search: '',
              sortBy: 'newest'
            })}
            availableMaterials={availableMaterials}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto p-6">
              <FabricGrid 
                fabrics={filteredFabrics}
                viewMode={viewMode}
                isLoading={loading}
                onQuickPreview={handleQuickPreview}
              />
            </div>
            
            {!loading && filteredFabrics.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={Math.ceil(filteredFabrics.length / pagination.itemsPerPage)}
                totalItems={filteredFabrics.length}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={(itemsPerPage) => 
                  setPagination(prev => ({ ...prev, itemsPerPage, currentPage: 1 }))
                }
              />
            )}
          </div>
        </div>
      </div>

      {/* Quick Preview Modal */}
      <QuickPreviewModal
        fabric={selectedFabric}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </div>
  );
};

export default FabricCatalogBrowse;