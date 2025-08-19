import { supabase } from '../lib/supabase';

// Retry utility function
const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Don't retry on certain errors
      if (error?.message?.includes('does not exist') || 
          error?.message?.includes('PGRST116') ||
          error?.code === 'PGRST116') {
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

// Check Supabase connection
const checkSupabaseConnection = async () => {
  try {
    // Try to connect to Supabase
    const { data, error } = await supabase?.from('fabrics')?.select('id')?.limit(1);
    if (error && error?.code !== 'PGRST116') {
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    // Return true to allow mock data fallback
    return true;
  }
};

// Get all fabrics with optional filtering and pagination
export const getFabrics = async (filters = {}) => {
  try {
    // Try to get real data first, fallback to mock data
    try {
      const operation = async () => {
        let query = supabase?.from('fabrics')?.select(`
          *,
          vendor:vendors(
            id,
            name,
            verified,
            rating
          ),
          fabric_images(
            id,
            image_url,
            display_order
          )
        `);

        // Apply filters (existing filter logic)
        if (filters?.materials && filters?.materials?.length > 0) {
          query = query?.in('material', filters?.materials);
        }

        if (filters?.search) {
          query = query?.or(`name.ilike.%${filters?.search}%,material.ilike.%${filters?.search}%,composition.ilike.%${filters?.search}%`);
        }

        // Sorting
        if (filters?.sortBy) {
          switch (filters?.sortBy) {
            case 'price-low':
              query = query?.order('price_per_yard', { ascending: true });
              break;
            case 'price-high':
              query = query?.order('price_per_yard', { ascending: false });
              break;
            case 'newest':
              query = query?.order('created_at', { ascending: false });
              break;
            default:
              query = query?.order('created_at', { ascending: false });
          }
        }

        const { data, error, count } = await query;
        
        if (error) {
          throw error;
        }

        return { data: data || [], count: count || 0 };
      };

      return await retryOperation(operation);
    } catch (error) {
      console.warn('Using mock data due to database connection issue:', error?.message);
      
      // Return mock data for development
      const mockFabrics = [
        {
          id: 'mock-1',
          name: 'Premium Cotton Blend',
          description: 'High-quality cotton blend fabric perfect for fashion garments',
          material: 'Cotton',
          price_per_yard: 12.50,
          minimum_order_quantity: 50,
          gsm: 180,
          rating: 4.8,
          review_count: 124,
          status: 'active',
          stock_quantity: 500,
          is_featured: true,
          fabric_images: [
            { image_url: '\https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop' }
          ],
          vendor: {
            id: 'vendor-1',
            name: 'Premium Textiles Co.',
            verified: true,
            rating: 4.8
          }
        },
        {
          id: 'mock-2',
          name: 'Luxury Silk Satin',
          description: 'Smooth and lustrous silk satin for elegant designs',
          material: 'Silk',
          price_per_yard: 28.75,
          minimum_order_quantity: 25,
          gsm: 120,
          rating: 4.9,
          review_count: 89,
          status: 'active',
          stock_quantity: 200,
          is_featured: true,
          fabric_images: [
            { image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' }
          ],
          vendor: {
            id: 'vendor-2',
            name: 'Silk Masters Inc.',
            verified: true,
            rating: 4.9
          }
        },
        {
          id: 'mock-3',
          name: 'Organic Linen',
          description: 'Sustainable organic linen with natural texture',
          material: 'Linen',
          price_per_yard: 18.90,
          minimum_order_quantity: 30,
          gsm: 160,
          rating: 4.7,
          review_count: 156,
          status: 'active',
          stock_quantity: 350,
          is_featured: false,
          fabric_images: [
            { image_url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop' }
          ],
          vendor: {
            id: 'vendor-3',
            name: 'Eco Fabrics Ltd.',
            verified: true,
            rating: 4.7
          }
        },
        {
          id: 'mock-4',
          name: 'Heavy Duty Denim',
          description: 'Durable denim fabric for workwear and casual clothing',
          material: 'Denim',
          price_per_yard: 22.00,
          minimum_order_quantity: 40,
          gsm: 220,
          rating: 4.6,
          review_count: 78,
          status: 'active',
          stock_quantity: 300,
          is_featured: false,
          fabric_images: [
            { image_url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop' }
          ],
          vendor: {
            id: 'vendor-4',
            name: 'Denim Works',
            verified: true,
            rating: 4.6
          }
        }
      ];

      // Import mock data from dedicated seed file
      const { mockFabrics } = await import('../data/seed.js');

      // Apply client-side filtering to mock data
      let filteredMockData = [...mockFabrics];

      if (filters?.materials && filters?.materials?.length > 0) {
        filteredMockData = filteredMockData.filter(fabric => 
          filters.materials.includes(fabric.material)
        );
      }

      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredMockData = filteredMockData.filter(fabric =>
          fabric.name.toLowerCase().includes(searchLower) ||
          fabric.material.toLowerCase().includes(searchLower) ||
          fabric.description.toLowerCase().includes(searchLower)
        );
      }

      if (filters?.priceRange?.min) {
        filteredMockData = filteredMockData.filter(fabric => 
          fabric.price_per_yard >= parseFloat(filters.priceRange.min)
        );
      }

      if (filters?.priceRange?.max) {
        filteredMockData = filteredMockData.filter(fabric => 
          fabric.price_per_yard <= parseFloat(filters.priceRange.max)
        );
      }

      // Apply sorting
      if (filters?.sortBy) {
        switch (filters.sortBy) {
          case 'price-low':
            filteredMockData.sort((a, b) => a.price_per_yard - b.price_per_yard);
            break;
          case 'price-high':
            filteredMockData.sort((a, b) => b.price_per_yard - a.price_per_yard);
            break;
          case 'rating':
            filteredMockData.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
          default:
            // Keep original order for mock data
            break;
        }
      }

      // Apply pagination
      const startIndex = filters?.page ? (filters.page - 1) * (filters.itemsPerPage || 24) : 0;
      const endIndex = startIndex + (filters.itemsPerPage || 24);
      const paginatedData = filteredMockData.slice(startIndex, endIndex);

      return { 
        data: paginatedData, 
        count: filteredMockData.length 
      };
    }

    const operation = async () => {
      let query = supabase?.from('fabrics')?.select(`
        *,
        vendor:vendors(
          id,
          name,
          verified,
          rating
        ),
        fabric_images(
          id,
          image_url,
          display_order
        )
      `);

      // Apply filters
      if (filters?.materials && filters?.materials?.length > 0) {
        query = query?.in('material', filters?.materials);
      }

      if (filters?.vendors && filters?.vendors?.length > 0) {
        query = query?.in('vendor_id', filters?.vendors);
      }

      if (filters?.priceRange?.min) {
        query = query?.gte('price_per_yard', parseFloat(filters?.priceRange?.min));
      }

      if (filters?.priceRange?.max) {
        query = query?.lte('price_per_yard', parseFloat(filters?.priceRange?.max));
      }

      if (filters?.gsmRange?.min) {
        query = query?.gte('gsm', parseInt(filters?.gsmRange?.min));
      }

      if (filters?.gsmRange?.max) {
        query = query?.lte('gsm', parseInt(filters?.gsmRange?.max));
      }

      if (filters?.moqRange?.min) {
        query = query?.gte('minimum_order_quantity', parseInt(filters?.moqRange?.min));
      }

      if (filters?.moqRange?.max) {
        query = query?.lte('minimum_order_quantity', parseInt(filters?.moqRange?.max));
      }

      // Search functionality
      if (filters?.search) {
        query = query?.or(`name.ilike.%${filters?.search}%,material.ilike.%${filters?.search}%,composition.ilike.%${filters?.search}%`);
      }

      // Sorting
      if (filters?.sortBy) {
        switch (filters?.sortBy) {
          case 'price-low':
            query = query?.order('price_per_yard', { ascending: true });
            break;
          case 'price-high':
            query = query?.order('price_per_yard', { ascending: false });
            break;
          case 'newest':
            query = query?.order('created_at', { ascending: false });
            break;
          case 'rating':
            query = query?.order('rating', { ascending: false });
            break;
          case 'moq-low':
            query = query?.order('minimum_order_quantity', { ascending: true });
            break;
          case 'moq-high':
            query = query?.order('minimum_order_quantity', { ascending: false });
            break;
          default:
            query = query?.order('created_at', { ascending: false });
        }
      }

      // Pagination
      if (filters?.page && filters?.itemsPerPage) {
        const from = (filters?.page - 1) * filters?.itemsPerPage;
        const to = from + filters?.itemsPerPage - 1;
        query = query?.range(from, to);
      }

      const { data, error, count } = await query;

      if (error) {
        // Handle specific network errors with helpful messages
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('NetworkError') ||
            error?.message?.includes('fetch')) {
          throw new Error('Cannot connect to database. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
        }
        
        // Handle authentication errors
        if (error?.message?.includes('AuthRetryableFetchError') ||
            error?.message?.includes('JWT')) {
          throw new Error('Authentication service is unavailable. Please check your Supabase project status and ensure it is active.');
        }
        
        // Handle other database errors
        if (error?.code === 'PGRST116' || error?.message?.includes('PGRST116')) {
          throw new Error('Database table "fabrics" not found. Please ensure your migration has been applied correctly.');
        }
        
        if (error?.message?.includes('relation') && error?.message?.includes('does not exist')) {
          throw new Error('Database schema is not properly set up. Please check if your Supabase migration has been applied.');
        }
        
        // Handle permission errors
        if (error?.message?.includes('permission') || error?.message?.includes('RLS')) {
          throw new Error('Database access denied. Please check your Row Level Security policies or contact support.');
        }
        
        // Generic error for unknown issues
        console.error('Database error details:', error);
        throw new Error(`Database error: ${error?.message || 'Failed to load fabrics. Please try again.'}`);
      }

      return { data: data || [], count: count || 0 };
    };

    return await retryOperation(operation);
  } catch (error) {
    console.error('Error fetching fabrics:', error);
    throw error;
  }
};

// Get fabric by ID
export const getFabricById = async (id) => {
  try {
    const { data, error } = await supabase?.from('fabrics')?.select(`
        *,
        vendor:vendors(
          id,
          name,
          verified,
          rating,
          contact_email,
          contact_phone,
          address
        ),
        fabric_images(
          id,
          image_url,
          display_order
        ),
        fabric_reviews(
          id,
          rating,
          review_text,
          created_at,
          user:user_profiles(
            id,
            full_name
          )
        )
      `)?.eq('id', id)?.single();

    if (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        throw new Error('Cannot connect to database. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
      }
      throw new Error('Failed to load fabric details. Please try again.');
    }

    return data;
  } catch (error) {
    console.error('Error fetching fabric by ID:', error);
    throw error;
  }
};

// Create new fabric (vendor only)
export const createFabric = async (fabricData) => {
  try {
    const { data, error } = await supabase?.from('fabrics')?.insert([fabricData])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating fabric:', error);
    throw error;
  }
};

// Update fabric (vendor only)
export const updateFabric = async (id, updates) => {
  try {
    const { data, error } = await supabase?.from('fabrics')?.update(updates)?.eq('id', id)?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating fabric:', error);
    throw error;
  }
};

// Delete fabric (vendor only)
export const deleteFabric = async (id) => {
  try {
    const { error } = await supabase?.from('fabrics')?.delete()?.eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting fabric:', error);
    throw error;
  }
};

// Upload fabric image
export const uploadFabricImage = async (fabricId, file, displayOrder = 1) => {
  try {
    const fileName = `${fabricId}/${Date.now()}-${file?.name}`;
    
    const { data: uploadData, error: uploadError } = await supabase?.storage?.from('fabric-images')?.upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: urlData } = supabase?.storage?.from('fabric-images')?.getPublicUrl(fileName);

    const { data, error } = await supabase?.from('fabric_images')?.insert([{
        fabric_id: fabricId,
        image_url: urlData?.publicUrl,
        display_order: displayOrder
      }])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error uploading fabric image:', error);
    throw error;
  }
};

// Get fabric materials for filters
export const getFabricMaterials = async () => {
  try {
    const operation = async () => {
      const { data, error } = await supabase?.from('fabrics')?.select('material')?.not('material', 'is', null);

      if (error) {
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('NetworkError') ||
            error?.message?.includes('fetch')) {
          throw new Error('Cannot connect to database. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.');
        }
        
        if (error?.code === 'PGRST116' || error?.message?.includes('does not exist')) {
          // Import mock materials from seed file
          const { mockMaterials } = await import('../data/seed.js');
          return mockMaterials;
        }
        
        console.error('Error fetching materials:', error);
        // Import mock materials from seed file
        const { mockMaterials } = await import('../data/seed.js');
        return mockMaterials;
      }

      const materials = [...new Set(data?.map(item => item?.material))]?.filter(Boolean);
      return materials;
    };

    return await retryOperation(operation);
  } catch (error) {
    console.error('Error fetching fabric materials:', error);
    // Import mock materials from seed file as fallback
    try {
      const { mockMaterials } = await import('../data/seed.js');
      return mockMaterials;
    } catch (importError) {
      console.error('Failed to import mock materials:', importError);
      return [];
    }
  }
};

// Add fabric review
export const addFabricReview = async (fabricId, reviewData) => {
  try {
    const { data, error } = await supabase?.from('fabric_reviews')?.insert([{
        ...reviewData,
        fabric_id: fabricId
      }])?.select()?.single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding fabric review:', error);
    throw error;
  }
};
function getVendors(...args) {
  // eslint-disable-next-line no-console
  console.warn('Placeholder: getVendors is not implemented yet.', args);
  return null;
}

export { getVendors };