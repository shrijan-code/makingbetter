
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hexhyrxxbucolsfqazwg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhleGh5cnh4YnVjb2xzZnFhendnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMzE5MTUsImV4cCI6MjA1ODYwNzkxNX0.QFcSA7a8gzsyWIcaEBemxxo09zqmTve6ni-EO1XzQNg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
