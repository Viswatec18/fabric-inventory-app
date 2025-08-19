import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are not set
let supabase;

if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'https://your-project-ref.supabase.co' || 
    supabaseAnonKey === 'your-anon-key-here') {
  console.warn('Supabase environment variables not configured. Using mock client.');
  
  // Create a mock client that returns empty data
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => {
        const mockQueryBuilder = {
          eq: () => mockQueryBuilder,
          not: () => mockQueryBuilder,
          or: () => mockQueryBuilder,
          overlaps: () => mockQueryBuilder,
          ilike: () => mockQueryBuilder,
          gte: () => mockQueryBuilder,
          lte: () => mockQueryBuilder,
          in: () => mockQueryBuilder,
          order: () => mockQueryBuilder,
          range: () => mockQueryBuilder,
          limit: () => mockQueryBuilder,
          single: () => Promise.resolve({ data: null, error: { code: 'PGRST116' } }),
          then: (resolve) => resolve({ data: [], error: null, count: 0 }),
          catch: () => mockQueryBuilder
        };
        return mockQueryBuilder;
      },
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      delete: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        getPublicUrl: () => ({ publicUrl: '/assets/images/no_image.png' })
      })
    }
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
}

export { supabase };