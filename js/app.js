const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const pegawaiForm = document.getElementById('pegawai-form');
const pegawaiTableBody = document.getElementById('pegawai-table-body');
const userDisplay = document.getElementById('user-display');
const btnLogout = document.getElementById('btn-logout');
const btnBatal = document.getElementById('btn-batal');
const formTitle = document.getElementById('form-title');

// Array penampung seluruh nama field input agar pemetaan otomatis
const fields = [
    'id_peg', 'nik', 'nama', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'agama', 'nip', 
    'status_pegawai', 'kelompok_tenaga', 'golongan_pangkat', 'tmt_pangkat', 'tmt_pangkat_berikutnya', 
    'kelompok_jabatan', 'jabatan', 'tmt_masuk', 'masa_kerja', 'tmt_cpns', 'rentang_bup', 'tmt_pensiun', 
    'ruangan', 'jabatan_ruangan', 'atasan_langsung', 'verifikator', 'shift_kerja', 'tmt', 
    'no_kartu_keluarga', 'status_pernikahan', 'pasangan', 'jumlah_anak', 'anak1', 'anak2', 'anak3', 
    'alamat_lengkap', 'jenjang_pendidikan', 'fakultas', 'jurusan', 'asal_pendidik', 'tahun_lulus', 
    'bpjskesehatan', 'bpjstktaspen', 'npwp', 'email', 'no_hp', 'total_cuti', 'cuti_diambil', 'sisa_cuti', 
    'nama_kerabat', 'hubungankeluarga', 'no_hp_kerabat', 'no_sipsik', 'tmt_sipsik', 'masaberlakusipsik', 
    'no_str', 'tmt_str', 'masaberlakustr', 'pelatihanwajib', 'tglpelatihan', 'tglakhirpelatihan', 'jpl'
];

// 1. MONITOR STATUS SELESAI AUTH LOGIN USER (Menggunakan supabaseClient)
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
        loginScreen.classList.add('hidden');
        dashboardScreen.classList.remove('hidden');
        userDisplay.innerText = session.user.email;
        fetchPegawai();
    } else {
        loginScreen.classList.remove('hidden');
        dashboardScreen.classList.add('hidden');
    }
});

// 2. LOGIKA KLIK TOMBOL LOGIN
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) alert('Gagal Masuk: ' + error.message);
});

// 3. LOGIKA TOMBOL LOGOUT
btnLogout.addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
});

// 4. BACA DATA (READ ALL PEGAWAI)
async function fetchPegawai() {
    pegawaiTableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400">Memuat data pegawai...</td></tr>`;
    
    const { data, error } = await supabaseClient
        .from('master_pegawai')
        .select('*')
        .order('id_peg', { ascending: false });

    if (error) {
        alert('Gagal mengambil data: ' + error.message);
        return;
    }

    pegawaiTableBody.innerHTML = '';
    if (data.length === 0) {
        pegawaiTableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400">Belum ada data pegawai terdaftar.</td></tr>`;
        return;
    }

    data.forEach(p => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 transition border-b border-slate-100";
        tr.innerHTML = `
            <td class="p-4 font-semibold">${p.nik || '-'}</td>
            <td class="p-4 font-medium text-slate-900">${p.nama || '-'}</td>
            <td class="p-4 text-slate-600">${p.nip || '-'}</td>
            <td class="p-4 text-xs">
                <span class="font-bold text-slate-700">${p.jabatan || '-'}</span><br>
                <span class="text-slate-400">${p.ruangan || '-'}</span>
            </td>
            <td class="p-4 text-center space-x-1">
                <button onclick="editPegawai(${p.id_peg})" class="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1 rounded transition">Edit</button>
                <button onclick="hapusPegawai(${p.id_peg})" class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition">Hapus</button>
            </td>
        `;
        pegawaiTableBody.appendChild(tr);
        window[`peg_obj_${p.id_peg}`] = p; 
    });
}

// 5. SIMPAN DATA (CREATE & UPDATE)
pegawaiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {};
    
    fields.forEach(f => {
        const input = document.getElementById(f);
        if (input && f !== 'id_peg') {
            if (input.type === 'number') {
                payload[f] = parseInt(input.value) || 0;
            } else {
                payload[f] = input.value || null;
            }
        }
    });

    const idPeg = document.getElementById('id_peg').value;

    if (idPeg) {
        // Eksekusi UPDATE
        const { error } = await supabaseClient.from('master_pegawai').update(payload).eq('id_peg', idPeg);
        if (error) alert('Gagal memperbarui data: ' + error.message);
        else {
            alert('Sukses memperbarui data pegawai!');
            resetForm();
        }
    } else {
        // Eksekusi INSERT (Create)
        const { error } = await supabaseClient.from('master_pegawai').insert([payload]);
        if (error) alert('Gagal menyimpan data baru: ' + error.message);
        else {
            alert('Sukses mendaftarkan pegawai baru!');
            resetForm();
        }
    }
    fetchPegawai();
});

// 6. PERSIAPAN EDIT DATA (MENGISI FORM)
function editPegawai(id) {
    const data = window[`peg_obj_${id}`];
    if (!data) return;

    formTitle.innerText = "Ubah Data Pegawai: " + data.nama;
    btnBatal.classList.remove('hidden');
    document.getElementById('id_peg').value = data.id_peg;

    fields.forEach(f => {
        const input = document.getElementById(f);
        if (input) {
            if (input.type === 'date' && data[f]) {
                input.value = data[f].split('T')[0]; 
            } else {
                input.value = data[f] !== null ? data[f] : '';
            }
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 7. HAPUS DATA (DELETE)
async function hapusPegawai(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data pegawai ini?')) {
        const { error } = await supabaseClient.from('master_pegawai').delete().eq('id_peg', id);
        if (error) alert('Gagal menghapus: ' + error.message);
        else {
            alert('Data pegawai berhasil dihapus.');
            fetchPegawai();
        }
    }
}

// 8. RESET FORMULIR KEMBALI SEMULA
btnBatal.addEventListener('click', resetForm);
function resetForm() {
    pegawaiForm.reset();
    document.getElementById('id_peg').value = '';
    formTitle.innerText = "Tambah Pegawai Baru";
    btnBatal.classList.add('hidden');
}
