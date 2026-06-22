// Konfigurasi Kredensial Akses Supabase
const SUPABASE_URL = "https://XYZ_YOUR_PROJECT_ID.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ACTUAL_ANON_KEY";

// DIUBAH: Menggunakan nama variabel 'supabaseClient' agar tidak bentrok dengan objek 'supabase' bawaan CDN
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
