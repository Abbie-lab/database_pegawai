// 1. STRUKTUR MASTER ARRAY DATA UNTUK MENANGANI PEMETAAN 60 FIELD PEGAWAI SECARA OTOMATIS
const fieldsMetadata = [
    // BAGIAN 1: IDENTITAS PRIBADI
    { id: 'nik', label: 'NIK (No. KTP)', type: 'text', section: 'pribadi', required: true },
    { id: 'nama', label: 'Nama Lengkap', type: 'text', section: 'pribadi', required: true },
    { id: 'tempat_lahir', label: 'Tempat Lahir', type: 'text', section: 'pribadi' },
    { id: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', section: 'pribadi' },
    { id: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', options: ['Laki-laki', 'Perempuan'], section: 'pribadi' },
    { id: 'agama', label: 'Agama', type: 'select', options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Khonghucu'], section: 'pribadi' },
    { id: 'alamat_lengkap', label: 'Alamat Lengkap', type: 'textarea', section: 'pribadi' },
    { id: 'email', label: 'Alamat Email', type: 'email', section: 'pribadi' },
    { id: 'no_hp', label: 'No. Handphone', type: 'text', section: 'pribadi' },
    { id: 'npwp', label: 'No. NPWP', type: 'text', section: 'pribadi' },
    { id: 'bpjskesehatan', label: 'No. BPJS Kesehatan', type: 'text', section: 'pribadi' },
    { id: 'bpjstktaspen', label: 'No. BPJS Ketenagakerjaan/Taspen', type: 'text', section: 'pribadi' },

    // BAGIAN 2: KEPEGAWAIAN
    { id: 'nip', label: 'NIP Pegawai', type: 'text', section: 'kepegawaian' },
    { id: 'status_pegawai', label: 'Status Pegawai', type: 'text', section: 'kepegawaian' },
    { id: 'kelompok_tenaga', label: 'Kelompok Tenaga', type: 'text', section: 'kepegawaian' },
    { id: 'golongan_pangkat', label: 'Golongan / Pangkat', type: 'text', section: 'kepegawaian' },
    { id: 'tmt_pangkat', label: 'TMT Pangkat', type: 'date', section: 'kepegawaian' },
    { id: 'tmt_pangkat_berikutnya', label: 'TMT Pangkat Berikutnya', type: 'date', section: 'kepegawaian' },
    { id: 'kelompok_jabatan', label: 'Kelompok Jabatan', type: 'text', section: 'kepegawaian' },
    { id: 'jabatan', label: 'Jabatan Kerja', type: 'text', section: 'kepegawaian' },
    { id: 'tmt_masuk', label: 'TMT Masuk', type: 'date', section: 'kepegawaian' },
    { id: 'masa_kerja', label: 'Masa Kerja', type: 'text', section: 'kepegawaian' },
    { id: 'tmt_cpns', label: 'TMT CPNS', type: 'date', section: 'kepegawaian' },
    { id: 'rentang_bup', label: 'Rentang BUP', type: 'text', section: 'kepegawaian' },
    { id: 'tmt_pensiun', label: 'TMT Pensiun', type: 'date', section: 'kepegawaian' },
    { id: 'ruangan', label: 'Ruangan Kerja', type: 'text', section: 'kepegawaian' },
    { id: 'jabatan_ruangan', label: 'Jabatan Ruangan', type: 'text', section: 'kepegawaian' },
    { id: 'atasan_langsung', label: 'Nama Atasan Langsung', type: 'text', section: 'kepegawaian' },
    { id: 'verifikator', label: 'Nama Verifikator', type: 'text', section: 'kepegawaian' },
    { id: 'shift_kerja', label: 'Shift Kerja', type: 'text', section: 'kepegawaian' },
    { id: 'tmt', label: 'TMT Berlaku', type: 'date', section: 'kepegawaian' },
    { id: 'total_cuti', label: 'Total Hak Cuti', type: 'number', section: 'kepegawaian' },
    { id: 'cuti_diambil', label: 'Cuti Telah Diambil', type: 'number', section: 'kepegawaian' },
    { id: 'sisa_cuti', label: 'Sisa Kuota Cuti', type: 'number', section: 'kepegawaian' },

    // BAGIAN 3: SILSILAH KELUARGA
    { id: 'no_kartu_keluarga', label: 'No. Kartu Keluarga (KK)', type: 'text', section: 'keluarga' },
    { id: 'status_pernikahan', label: 'Status Pernikahan', type: 'select', options: ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'], section: 'keluarga' },
    { id: 'pasangan', label: 'Nama Suami / Istri', type: 'text', section: 'keluarga' },
    { id: 'jumlah_anak', label: 'Jumlah Anak Kandung', type: 'number', section: 'keluarga' },
    { id: 'anak1', label: 'Nama Anak Ke-1', type: 'text', section: 'keluarga' },
    { id: 'anak2', label: 'Nama Anak Ke-2', type: 'text', section: 'keluarga' },
    { id: 'anak3', label: 'Nama Anak Ke-3', type: 'text', section: 'keluarga' },
    { id: 'nama_kerabat', label: 'Nama Kerabat Dekat (Darurat)', type: 'text', section: 'keluarga' },
    { id: 'hubungankeluarga', label: 'Hubungan Keluarga Kerabat', type: 'text', section: 'keluarga' },
    { id: 'no_hp_kerabat', label: 'No. HP Kontak Kerabat', type: 'text', section: 'keluarga' },

    // BAGIAN 4: PENDIDIKAN & PELATHIAN
    { id: 'jenjang_pendidikan', label: 'Jenjang Pendidikan Akhir', type: 'text', section: 'pendidikan' },
    { id: 'fakultas', label: 'Fakultas', type: 'text', section: 'pendidikan' },
    { id: 'jurusan', label: 'Jurusan / Program Studi', type: 'text', section: 'pendidikan' },
    { id: 'asal_pendidik', label: 'Nama Instansi Pendidikan', type: 'text', section: 'pendidikan' },
    { id: 'tahun_lulus', label: 'Tahun Kelulusan', type: 'text', section: 'pendidikan' },
    { id: 'pelatihanwajib', label: 'Nama Pelatihan Wajib', type: 'text', section: 'pendidikan' },
    { id: 'tglpelatihan', label: 'Tanggal Mulai Pelatihan', type: 'date', section: 'pendidikan' },
    { id: 'tglakhirpelatihan', label: 'Tanggal Akhir Pelatihan', type: 'date', section: 'pendidikan' },
    { id: 'jpl', label: 'Jumlah Jam Pelajaran (JPL)', type: 'number', section: 'pendidikan' },

    // BAGIAN 5: SERTIFIKASI & SURAT TANDA REGISTRASI (STR)
    { id: 'no_sipsik', label: 'No. SIPSIK', type: 'text', section: 'lisensi' },
    { id: 'tmt_sipsik', label: 'TMT SIPSIK', type: 'date', section: 'lisensi' },
    { id: 'masaberlakusipsik', label: 'Masa Berlaku SIPSIK', type: 'date', section: 'lisensi' },
    { id: 'no_str', label: 'No. Surat Tanda Registrasi (STR)', type: 'text', section: 'lisensi' },
    { id: 'tmt_str', label: 'TMT STR', type: 'date', section: 'lisensi' },
    { id: 'masaberlakustr', label: 'Masa Berlaku STR', type: 'date', section: 'lisensi' }
];

let dataPegawaiCache = [];

document.addEventListener("DOMContentLoaded", () => {
    // Render elemen input formulir ke masing-masing tab secara otomatis
    renderFormInputs();
    
    // Ambil referensi elemen DOM
    const modal = document.getElementById("pegawai-modal");
    const btnTambah = document.getElementById("btn-tambah-pegawai");
    const btnCloseModal = document.getElementById("close-modal");
    const btnBatal = document.getElementById("btn-batal");
    const btnSimpan = document.getElementById("btn-simpan");
    const searchInput = document.getElementById("search-input");

    // Event Listeners
    btnTambah.addEventListener("click", () => openModalForm());
    btnCloseModal.addEventListener("click", closeModalForm);
    btnBatal.addEventListener("click", closeModalForm);
    btnSimpan.addEventListener("click", handleSimpanData);
    searchInput.addEventListener("input", handlePencarian);

    // Ambil Data Awal dari Database Supabase
    fetchDataPegawai();
});

// 2. RENDERING FORM INPUT SECARA OTOMATIS BERDASARKAN METADATA ARRAYS
function renderFormInputs() {
    fieldsMetadata.forEach(field => {
        const container = document.getElementById(`tab-${field.section}`);
        if (!container) return;

        const formGroup = document.createElement("div");
        formGroup.className = "flex flex-col space-y-1";

        const labelHtml = `<label class="text-xs font-bold text-slate-600">${field.label} ${field.required ? '<span class="text-rose-500">*</span>' : ''}</label>`;
        let inputHtml = "";

        if (field.type === "select") {
            inputHtml = `<select id="${field.id}" class="w-full border border-slate-200 text-sm bg-slate-50 px-3 py-2 rounded-xl focus:bg-white focus:ring-2">
                <option value="">-- Pilih ${field.label} --</option>
                ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>`;
        } else if (field.type === "textarea") {
            inputHtml = `<textarea id="${field.id}" rows="2" class="w-full border border-slate-200 text-sm bg-slate-50 px-3 py-2 rounded-xl focus:bg-white focus:ring-2"></textarea>`;
        } else {
            inputHtml = `<input type="${field.type}" id="${field.id}" class="w-full border border-slate-200 text-sm bg-slate-50 px-3 py-2 rounded-xl focus:bg-white focus:ring-2">`;
        }

        formGroup.innerHTML = labelHtml + inputHtml;
        container.appendChild(formGroup);
    });
}

// 3. AMBIL DATA DARI TABEL SUPABASE MASTER PEGAWAI
async function fetchDataPegawai() {
    const tableBody = document.getElementById("pegawai-table-body");
    
    const { data, error } = await window.supabaseClient
        .from("master_pegawai")
        .select("*")
        .order("id_peg", { ascending: false });

    if (error) {
        tableBody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-rose-500 text-xs font-semibold">Gagal Sinkronisasi Supabase: ${error.message}</td></tr>`;
        return;
    }

    dataPegawaiCache = data;
    renderTableData(dataPegawaiCache);
}

// 4. RENDER ROWS TABEL PEGAWAI
function renderTableData(listPegawai) {
    const tableBody = document.getElementById("pegawai-table-body");
    if (listPegawai.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-slate-400 text-xs">Tidak ada data pegawai yang tersedia.</td></tr>`;
        return;
    }

    tableBody.innerHTML = listPegawai.map((peg, index) => `
        <tr class="hover:bg-slate-50/80 transition">
            <td class="p-4 text-center text-slate-400 text-xs">${index + 1}</td>
            <td class="p-4">
                <div class="font-bold text-slate-900">${peg.nama || '-'}</div>
                <div class="text-[11px] text-slate-400 font-medium tracking-wide">Agama: ${peg.agama || '-'} | JK: ${peg.jenis_kelamin || '-'}</div>
            </td>
            <td class="p-4">
                <div class="text-xs text-slate-600"><span class="font-bold text-slate-400">NIK:</span> ${peg.nik || '-'}</div>
                <div class="text-xs text-slate-600"><span class="font-bold text-slate-400">NIP:</span> ${peg.nip || '-'}</div>
            </td>
            <td class="p-4">
                <div class="text-xs text-indigo-600 font-bold">${peg.jabatan || '-'}</div>
                <div class="text-[11px] text-slate-500 font-medium">${peg.ruangan || '-'}</div>
            </td>
            <td class="p-4">
                <div class="text-xs text-slate-600"><i class="fa-solid fa-phone text-slate-300 mr-1 text-[10px]"></i>${peg.no_hp || '-'}</div>
                <div class="text-[11px] text-slate-400 truncate max-w-[150px]"><i class="fa-solid fa-envelope text-slate-300 mr-1 text-[10px]"></i>${peg.email || '-'}</div>
            </td>
            <td class="p-4 text-center">
                <div class="flex items-center justify-center gap-1.5">
                    <button onclick="editPegawai(${peg.id_peg})" class="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-bold transition flex items-center gap-1">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button onclick="hapusPegawai(${peg.id_peg})" class="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold transition flex items-center gap-1">
                        <i class="fa-solid fa-trash-can"></i> Hapus
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 5. FITUR FILTER PENCARIAN REALTIME
function handlePencarian(e) {
    const keyword = e.target.value.toLowerCase();
    const filtered = dataPegawaiCache.filter(peg => 
        (peg.nama && peg.nama.toLowerCase().includes(keyword)) ||
        (peg.nik && peg.nik.toLowerCase().includes(keyword)) ||
        (peg.nip && peg.nip.toLowerCase().includes(keyword))
    );
    renderTableData(filtered);
}

// 6. MANAJEMEN MODAL DAN TAB FORM
window.switchTab = function(tabId) {
    document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll(".tab-btn").forEach(el => {
        el.classList.remove("border-indigo-600", "text-indigo-600", "font-bold");
        el.classList.add("border-transparent", "text-slate-500", "font-semibold");
    });

    document.getElementById(tabId).classList.remove("hidden");
    const currentBtn = document.getElementById(`btn-${tabId}`);
    currentBtn.classList.remove("border-transparent", "text-slate-500", "font-semibold");
    currentBtn.classList.add("border-indigo-600", "text-indigo-600", "font-bold");
}

function openModalForm(idPeg = null) {
    const modal = document.getElementById("pegawai-modal");
    const form = document.getElementById("pegawai-form");
    const modalTitle = document.getElementById("modal-title");
    
    form.reset();
    document.getElementById("id_peg").value = "";
    switchTab('tab-pribadi');

    if (idPeg) {
        modalTitle.textContent = "Ubah Informasi Master Pegawai";
        const pegData = dataPegawaiCache.find(p => p.id_peg === idPeg);
        if (pegData) {
            document.getElementById("id_peg").value = pegData.id_peg;
            fieldsMetadata.forEach(field => {
                const element = document.getElementById(field.id);
                if (element) element.value = pegData[field.id] || "";
            });
        }
    } else {
        modalTitle.textContent = "Registrasi Master Pegawai Baru";
    }
    modal.classList.remove("hidden");
}

function closeModalForm() {
    document.getElementById("pegawai-modal").classList.add("hidden");
}

// 7. OPERASI SIMPAN DATA (INSERT & UPDATE KEDUA-DUANYA)
async function handleSimpanData() {
    const idPeg = document.getElementById("id_peg").value;
    
    // Validasi data wajib minimal
    const nik = document.getElementById("nik").value;
    const nama = document.getElementById("nama").value;
    if (!nik || !nama) {
        alert("Kolom NIK dan Nama Lengkap wajib diisi!");
        return;
    }

    // Bangun payload objek dinamis dari seluruh input 60 field
    const payload = {};
    fieldsMetadata.forEach(field => {
        const inputEl = document.getElementById(field.id);
        if (inputEl) {
            let val = inputEl.value;
            if (field.type === "number") {
                val = val ? parseInt(val) : 0;
            } else if (val === "") {
                val = null; // Set null agar valid di format PostgreSQL
            }
            payload[field.id] = val;
        }
    });

    let resultError = null;

    if (idPeg) {
        // PROSES EDIT DATA (UPDATE)
        const { error } = await window.supabaseClient
            .from("master_pegawai")
            .update(payload)
            .eq("id_peg", idPeg);
        resultError = error;
    } else {
        // PROSES TAMBAH DATA (INSERT)
        const { error } = await window.supabaseClient
            .from("master_pegawai")
            .insert([payload]);
        resultError = error;
    }

    if (resultError) {
        alert("Gagal melakukan penyimpanan: " + resultError.message);
    } else {
        alert("Data master pegawai berhasil disimpan dengan sukses!");
        closeModalForm();
        fetchDataPegawai();
    }
}

// 8. OPERASI HAPUS DATA (DELETE)
window.editPegawai = function(idPeg) {
    openModalForm(idPeg);
}

window.hapusPegawai = function(idPeg) {
    if (confirm("Apakah Anda yakin ingin menghapus permanen data pegawai ini?")) {
        executeHapusPegawai(idPeg);
    }
}

async function executeHapusPegawai(idPeg) {
    const { error } = await window.supabaseClient
        .from("master_pegawai")
        .delete()
        .eq("id_peg", idPeg);

    if (error) {
        alert("Gagal menghapus data: " + error.message);
    } else {
        alert("Data pegawai berhasil dihapus.");
        fetchDataPegawai();
    }
}
