import React, { useState, useEffect } from 'react';
import { getFabrics, getFabricMaterials } from '../../services/fabricService';
import SearchToolbar from './components/SearchToolbar';
import FilterSidebar from './components/FilterSidebar';
import FabricGrid from './components/FabricGrid';
import Pagination from './components/Pagination';

const FabricCatalogBrowse = () => {
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    materials: [],
    priceRange: { min: '', max: '' },
    search: '',
    sortBy: 'newest'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 24,
    totalItems: 0
  });
  const [availableMaterials, setAvailableMaterials] = useState([]);

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
      
      const result = await getFabrics(filterParams);
      setFabrics(result.data || []);
      setPagination(prev => ({
        ...prev,
        totalItems: result.count || 0
      }));
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

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Fabrics</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadFabrics}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <SearchToolbar 
          filters={filters}
          onFilterChange={handleFilterChange}
          totalItems={pagination.totalItems}
        />
        
        <div className="flex gap-6 mt-6">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            availableMaterials={availableMaterials}
          />
          
          <div className="flex-1">
            <FabricGrid 
              fabrics={fabrics}
              loading={loading}
            />
            
            {!loading && fabrics.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricCatalogBrowse;