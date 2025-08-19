import React, { useState, useEffect } from 'react';
import { getFabrics, getFabricMaterials } from './services/fabricService';
import { mockFabrics } from './data/seed.js';
import SearchToolbar from './components/SearchToolbar';
import FilterSidebar from './components/FilterSidebar';
import FabricGrid from './components/FabricGrid';
import Pagination from './components/Pagination';
import QuickPreviewModal from './components/QuickPreviewModal';

const FabricCatalogBrowse = () => {
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    loadFabrics();
    loadMaterials();
  }, [filters, pagination.currentPage]);

  const loadFabrics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filterParams = {
        ...filters,
        page: pagination.currentPage,
        itemsPerPage: pagination.itemsPerPage
      };
      
      try {
        const result = await getFabrics(filterParams);
        setFabrics(result.data || []);
        setPagination(prev => ({
          ...prev,
          totalItems: result.count || 0
        }));
      } catch (err) {
        console.warn('Using mock data:', err.message);
        // Use mock data as fallback
        let filteredData = [...mockFabrics];
        
        // Apply client-side filtering
        if (filters.materials?.length > 0) {
          filteredData = filteredData.filter(fabric => 
            filters.materials.includes(fabric.material)
          );
        }
        
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredData = filteredData.filter(fabric =>
            fabric.name.toLowerCase().includes(searchLower) ||
            fabric.material.toLowerCase().includes(searchLower) ||
            fabric.description.toLowerCase().includes(searchLower)
          );
        }
        
        setFabrics(filteredData);
        setPagination(prev => ({
          ...prev,
          totalItems: filteredData.length
        }));
      }
    } catch (err) {
      console.error('Error loading fabrics:', err);
      setError(err.message || 'Failed to load fabrics');
    } finally {
      setLoading(false);
    }
  };

  const loadMaterials = async () => {
    try {
      const materials = await getFabricMaterials();
      setAvailableMaterials(materials || []);
    } catch (err) {
      console.error('Error loading materials:', err);
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Error Loading Fabrics</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={loadFabrics}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
          resultsCount={pagination.totalItems}
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
                fabrics={fabrics}
                viewMode={viewMode}
                isLoading={loading}
                onQuickPreview={handleQuickPreview}
              />
            </div>
            
            {!loading && fabrics.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={Math.ceil(pagination.totalItems / pagination.itemsPerPage)}
                totalItems={pagination.totalItems}
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