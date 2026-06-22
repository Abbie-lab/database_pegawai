// Konfigurasi Kredensial Akses Supabase
const SUPABASE_URL = "https://amvqyeiypfzgjwriuuwl.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdnF5ZWl5cGZ6Z2p3cml1dXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwOTQ0MTcsImV4cCI6MjA5NzY3MDQxN30.Ndq52QI8hOrbttGMk1bBGFHGmLmXhB6v5iddfc0_-oM";

// Inisialisasi Koneksi Client Supabase global
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
