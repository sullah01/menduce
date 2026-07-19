// js/supabase-config.js
// Initialize Supabase client with your project details
const SUPABASE_URL = 'https://cmubpbrqeegdpelvpuzk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtdWJwYnJxZWVnZHBlbHZwdXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NzA0ODcsImV4cCI6MjEwMDA0NjQ4N30.IiXqS3CZPvAPKbrsVc-ODTsop4k9LKHcAo1gLtNRxQQ'; // Replace with your actual anon key

// This creates a single instance of the Supabase client to use across your site
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
