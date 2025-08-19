// Mock data for FabricHub application
// This file contains all seed/sample data used throughout the application

export const mockFabrics = [
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
      { image_url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop' }
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
    gsm: 340,
    rating: 4.6,
    review_count: 203,
    status: 'active',
    stock_quantity: 180,
    is_featured: false,
    fabric_images: [
      { image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop' }
    ],
    vendor: {
      id: 'vendor-4',
      name: 'Denim Works Ltd.',
      verified: true,
      rating: 4.6
    }
  },
  {
    id: 'mock-5',
    name: 'Wool Blend Suiting',
    description: 'Professional suiting fabric with excellent drape',
    material: 'Wool',
    price_per_yard: 35.50,
    minimum_order_quantity: 20,
    gsm: 280,
    rating: 4.8,
    review_count: 67,
    status: 'active',
    stock_quantity: 120,
    is_featured: true,
    fabric_images: [
      { image_url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop' }
    ],
    vendor: {
      id: 'vendor-5',
      name: 'Suiting Specialists',
      verified: true,
      rating: 4.8
    }
  },
  {
    id: 'mock-6',
    name: 'Bamboo Fiber Blend',
    description: 'Sustainable bamboo fiber with natural antibacterial properties',
    material: 'Bamboo',
    price_per_yard: 16.25,
    minimum_order_quantity: 35,
    gsm: 150,
    rating: 4.5,
    review_count: 92,
    status: 'active',
    stock_quantity: 280,
    is_featured: false,
    fabric_images: [
      { image_url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop' }
    ],
    vendor: {
      id: 'vendor-6',
      name: 'Green Fiber Co.',
      verified: true,
      rating: 4.5
    }
  }
];

export const mockMaterials = [
  'Cotton',
  'Silk', 
  'Linen',
  'Denim',
  'Wool',
  'Bamboo',
  'Polyester',
  'Viscose'
];