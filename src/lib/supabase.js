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
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: { code: 'PGRST116' } }),
          limit: () => Promise.resolve({ data: [], error: null }),
          order: () => Promise.resolve({ data: [], error: null }),
          range: () => Promise.resolve({ data: [], error: null, count: 0 })
        }),
        not: () => Promise.resolve({ data: [], error: null }),
        or: () => Promise.resolve({ data: [], error: null }),
        overlaps: () => Promise.resolve({ data: [], error: null }),
        ilike: () => Promise.resolve({ data: [], error: null }),
        gte: () => Promise.resolve({ data: [], error: null }),
        lte: () => Promise.resolve({ data: [], error: null }),
        in: () => Promise.resolve({ data: [], error: null }),
        order: () => Promise.resolve({ data: [], error: null }),
        range: () => Promise.resolve({ data: [], error: null, count: 0 }),
        limit: () => Promise.resolve({ data: [], error: null })
      }),
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