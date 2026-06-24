document.addEventListener("DOMContentLoaded", async () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggle-sidebar");
    const closeBtn = document.getElementById("close-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const userEmailText = document.getElementById("user-email");
    const btnLogout = document.getElementById("btn-logout");
    const pageTitle = document.getElementById("page-title");
    const currentTimeText = document.getElementById("current-time");

    // 1. VERIFIKASI SEAMLESS LOGIN USER
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    if (error || !session) {
        // Jika tidak valid/belum login, paksa kembali ke login form
        window.location.href = "index.html";
        return;
    }
    // Masukkan email aktif operator ke sidebar
    userEmailText.textContent = session.user.email;

    // 2. JAM DIGITAL NAVBAR INDONESIA REALTIME
    setInterval(() => {
        const now = new Date();
        currentTimeText.textContent = now.toLocaleDateString('id-ID', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        }) + " | " + now.toLocaleTimeString('id-ID');
    }, 1000);

    // 3. EVENT LISTENER AKSI SIDEBAR RESPONSIVE MOBILE
    function openSidebar() {
        sidebar.classList.remove("-translate-x-full");
        overlay.classList.remove("hidden");
    }

    function closeSidebar() {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
    }

    if (toggleBtn) toggleBtn.addEventListener("click", openSidebar);
    if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);

    // 4. LOGOUT EVENT
   btnLogout.addEventListener("click", async () => { 
    if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
        // Pastikan menggunakan window.supabaseClient
        await window.supabaseClient.auth.signOut(); 
        window.location.href = "index.html";
    }
});

// 5. GLOBAL FUNCTION - NAVIGASI FRAME KONTEN
window.loadPage = function(url) {
    const welcomeView = document.getElementById("welcome-view");
    const contentFrame = document.getElementById("content-frame");
    const pageTitle = document.getElementById("page-title");

    if (url === 'welcome') {
        welcomeView.classList.remove("hidden");
        contentFrame.classList.add("hidden");
        pageTitle.textContent = "Dashboard Utama";
    } else {
        welcomeView.classList.add("hidden");
        contentFrame.classList.remove("hidden");
        contentFrame.src = url;
        
        if(url.includes('pegawai')) pageTitle.textContent = "Data Master Pegawai";
    }
    
    // Sembunyikan otomatis jika sedang di device mobile setelah memilih menu
    if (window.innerWidth < 768) {
        document.getElementById("sidebar").classList.add("-translate-x-full");
        document.getElementById("sidebar-overlay").classList.add("hidden");
    }
}

// 6. GLOBAL FUNCTION - ACCORDION DROPDOWN SIDEBAR
window.toggleDropdown = function(dropdownId, arrowId) {
    const dropdown = document.getElementById(dropdownId);
    const arrow = document.getElementById(arrowId);
    dropdown.classList.toggle("hidden");
    arrow.classList.toggle("rotate-90");
}
