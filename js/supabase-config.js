// js/supabase-config.js
// IMPORTANT: Replace 'YOUR_SUPABASE_ANON_KEY' with your actual anon key from Supabase

const SUPABASE_URL = 'https://cmubpbrqeegdpelvpuzk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtdWJwYnJxZWVnZHBlbHZwdXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NzA0ODcsImV4cCI6MjEwMDA0NjQ4N30.IiXqS3CZPvAPKbrsVc-ODTsop4k9LKHcAo1gLtNRxQQ'; // Replace with your actual anon key

// Initialize the Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Make it available globally
window.supabaseClient = supabaseClient;
