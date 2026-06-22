document.addEventListener("DOMContentLoaded", async () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggle-sidebar");
    const closeBtn = document.getElementById("close-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const userEmailText = document.getElementById("user-email");
    const btnLogout = document.getElementById("btn-logout");
    const pageTitle = document.getElementById("page-title");
    const currentTimeText = document.getElementById("current-time");

    // 1. CEK AUTENTIKASI LOGIN USER
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    if (error || !session) {
        // Jika tidak ada sesi login, paksa kembali ke halaman login utama (index.html)
        window.location.href = "index.html";
        return;
    }
    userEmailText.textContent = session.user.email;

    // 2. JAM DIGITAL NAVBAR REALTIME
    setInterval(() => {
        const now = new Date();
        currentTimeText.textContent = now.toLocaleDateString('id-ID', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        }) + " | " + now.toLocaleTimeString('id-ID');
    }, 1000);

    // 3. LOGIKA INTERAKSI SIDEBAR (OPEN/CLOSE/OVERLAY)
    function openSidebar() {
        sidebar.classList.remove("-translate-x-full");
        overlay.classList.remove("hidden");
    }

    function closeSidebar() {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
    }

    toggleBtn.addEventListener("click", () => {
        if (sidebar.classList.contains("-translate-x-full")) {
            openSidebar();
        } else {
            closeSidebar();
        }
    });
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    // 4. FITUR LOGOUT AMAN
    btnLogout.addEventListener("click", async () => {
        if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
            await window.supabaseClient.auth.signOut();
            window.location.href = "index.html";
        }
    });
});

// 5. GLOBAL FUNCTION LOAD IFRAME
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
        
        // Atur Judul berdasarkan URL halaman
        if(url.includes('pegawai')) pageTitle.textContent = "Data Master Pegawai";
    }
    
    // Otomatis tutup sidebar di perangkat seluler setelah klik menu
    if (window.innerWidth < 768) {
        document.getElementById("sidebar").classList.add("-translate-x-full");
        document.getElementById("sidebar-overlay").classList.add("hidden");
    }
}

// 6. GLOBAL FUNCTION TOGGLE MENU DROPDOWN SIDEBAR
window.toggleDropdown = function(dropdownId, arrowId) {
    const dropdown = document.getElementById(dropdownId);
    const arrow = document.getElementById(arrowId);
    dropdown.classList.toggle("hidden");
    arrow.classList.toggle("rotate-90");
}
