import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://qomaddtvkcrsslptgqdj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbWFkZHR2a2Nyc3NscHRncWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzODI0MzUsImV4cCI6MjA0NTk1ODQzNX0.WWgtsE72GlAENg5nHiF3VqFaBJU4agoe9HTzI1dFxuk';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
