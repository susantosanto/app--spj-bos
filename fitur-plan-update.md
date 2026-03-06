## 🔍 FITUR PENTING YANG HARUS DITAMBAHKAN (Berdasarkan Proses SPJ BOS via SIPLAH)

### 1. **Templat Dokumen "Alternatif SIPLAH" (Untuk Pengadaan Mandiri/Kecil)**
- Karena tidak semua sekolah bisa/memiliki akses SIPLAH, maka aplikasi ini harus bisa **menggantikan sementara** untuk pengadaan kecil (< Rp200 juta) berdasarkan pedomanPerpres No. 12/2021 (diperbarui via Perpres No. 25/2025).
- Template yang harus disediakan:
  - ✅ **Berita Acara Penyerahan & Penerimaan (BAP)**  
  - ✅ **Daftar Rincian Cost (DRC)**  
  - ✅ **Faktur/Tanda Terima Vendor ( BKU )**  
  - ✅ **Berita Acara Pemeriksaan & Penerimaan (BAP)**  
- Semua template sudah berformat: **Kemendikbud Resmi (2026)** → dengan:
  - Logo sekolah,
  - Nomor dokumen otomatis (format: SPJ-BOS/SDN001/2026/XX),
  - Tanda tangan kepala sekolah & bendahara (digital).

### 2. **Import Data via PDF Upload (Scan Dokumen SIPLAH)**
- Fitur penting: **Upload dokumen SPJ siap pakai dari SIPLAH (PDF)** → sistem mengekstrak otomatis:
  - Tanggal dokumen,  
  - Rincian belanja,  
  - Nama vendor,  
  - Total biaya,  
  - QR code internal (untuk validasi keaslian).  
- Jika QR code valid → dokumen otomatis tercatat di sistem, tidak perlu input ulang.

### 3. **Validasi Kebutuhan Dokumen SPJ Real-Time**
- Sistem memberi checklist otomatis sesuai jenis belanja:
  | Belanja | Dokumen Wajib | Catatan |
  |--------|----------------|---------|
  | Barang (< Rp500rb) | BAP + DRC + Foto | Tidak perlu faktur |
  | Jasa & Honor | BAP + Daftar Hadir + Tanda Terima | Harus ada tanda tangan basah |
  | Belanja > Rp500rb | Semua di atas + SPT Pajak | Harus terpotong pajak |
- User bisa klik tombol **"Cek Kelengkapan"** untuk mendapatkan *report pdf* dokumen mana yang belum dilengkapi.

### 4. **Auto-Generate File ZIP "Dokumen SPJ Siap Upload"**
- Tombol **"Siapkan File SPJ"** menghasilkan satu file ZIP berisi:
  - BAP.pdf  
  - DRC.pdf  
  - Foto_dokumentasi.zip (3–5 foto)  
  - BKU_scan.pdf  
- Nama file zip otomatis: `SPJ-SDN001-2026-04-BUKU-tinta.zip`

### 5. **Log Audit & Riwayat Perubahan Dokumen**
- Setiap dokumen memiliki **timeline aktivitas**:
  - `Dibuat oleh: Bpk. X pada 12 Mei 2026, 14.30`
  - `Diverifikasi oleh: Bendahara Y pada 12 Mei 2026, 15.00`
  - `Diunggah ke SIPLAH (catatan): Ya / Tidak`
- Log disimpan secara terenkripsi (Google Apps Script *PropertiesService*).

### 6. **Fitur Sync ke SIPLAH (Manual Entry Mode)**
- Karena akses langsung ke SIPLAH belum bisa via API (kemungkinan tidak tersedia), maka buat **"Manual Export ke Form SIPLAH"**:
  - User klik **"Ekspor ke Form SIPLAH"** → sistem menampilkan **formulir webview dengan data yang sudah diisi** (copy-paste).
  - Data yang dikirim:
    - Nomor dokumen,  
    - Tanggal,  
    - Rincian belanja,  
    - Total,  
    - Nama vendor.  
  - Tujuan: meminimalkan kesalahan input manual saat upload ke SIPLAH.

---

## 🛠️ Catatan Teknis Implementasi (Tanpa Mengubah Fungsi yang Ada)

- Semua fitur baru menggunakan **file CSS yang sudah ada**:  
  - `css_dashboard.html` → untuk UI modern  
  - `css_components.html` → untuk tombol, form, dll  
- Logika ditulis di **`Code.js`**, tetapi hanya penambahan fungsi *baru* (`generateBAP()`, `extractFromPDF()`, `checkSPJCompliance()`, dll) — **tidak mengubah fungsi lama** seperti `createInvoice()` atau `printPDF()`.
- Template HTML sudah tersedia via `form_*.html` (contoh: `form_daftar_honor.html`), bisa dikembangkan untuk dokumen BAP/DRC.
- Fitur upload tetap menggunakan `GoogleAppsScript.BarcodeService` dan `ContentService` — **tidak perlu backend tambahan**.

---

## 📥 Langkah Selanjutnya

Apakah Anda ingin saya:

1. ✍️ **Langsung membuat file `plan-fitur-update.md` dengan semua rekomendasi di atas**,  
2. ✅ **Membuatkan contoh kode untuk fitur "Validasi Dokumen SPJ"** sebagai percobaan awal,  
3. 🎨 **Meng-update UI dashboard ke tampilan "Premium UI 2026"** (seperti permintaan sebelumnya),  
4. 📄 **Membuatkan template HTML dokumen BAP & DRC** yang kompatibel dengan output SIPLAH?

Silakan beri tahu, saya siap membantu sesuai prioritas Anda 😊