import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';

import FilterSidebar from './components/FilterSidebar';
import SearchToolbar from './components/SearchToolbar';
import FabricGrid from './components/FabricGrid';
import Pagination from './components/Pagination';
import QuickPreviewModal from './components/QuickPreviewModal';
import { getFabrics, getFabricMaterials, getVendors } from '../../services/fabricService';

const FabricCatalogBrowse = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [fabrics, setFabrics] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [filters, setFilters] = useState({
    materials: [],
    colors: [],
    vendors: [],
    priceRange: { min: '', max: '' },
    gsmRange: { min: '', max: '' },
    moqRange: { min: '', max: '' }
  });

  // Load available materials for filters
  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const materials = await getFabricMaterials();
        setAvailableMaterials(materials);
      } catch (error) {
        console.error('Error loading materials:', error);
      }
    };
    loadMaterials();
  }, []);

  // Load fabrics data
  const loadFabrics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const fabricFilters = {
        ...filters,
        page: currentPage,
        itemsPerPage: itemsPerPage,
        search: searchQuery,
        sortBy: sortBy
      };

      const result = await getFabrics(fabricFilters);
      setFabrics(result?.data || []);
      setTotalItems(result?.count || 0);
    } catch (err) {
      console.error('Failed to load fabrics:', err);
      setError(err?.message || 'Failed to load fabrics. Please try again.');
      setFabrics([]); // Set empty array on error
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Load filter options
  const loadFilterOptions = async () => {
    try {
      const [materialsData, vendorsData] = await Promise.allSettled([
        getFabricMaterials(),
        getVendors()
      ]);

      // Handle materials result
      if (materialsData?.status === 'fulfilled') {
        setMaterials(materialsData?.value || []);
      } else {
        console.error('Failed to load materials:', materialsData?.reason);
        setMaterials([]);
      }

      // Handle vendors result  
      if (vendorsData?.status === 'fulfilled') {
        setVendors(vendorsData?.value?.data || []);
      } else {
        console.error('Failed to load vendors:', vendorsData?.reason);
        setVendors([]);
      }
    } catch (err) {
      console.error('Failed to load filter options:', err);
      // Don't set error for filter options, just log it
    }
  };

  // Load fabrics when filters change
  useEffect(() => {
    loadFabrics();
    loadFilterOptions();
  }, [filters, searchQuery, sortBy, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearAllFilters = () => {
    setFilters({
      materials: [],
      colors: [],
      vendors: [],
      priceRange: { min: '', max: '' },
      gsmRange: { min: '', max: '' },
      moqRange: { min: '', max: '' }
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleQuickPreview = (fabric) => {
    setSelectedFabric(fabric);
    setIsPreviewModalOpen(true);
  };

  const handleFabricSelect = (fabric) => {
    setSelectedFabric(fabric);
  };

  return (
    <div className="h-full bg-bg text-ink">
      <div className="container mx-auto px-4 py-6 min-h-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-ink mb-4">Fabric Catalog</h1>
          <p className="text-ink-dim">Discover premium fabrics from verified vendors</p>
        </div>

        <div className="bg-bg-elevate rounded-lg border border-border mb-6">
          <SearchToolbar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            resultsCount={totalItems}
            onFilterToggle={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
          />
        </div>

        <div className="flex gap-6 h-full overflow-hidden">
          <FilterSidebar 
            isOpen={isFilterSidebarOpen}
            onToggle={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            filters={filters}
            onFiltersChange={setFilters}
            materials={materials}
            availableMaterials={availableMaterials}
            vendors={vendors}
            onClearFilters={() => setFilters({})}
            onClearAll={handleClearAllFilters}
          />
          
          <div className="flex-1 overflow-auto bg-bg-soft rounded-lg border border-border p-6">
            {error && (
              <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-danger" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-danger">Error loading fabrics</h3>
                    <div className="mt-2 text-sm text-danger">
                      {error}
                    </div>
                    <div className="mt-3">
                      <button 
                        onClick={() => {
                          setError(null);
                          loadFabrics();
                        }}
                        className="btn text-danger hover:bg-danger/10 px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <FabricGrid 
              fabrics={fabrics}
              loading={isLoading}
              isLoading={isLoading}
              viewMode={viewMode}
              onFabricSelect={handleFabricSelect}
              onQuickPreview={handleQuickPreview}
            />
            
            {!isLoading && !error && fabrics?.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-bg-elevate rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-ink-mute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-ink mb-2">No fabrics found</h3>
                <p className="text-ink-dim mb-4">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setFilters({});
                    setSearchQuery('');
                    setSortBy('newest');
                  }}
                  className="btn-accent px-4 py-2 rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {totalItems > itemsPerPage && !error && (
              <div className="mt-8">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalItems / itemsPerPage)}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedFabric && (
        <QuickPreviewModal 
          isOpen={isPreviewModalOpen}
          fabric={selectedFabric}
          onClose={() => {
            setSelectedFabric(null);
            setIsPreviewModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default FabricCatalogBrowse;