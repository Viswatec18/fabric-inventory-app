import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const FilterSidebar = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle,
  onClearAll,
  availableMaterials
}) => {
  const [expandedSections, setExpandedSections] = useState({
    materials: true,
    price: true,
    gsm: false,
    moq: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleMaterialChange = (material) => {
    const newMaterials = filters?.materials?.includes(material)
      ? filters?.materials?.filter(m => m !== material)
      : [...(filters?.materials || []), material];
    
    onFiltersChange({
      ...filters,
      materials: newMaterials
    });
  };

  const handlePriceChange = (field, value) => {
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters?.priceRange,
        [field]: value
      }
    });
  };

  const handleGsmChange = (field, value) => {
    onFiltersChange({
      ...filters,
      gsmRange: {
        ...filters?.gsmRange,
        [field]: value
      }
    });
  };

  const handleMoqChange = (field, value) => {
    onFiltersChange({
      ...filters,
      moqRange: {
        ...filters?.moqRange,
        [field]: value
      }
    });
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-macos-gray-2 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-0 text-left hover:text-blue-600 transition-smooth"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="pb-4 animate-slide-up">{children}</div>
      )}
    </div>
  );

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
        w-80 lg:w-72 bg-white
        border-r border-gray-200
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg text-gray-900">Filters</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onClearAll}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-smooth"
              >
                Clear All
              </button>
              <button
                onClick={onToggle}
                className="lg:hidden bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 space-y-4">
          {/* Materials */}
          <FilterSection
            title="Materials"
            isExpanded={expandedSections?.materials}
            onToggle={() => toggleSection('materials')}
          >
            <div className="space-y-3">
              {availableMaterials?.map(material => (
                <label key={material} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters?.materials?.includes(material)}
                    onChange={() => handleMaterialChange(material)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 bg-white"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600 transition-smooth">
                    {material}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection
            title="Price per Yard"
            isExpanded={expandedSections?.price}
            onToggle={() => toggleSection('price')}
          >
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-2 font-medium">MIN</label>
                  <input
                    type="number"
                    placeholder="$0"
                    value={filters?.priceRange?.min}
                    onChange={(e) => handlePriceChange('min', e?.target?.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-2 font-medium">MAX</label>
                  <input
                    type="number"
                    placeholder="$999"
                    value={filters?.priceRange?.max}
                    onChange={(e) => handlePriceChange('max', e?.target?.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </FilterSection>

          {/* GSM Range */}
          <FilterSection
            title="Weight (GSM)"
            isExpanded={expandedSections?.gsm}
            onToggle={() => toggleSection('gsm')}
          >
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-2 font-medium">MIN</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters?.gsmRange?.min}
                    onChange={(e) => handleGsmChange('min', e?.target?.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-2 font-medium">MAX</label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters?.gsmRange?.max}
                    onChange={(e) => handleGsmChange('max', e?.target?.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </FilterSection>

          {/* MOQ Range */}
          <FilterSection
            title="Minimum Order (Yards)"
            isExpanded={expandedSections?.moq}
            onToggle={() => toggleSection('moq')}
          >
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-2 font-medium">MIN</label>
                  <input
                    type="number"
                    placeholder="1"
                    value={filters?.moqRange?.min}
                    onChange={(e) => handleMoqChange('min', e?.target?.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-2 font-medium">MAX</label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters?.moqRange?.max}
                    onChange={(e) => handleMoqChange('max', e?.target?.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </FilterSection>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;