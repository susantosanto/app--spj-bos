# 📦 Plan Modularisasi Si-BOS — Google Apps Script

> **Analisis & Rencana Pemecahan `FrontEnd.html` (6.161 baris)**
> Dibuat: 03 Maret 2026 | Strategi dipilih & dikonfirmasi: 03 Maret 2026

---

## ✅ STRATEGI YANG DIPILIH

> [!IMPORTANT]
> **Strategi: Parallel File — Zero-Delete Policy**
>
> `FrontEnd.html` (file lama) **TIDAK AKAN DISENTUH, TIDAK AKAN DIEDIT, TIDAK AKAN DIHAPUS SATU BARIS PUN.**
> Semua pekerjaan dilakukan di file-file baru. Switch antara versi lama dan baru dilakukan hanya dengan
> **komentar/uncomment 1 baris di `Code.js`** — tanpa menyentuh file HTML manapun.

---

## 📊 Ringkasan Kondisi File Saat Ini

| Komponen | Baris | % Total |
|---|---|---|
| CSS (`<style>`) | ~1.960 baris | ~32% |
| HTML (struktur & view) | ~1.200 baris | ~20% |
| JavaScript `<script>` | ~3.000 baris | ~48% |
| **TOTAL** | **6.161 baris** | **343 KB** |

### Masalah yang Mendorong Modularisasi

1. **File raksasa** — 6.161 baris dalam 1 HTML, sulit di-debug dan di-extend
2. **CSS tercampur** — 1.960+ baris CSS dalam satu `<style>` tag
3. **14 template dokumen inline** — semua ada di dalam satu fungsi `updatePreview()` yang >1.500 baris
4. **JavaScript monolitik** — navigasi, CRUD, generator, utility semua bercampur
5. **50+ form-group** ditumpuk di satu tab, di-hide/show via JS
6. **Tidak ada pemisahan concern** — UI, logika bisnis, dan template HTML bercampur

---

## 🔑 Mekanisme Switch Versi (Cara Kerja Strategi Ini)

Seluruh kontrol ada di **satu tempat**: `Code.js` — fungsi `doGet()` dan `getMainPageHtml()`.

### State Normal (Sekarang — Versi Lama Aktif)

```javascript
// Code.js — KONDISI SEKARANG (versi lama aktif)

function doGet() {
    return HtmlService.createTemplateFromFile('login')   // ← login tetap sama
        .evaluate()
        .setTitle('Si-BOS | Login Portal')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getMainPageHtml() {
    return HtmlService.createTemplateFromFile('FrontEnd')  // ← versi LAMA
        .evaluate()
        .setTitle('Si-BOS | Sistem Administrasi SPJ')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .getContent();
}
```

### State Testing (Saat Sedang Mengerjakan / Ingin Tes v2)

```javascript
// Code.js — KONDISI TESTING (switch ke versi baru dengan komentar)

function getMainPageHtml() {
    // return HtmlService.createTemplateFromFile('FrontEnd')  // ← lama (di-nonaktifkan)
    return HtmlService.createTemplateFromFile('FrontEnd_v2') // ← baru (diaktifkan)
        .evaluate()
        .setTitle('Si-BOS | Sistem Administrasi SPJ')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .getContent();
}
```

### Rollback Instan (Jika Ada Masalah)

```javascript
// Code.js — ROLLBACK (kembali ke lama dalam 10 detik)

function getMainPageHtml() {
    return HtmlService.createTemplateFromFile('FrontEnd')    // ← lama (aktif lagi)
    // return HtmlService.createTemplateFromFile('FrontEnd_v2') // ← baru (nonaktif)
        .evaluate()
        ...
}
```

> [!TIP]
> **Cara tes tanpa deploy ulang:** Setiap kali `clasp push` setelah mengubah komentar di `Code.js`,
> buka URL deployment → refresh → langsung terlayani oleh versi yang baru ditunjuk.

---

## 🏗️ Standar Struktur File (Google Apps Script — Tanpa Subfolder)

> Google Apps Script tidak mendukung subfolder. Gunakan **prefix nama file** sebagai pengganti namespace.

### Konvensi Penamaan

```
[prefix]_[nama].html
```

| Prefix | Artinya | Contoh |
|---|---|---|
| `css_` | Stylesheet partial | `css_global.html`, `css_print.html` |
| `view_` | Section halaman (view) | `view_dashboard.html`, `view_manage.html` |
| `modal_` | Komponen modal/dialog | `modal_preview.html`, `modal_drive.html` |
| `form_` | Form isian partial | `form_nota_items.html`, `form_spk.html` |
| `tpl_` | Template dokumen HTML (generator) | `tpl_kwitansi.html`, `tpl_nota.html` |
| `js_` | Modul JavaScript | `js_core.html`, `js_templates.html` |

---

## 📐 Struktur File Target Lengkap

```
app-spj-bos/
│
│ ══ FILE YANG TIDAK BOLEH DISENTUH SAMA SEKALI ══════════════════
├── FrontEnd.html            ← 🔒 DIKUNCI — tidak boleh ubah/hapus/edit
├── login.html               ← 🔒 DIKUNCI — tidak berubah
├── Code.js                  ← ⚙️ HANYA boleh ubah 1 baris (komentar doGet)
├── appsscript.json          ← 🔒 DIKUNCI — tidak berubah
│
│ ══ FILE BARU YANG AKAN DIBUAT ══════════════════════════════════
│
├── FrontEnd_v2.html         ← 🎯 ENTRY POINT BARU — skeleton ~50 baris
│                               (hanya berisi <head> global + include() calls)
│
│  ─── CSS PARTIALS ────────────────────────────────────────────────
├── css_global.html          ← :root variables, *, body, input/button font
├── css_sidebar.html         ← .sidebar, .logo-*, .nav-item, .nav-item.active
├── css_dashboard.html       ← .dashboard-hero, .stat-card, .qa-card-minimal
├── css_layout.html          ← .main-content, .view-section, .top-bar, user-pill
├── css_components.html      ← .btn-*, .form-group, input global, .settings-*
├── css_modal.html           ← .modal-overlay, .preview-sidebar, .paper, .doc-card
├── css_print.html           ← seluruh blok @media print { ... }
├── css_toast.html           ← .toast-*, .confirm-*, .spin, @keyframes
│
│  ─── VIEW SECTIONS ───────────────────────────────────────────────
├── view_sidebar.html        ← <div class="sidebar"> + nav-menu + sidebar-footer
├── view_topbar.html         ← <div class="top-bar"> user profile pill + logout btn
├── view_dashboard.html      ← <section id="dashboard-view"> hero + quick access
├── view_upload.html         ← <section id="upload-view"> Drive picker card
├── view_manage.html         ← <section id="manage-view"> tabel transaksi
├── view_settings.html       ← <section id="settings-view"> form + backup/restore
├── view_designer.html       ← <section id="designer-view"> form custom template
│
│  ─── MODAL COMPONENTS ────────────────────────────────────────────
├── modal_preview.html       ← #previewModal: sidebar tab + paper viewport
├── modal_addtx.html         ← #addModal: Tambah Transaksi Manual
├── modal_drive.html         ← #driveModal: Drive File Picker
├── modal_confirm.html       ← #confirmOverlay: Custom Confirm Dialog
├── modal_toast.html         ← #toastContainer
│
│  ─── FORM PARTIALS (isian dalam modal_preview) ───────────────────
├── form_base_fields.html    ← field umum: nomor surat, perihal, vendor, tanggal
├── form_nota_items.html     ← #notaItemsSection (rincian barang nota)
├── form_notulen.html        ← #notulenSection (hasil + kesimpulan)
├── form_attendance.html     ← #attendanceSection (daftar hadir)
├── form_dokumentasi.html    ← #documentationSection (upload foto 1-5)
├── form_pesanan.html        ← rincianMakanan/Barang/JasaSection
├── form_rencana.html        ← #rencanaExtraSection
├── form_spk.html            ← #spkExtraSection
├── form_spk_guru.html       ← #spkGuruHonorerSection
├── form_spk_tenaga.html     ← #spkTenagaHonorerSection
├── form_sk_tugas.html       ← #skPembagianTugasSection
├── form_daftar_honor.html   ← #daftarPenerimaHonorSection
│
│  ─── DOCUMENT TEMPLATES ──────────────────────────────────────────
├── tpl_kwitansi.html        ← getHtml_kwitansi(data)
├── tpl_nota.html            ← getHtml_nota(data) — 7 gaya vendor
├── tpl_pesanan.html         ← getHtml_pesanan(data)
├── tpl_berita_acara.html    ← getHtml_beritaAcara(data)
├── tpl_undangan.html        ← getHtml_undangan(data)
├── tpl_notulen.html         ← getHtml_notulen(data)
├── tpl_daftar_hadir.html    ← getHtml_daftarHadir(data)
├── tpl_dokumentasi.html     ← getHtml_dokumentasi(data)
├── tpl_rencana.html         ← getHtml_rencana(data)
├── tpl_spk.html             ← getHtml_spk(data)
├── tpl_spk_guru.html        ← getHtml_spkGuru(data)
├── tpl_spk_tenaga.html      ← getHtml_spkTenaga(data)
├── tpl_sk_tugas.html        ← getHtml_skTugas(data)
├── tpl_daftar_honor.html    ← getHtml_daftarHonor(data)
│
│  ─── JAVASCRIPT MODULES ──────────────────────────────────────────
├── js_utils.html            ← terbilang(), getDateText(), formatRupiah()
├── js_state.html            ← deklarasi semua variabel global app
├── js_core.html             ← showView(), handleLogout(), clock, toast, confirm
├── js_school_data.html      ← saveData(), loadSchoolData(), backup, restore
├── js_transactions.html     ← renderTransactions(), CRUD, generateSpj()
├── js_drive.html            ← openDrivePicker(), processDriveFile()
├── js_form_rows.html        ← add*Row() semua: nota, attendance, honor, dll.
├── js_doc_picker.html       ← initDocPicker(), selectDocType(), handleDocTypeChange()
├── js_templates.html        ← 14 fungsi getHtml_*() semua template
├── js_preview.html          ← openPreview(), updatePreview(), zoom, layout
└── js_custom_tpl.html       ← saveCustomTemplate(), load, render, delete
```

**Ringkasan: 1 file 6.161 baris → ~46 file kecil, masing-masing < 300 baris**

---

## 🔧 Tambahan di `Code.js` (Tanpa Menghapus yang Lama)

Tambahkan fungsi `include()` helper dan `doGetDev()` di `Code.js`:

```javascript
// ─── TAMBAHKAN di Code.js (jangan hapus yang sudah ada) ───────────

// Helper include untuk FrontEnd_v2 (sistem modular)
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Entry point dev (untuk tes FrontEnd_v2 secara terpisah jika perlu)
// Aktifkan dengan: ganti nama menjadi doGet() sementara, atau panggil manual
function doGetV2() {
    return HtmlService.createTemplateFromFile('FrontEnd_v2')
        .evaluate()
        .setTitle('Si-BOS v2 | DEV MODE')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
```

---

## 📄 Template `FrontEnd_v2.html` — Skeleton Entry Point

Ini adalah isi `FrontEnd_v2.html` yang akan dibuat pertama kali:

```html
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Si-BOS | Sistem Administrasi</title>

    <!-- Google Fonts: Outfit (UI) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Handwriting Fonts (untuk nota) -->
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@300;400;700&family=Nothing+You+Could+Do&family=Reenie+Beanie&family=Shadows+Into+Light&family=Patrick+Hand&family=Indie+Flower&family=Cedarville+Cursive&family=Zeyada&family=La+Belle+Aurore&family=Homemade+Apple&family=Just+Me+Again+Down+Here&display=swap" rel="stylesheet">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- ═══ CSS MODULES ════════════════════════════════ -->
    <?!= include('css_global') ?>
    <?!= include('css_sidebar') ?>
    <?!= include('css_dashboard') ?>
    <?!= include('css_layout') ?>
    <?!= include('css_components') ?>
    <?!= include('css_modal') ?>
    <?!= include('css_print') ?>
    <?!= include('css_toast') ?>
</head>

<body>

    <!-- ═══ SIDEBAR ════════════════════════════════════ -->
    <?!= include('view_sidebar') ?>

    <!-- ═══ MAIN CONTENT ══════════════════════════════ -->
    <div class="main-content">

        <!-- Top Bar -->
        <?!= include('view_topbar') ?>

        <!-- View Sections -->
        <?!= include('view_dashboard') ?>
        <?!= include('view_upload') ?>
        <?!= include('view_manage') ?>
        <?!= include('view_designer') ?>
        <?!= include('view_settings') ?>

        <!-- Modals -->
        <?!= include('modal_preview') ?>
        <?!= include('modal_addtx') ?>
        <?!= include('modal_drive') ?>
        <?!= include('modal_toast') ?>
        <?!= include('modal_confirm') ?>

    </div>

    <!-- ═══ JAVASCRIPT MODULES ════════════════════════ -->
    <!-- Urutan PENTING: utils → state → core → fitur → templates → preview -->
    <?!= include('js_utils') ?>
    <?!= include('js_state') ?>
    <?!= include('js_core') ?>
    <?!= include('js_school_data') ?>
    <?!= include('js_transactions') ?>
    <?!= include('js_drive') ?>
    <?!= include('js_form_rows') ?>
    <?!= include('js_doc_picker') ?>
    <?!= include('js_templates') ?>
    <?!= include('js_preview') ?>
    <?!= include('js_custom_tpl') ?>

</body>
</html>
```

---

## 🪜 Tahapan Implementasi Bertahap

> [!CAUTION]
> **Aturan MUTLAK selama implementasi:**
> - `FrontEnd.html` = **TIDAK BOLEH DIBUKA UNTUK EDIT**, hanya boleh dibaca sebagai referensi
> - Setiap file baru = **salin kode dari FrontEnd.html**, bukan memindahkan (cut)
> - Validasi di browser **sebelum** lanjut ke fase berikutnya

---

### Fase 0 — Persiapan (Lakukan Sekali di Awal)

```
[ ] 1. Buat Git commit untuk snapshot keadaan saat ini:
        git add .
        git commit -m "snapshot: sebelum mulai modularisasi"

[ ] 2. Buat file FrontEnd_v2.html dengan isi skeleton di atas

[ ] 3. Tambahkan fungsi include() dan doGetV2() di Code.js

[ ] 4. clasp push → pastikan tidak ada error di GAS Editor

[ ] 5. Di Code.js, switch sementara ke FrontEnd_v2:
        // Komen baris lama:
        // return HtmlService.createTemplateFromFile('FrontEnd')
        // Aktifkan baris baru:
        return HtmlService.createTemplateFromFile('FrontEnd_v2')
        
[ ] 6. clasp push → buka URL deployment → harus muncul halaman kosong/putih
        (normal — belum ada include yang berisi apapun)
        
[ ] 7. Kembali ke FrontEnd lama:
        return HtmlService.createTemplateFromFile('FrontEnd') // ← aktifkan lagi
        // return HtmlService.createTemplateFromFile('FrontEnd_v2')  // ← nonaktifkan
        
[ ] Fase 0 SELESAI — Fondasi siap
```

---

### Fase 1 — CSS Extraction

> Referensi baris dari `FrontEnd.html` (hanya untuk membaca, bukan mengedit)

```
[ ] 1. Buat css_global.html
       Salin dari FrontEnd.html baris 18–55
       Isi: :root {...}, * {...}, body {...}, input/button font

[ ] 2. Buat css_sidebar.html
       Salin dari FrontEnd.html baris 56–156
       Isi: .sidebar, .logo-*, .nav-item, .nav-item.active, .nav-item:hover

[ ] 3. Buat css_dashboard.html
       Salin dari FrontEnd.html baris 416–838
       Isi: .dashboard-hero, .stat-card-premium, .qa-card-minimal, .clock-widget

[ ] 4. Buat css_layout.html
       Salin dari FrontEnd.html baris 839–953
       Isi: .main-content, .view-section, .view-section.active, .top-bar, user-pill

[ ] 5. Buat css_components.html
       Salin dari FrontEnd.html baris 954–1247
       Isi: .btn-primary, .btn-danger, .form-group, input, label, .settings-*

[ ] 6. Buat css_modal.html
       Salin dari FrontEnd.html baris 1248–1477 dan 1813–1961
       Isi: .modal-overlay, .preview-sidebar, .paper, .doc-card, .doc-selector

[ ] 7. Buat css_print.html
       Salin dari FrontEnd.html baris 1478–1812
       Isi: Seluruh blok @media print { ... }

[ ] 8. Buat css_toast.html
       Salin dari FrontEnd.html baris 151–415
       Isi: .toast-*, .confirm-*, .btn-logout, .spin, @keyframes

──── TEST FASE 1 ────
[ ] Switch Code.js ke FrontEnd_v2 (1 baris komentar)
[ ] clasp push
[ ] Buka URL → cek tampilan: apakah sidebar, warna, font sudah muncul?
[ ] Semua CSS OK? → switch kembali ke FrontEnd lama
[ ] Git commit: "feat: extract CSS partials ke 8 file terpisah"
```

---

### Fase 2 — View Sections

```
[ ] 1. Buat view_sidebar.html
       Salin dari FrontEnd.html baris 1966–2004
       Isi: <div class="sidebar">...</div>

[ ] 2. Buat view_topbar.html
       Salin dari FrontEnd.html baris 2009–2023
       Isi: <div class="top-bar">...</div>

[ ] 3. Buat view_dashboard.html
       Salin dari FrontEnd.html baris 2025–2121
       Isi: <section id="dashboard-view">...</section>

[ ] 4. Buat view_upload.html
       Salin dari FrontEnd.html baris 2123–2155
       Isi: <section id="upload-view">...</section>

[ ] 5. Buat view_manage.html
       Salin dari FrontEnd.html baris 2157–2197
       Isi: <section id="manage-view">...</section>

[ ] 6. Buat view_settings.html
       Salin dari FrontEnd.html baris 2263–2348
       Isi: <section id="settings-view">...</section> (form + backup)

[ ] 7. Buat view_designer.html
       Salin dari FrontEnd.html baris 2199–2261
       Isi: <section id="designer-view">...</section>

──── TEST FASE 2 ────
[ ] Switch Code.js ke FrontEnd_v2
[ ] clasp push
[ ] Cek: semua 5 view bisa dibuka via sidebar? Tabel ada? Dashboard ada?
[ ] Semua View OK? → switch kembali ke lama
[ ] Git commit: "feat: extract view sections ke 7 file terpisah"
```

---

### Fase 3 — Modal Components

```
[ ] 1. Buat modal_toast.html
       Salin dari FrontEnd.html baris 3099–3100
       Isi: <div id="toastContainer">...</div>

[ ] 2. Buat modal_confirm.html
       Salin dari FrontEnd.html baris 3102–3117
       Isi: <div id="confirmOverlay">...</div>

[ ] 3. Buat modal_addtx.html
       Salin dari FrontEnd.html baris 3022–3072
       Isi: <div id="addModal">...</div>

[ ] 4. Buat modal_drive.html
       Salin dari FrontEnd.html baris 3074–3096
       Isi: <div id="driveModal">...</div>

[ ] 5. Buat modal_preview.html (TERBESAR)
       Salin dari FrontEnd.html baris 2350–3021
       Isi: <div id="previewModal">...</div>
       (termasuk semua form fields di dalam tab-form)

──── TEST FASE 3 ────
[ ] Switch Code.js ke FrontEnd_v2
[ ] clasp push
[ ] Cek: modal preview bisa dibuka & ditutup?
[ ] Cek: modal add transaction berfungsi?
[ ] Cek: drive picker muncul?
[ ] Cek: konfirmasi dialog muncul saat hapus?
[ ] Semua Modal OK? → switch kembali ke lama
[ ] Git commit: "feat: extract modal components ke 5 file terpisah"
```

---

### Fase 4 — Form Partials (Pecah dari modal_preview.html)

> Form isian di dalam `modal_preview.html` sangat besar. Fase ini memecahnya lebih jauh.
> Ini opsional jika `modal_preview.html` sudah terasa cukup bersih.

```
[ ] 1. Buat form_base_fields.html
       Isi: fg-nomor, fg-perihal, fg-vendor-style, fg-font-*, fg-vendor-name,
            fg-uraian, fg-jumlah, fg-tanggal, fg-tanggal-pesan, fg-tanggal-kegiatan,
            fg-hari, fg-tempat, fg-waktu, fg-vendor-address,
            fg-tempat-tanggal-kwitansi, fg-tembusan, fg-logo-upload, fg-stamp-upload

[ ] 2. Buat form_nota_items.html   → #notaItemsSection
[ ] 3. Buat form_notulen.html      → #notulenSection
[ ] 4. Buat form_attendance.html   → #attendanceSection
[ ] 5. Buat form_dokumentasi.html  → #documentationSection
[ ] 6. Buat form_pesanan.html      → rincianMakanan/Barang/JasaSection
[ ] 7. Buat form_rencana.html      → #rencanaExtraSection
[ ] 8. Buat form_spk.html          → #spkExtraSection
[ ] 9. Buat form_spk_guru.html     → #spkGuruHonorerSection
[  ] 10. Buat form_spk_tenaga.html → #spkTenagaHonorerSection
[  ] 11. Buat form_sk_tugas.html   → #skPembagianTugasSection
[  ] 12. Buat form_daftar_honor.html → #daftarPenerimaHonorSection

[ ] Update modal_preview.html untuk include form-form di atas

──── TEST FASE 4 ────
[ ] Switch Code.js ke FrontEnd_v2
[ ] clasp push
[ ] Pilih setiap jenis dokumen (14 jenis) → cek semua form fields muncul
[ ] Semua Form OK? → switch kembali ke lama
[ ] Git commit: "feat: extract form partials ke 12 file terpisah"
```

---

### Fase 5 — JavaScript Modules

> Ini adalah fase terbesar. Kerjakan satu file JS per sesi kerja.

```
[ ] 1. Buat js_utils.html (Paling independen — mulai dari sini)
       Salin dari FrontEnd.html baris 3409–3460
       Fungsi: terbilang(), getDateText()

[ ] 2. Buat js_state.html (Variabel global)
       Salin dari FrontEnd.html baris 3391–3407
       Isi: let allTransactions = [], currentScale, logoBase64, stampBase64, dll.

[ ] 3. Buat js_core.html
       Salin dari FrontEnd.html baris 3119–3196
       Fungsi: showView(), handleLogout(), startRealtimeClock(),
               showToast(), showConfirm(), closeConfirm()
               + window.addEventListener('load', ...)

[ ] 4. Buat js_school_data.html
       Salin dari FrontEnd.html baris 3198–3243
       Fungsi: backupData(), restoreData()
               + bagian load school data di window.load

[ ] 5. Buat js_custom_tpl.html
       Salin dari FrontEnd.html baris 3244–3390
       Fungsi: saveCustomTemplate(), loadCustomTemplates(),
               renderSavedTemplatesList(), deleteCustomTemplate()

[ ] 6. Buat js_form_rows.html
       Salin dari FrontEnd.html baris 3706–3878
       Fungsi: addAttendanceRow(), loadDefaultAttendance(),
               addHonorRow(), addNotaItem(), addMakananRow(),
               addBarangRow(), addJasaRow(), updateRincianSections()

[ ] 7. Buat js_doc_picker.html
       Salin dari FrontEnd.html baris 3546–3704
       Fungsi: initDocPicker(), selectDocType(), handleDocTypeChange()

──── TEST SETELAH 7 FILE JS PERTAMA ────
[ ] Switch ke FrontEnd_v2 → clasp push
[ ] Cek: clock berjalan, toast muncul, sidebar navigasi berfungsi
[ ] Cek: tombol tambah transaksi bisa dibuka modalnya
[ ] Kembali ke lama → git commit: "feat: extract JS core modules"

[ ] 8. Buat js_templates.html (File JS terbesar — butuh fokus)
       Salin & refactor dari FrontEnd.html baris 3879–5849 (bagian if/else di updatePreview)
       Pisahkan tiap blok if (docType === '...') menjadi fungsi tersendiri:
         getHtml_kwitansi(data), getHtml_nota(data), getHtml_pesanan(data),
         getHtml_beritaAcara(data), getHtml_undangan(data), getHtml_notulen(data),
         getHtml_daftarHadir(data), getHtml_dokumentasi(data), getHtml_rencana(data),
         getHtml_spk(data), getHtml_spkGuru(data), getHtml_spkTenaga(data),
         getHtml_skTugas(data), getHtml_daftarHonor(data)

[ ] 9. Buat js_preview.html
       Salin dari FrontEnd.html baris 3462–3544 + refactor updatePreview()
       Fungsi: openPreview(), closePreview(), zoomPreview(), changeLayout(),
               handleLogoUpload(), handleStampUpload(), handleDocPhotoUpload(),
               updatePhotoInputs(), switchPreviewTab()
               + updatePreview() yang sudah slim: pakai templateMap → getHtml_*()

[ ] 10. Buat js_transactions.html
        Salin dari FrontEnd.html baris 5850–6039
        Fungsi: renderTransactions(), openAddModal(), closeAddModal(),
                saveManualTransaction(), removeTransaction(), generateSpj()

[ ] 11. Buat js_drive.html
        Salin dari FrontEnd.html baris 6040–6143
        Fungsi: openDrivePicker(), closeDrivePicker(), processDriveFile()

──── TEST FASE 5 FINAL ────
[ ] Switch Code.js ke FrontEnd_v2 (1 baris komentar)
[ ] clasp push
[ ] Jalankan FULL CHECKLIST VERIFIKASI (lihat section di bawah)
[ ] Semua OK? → biarkan FrontEnd_v2 tetap aktif untuk sementara
[ ] Pantau 1–2 hari
[ ] Git commit: "feat: extract semua JS modules — modularisasi SELESAI"
```

---

### Fase 6 — Refactor Template HTML (Opsional — Fase Paling Murni)

```
[ ] Pisahkan setiap fungsi getHtml_*() dari js_templates.html ke file tpl_*.html

[ ] Buat tpl_kwitansi.html    → getHtml_kwitansi(data)
[ ] Buat tpl_nota.html        → getHtml_nota(data)
[ ] Buat tpl_pesanan.html     → getHtml_pesanan(data)
[ ] Buat tpl_berita_acara.html
[ ] Buat tpl_undangan.html
[ ] Buat tpl_notulen.html
[ ] Buat tpl_daftar_hadir.html
[ ] Buat tpl_dokumentasi.html
[ ] Buat tpl_rencana.html
[ ] Buat tpl_spk.html
[ ] Buat tpl_spk_guru.html
[ ] Buat tpl_spk_tenaga.html
[ ] Buat tpl_sk_tugas.html
[ ] Buat tpl_daftar_honor.html

[ ] Update js_templates.html menjadi hanya templateMap + fungsi collectFormData()
[ ] Update include() di FrontEnd_v2.html: tambahkan semua tpl_*.html
[ ] TEST → COMMIT
```

---

## 🔄 Pola updatePreview() Setelah Refactor (Fase 5-6)

Fungsi `updatePreview()` akan menjadi sangat ringkas:

```javascript
// js_preview.html — updatePreview() SETELAH direfactor

function collectFormData() {
    // Kumpulkan semua nilai dari form inputs menjadi satu object
    return {
        docType:    document.getElementById('docType').value,
        vendorStyle: document.getElementById('vendorStyle').value,
        vendorName: document.getElementById('custVendorName').value || "",
        uraian:     document.getElementById('custUraian').value || "Belanja Barang",
        jumlah:     parseFloat(document.getElementById('custJumlah').value) || 0,
        tanggal:    document.getElementById('custTanggal').value || "01/01/2025",
        nomorSurat: document.getElementById('custNomorSurat').value || "",
        fontStyle:  document.getElementById('fontStyle').value,
        fontSize:   document.getElementById('fontSize').value || "16",
        schoolData: {
            name:         document.getElementById('schoolName').value || "SD NEGERI 01",
            address:      document.getElementById('schoolAddress').value || "",
            kecamatan:    document.getElementById('kecamatan').value || "",
            npsn:         document.getElementById('npsn').value || "",
            principal:    document.getElementById('principalName').value || "",
            principalNip: document.getElementById('principalNip').value || "",
            treasurer:    document.getElementById('treasurerName').value || "",
            treasurerNip: document.getElementById('treasurerNip').value || "",
        },
        logoBase64:    logoBase64,
        stampBase64:   stampBase64,
        logoKBBBase64: logoKBBBase64,
        // ... field lainnya
    };
}

function updatePreview() {
    updateRincianSections();

    const data = collectFormData();
    const fontSize = data.fontSize;
    document.getElementById('fontSizeDisplay').innerText = fontSize + 'px';

    // Peta template — tambah entry baru di sini saat ada template baru
    const templateMap = {
        'kwitansi':              getHtml_kwitansi,
        'nota':                  getHtml_nota,
        'pesanan':               getHtml_pesanan,
        'berita_acara':          getHtml_beritaAcara,
        'undangan':              getHtml_undangan,
        'notulen':               getHtml_notulen,
        'daftar_hadir':          getHtml_daftarHadir,
        'dokumentasi':           getHtml_dokumentasi,
        'rencana':               getHtml_rencana,
        'spk':                   getHtml_spk,
        'spk_guru_honorer':      getHtml_spkGuru,
        'spk_tenaga_honorer':    getHtml_spkTenaga,
        'sk_pembagian_tugas':    getHtml_skTugas,
        'daftar_penerima_honor': getHtml_daftarHonor,
    };

    const generator = templateMap[data.docType];
    if (generator) {
        document.getElementById('paperContent').innerHTML = generator(data);
    }
}
```

---

## ✅ Checklist Verifikasi Full (Jalankan Setiap Akhir Fase)

```
CHECKLIST VERIFIKASI — FASE [___]
Tanggal: _______________  Dikerjakan oleh: _______________

TAMPILAN UMUM:
[ ] Sidebar muncul (logo, nav items, footer copyright)
[ ] Semua 5 item navigasi klik-able dan berpindah view
[ ] Top bar muncul (nama user + tombol logout)
[ ] Dashboard: hero section + 4 quick-access cards
[ ] Tidak ada elemen yang aneh posisinya atau hilang

FITUR INTI:
[ ] Upload BKU dari Google Drive → data muncul di tabel
[ ] Tambah Transaksi Manual → modal buka → simpan → muncul di tabel
[ ] Hapus Transaksi → konfirmasi muncul → data hilang dari tabel
[ ] Data Sekolah: isi form → simpan → refresh → data masih ada
[ ] Backup (.json) → file terdownload
[ ] Restore (.json) → data kembali ke tabel

GENERATOR DOKUMEN (test semua 14 jenis):
[ ] Kwitansi SPJ → preview muncul → print OK
[ ] Nota Toko / Invoice → preview → print OK
[ ] Surat Pesanan → preview → print OK
[ ] Berita Acara Serah Terima → preview → print OK
[ ] Surat Undangan → preview → print OK
[ ] Notulen Kegiatan → preview → print OK
[ ] Daftar Hadir → preview → print OK
[ ] Lembar Dokumentasi → preview → print OK
[ ] Dokumen Perencanaan → preview → print OK
[ ] Surat Perintah Kerja (SPK) → preview → print OK
[ ] PKS Guru Honorer → preview → print OK
[ ] PKS Tenaga Honorer → preview → print OK
[ ] SK Pembagian Tugas → preview → print OK
[ ] Daftar Penerima Honor → preview → print OK

PERFORMA & KUALITAS:
[ ] Halaman load < 3 detik
[ ] Tidak ada error merah di konsol browser (F12 → Console)
[ ] Cetak dokumen: tidak terpotong, posisi konten tepat

HASIL: [ ] LULUS → lanjut ke fase berikutnya
        [ ] GAGAL → identifikasi masalah, perbaiki, ulangi checklist
```

---

## 📏 Target Ukuran File Setelah Modularisasi

| Kategori File | Jumlah File | Target Baris per File |
|---|---|---|
| `FrontEnd_v2.html` (entry) | 1 | ~55 baris |
| `css_*.html` | 8 | 50–250 baris |
| `view_*.html` | 7 | 30–150 baris |
| `modal_*.html` | 5 | 50–350 baris |
| `form_*.html` | 12 | 30–100 baris |
| `tpl_*.html` | 14 | 50–300 baris |
| `js_*.html` | 11 | 80–400 baris |
| **TOTAL** | **~58 file** | **< 400 baris max** |

---

## 🎯 Cara Menambah Template Dokumen Baru (Setelah Modularisasi Selesai)

Ini adalah bukti kemudahan yang dicapai setelah modularisasi:

```
Cukup 5 langkah → template baru siap:

1. Buat tpl_nama_baru.html
   → isi dengan fungsi getHtml_namaBaru(data) { return `...html...` }

2. Buat form_nama_baru.html (jika butuh field khusus)
   → isi dengan <div id="namaBaru-section">...</div>

3. Daftar di js_doc_picker.html
   → tambah entry { val: 'nama_baru', name: '...', icon: '...', ... }
     ke dalam array docs[]

4. Daftar di js_preview.html
   → tambah ke templateMap: 'nama_baru': getHtml_namaBaru

5. Include di FrontEnd_v2.html
   → tambah <?!= include('tpl_nama_baru') ?>
   → tambah <?!= include('form_nama_baru') ?> (jika ada)

Selesai. Tidak ada Ctrl+F di 6.000+ baris!
```

---

## 🗓️ Estimasi Waktu Pengerjaan

| Fase | Pekerjaan | Estimasi |
|---|---|---|
| Fase 0 | Persiapan & skeleton | 30 menit |
| Fase 1 | CSS Extraction (8 file) | 2–3 jam |
| Fase 2 | View Sections (7 file) | 1–2 jam |
| Fase 3 | Modal Components (5 file) | 1–2 jam |
| Fase 4 | Form Partials (12 file) | 2–3 jam |
| Fase 5 | JavaScript Modules (11 file) | 5–8 jam |
| Fase 6 | Template Refactor (14 file) | 3–5 jam |
| **Total** | | **~15–24 jam kerja** |

> [!TIP]
> Kerjakan satu fase per sesi. Tidak perlu terburu-buru. Setiap fase menghasilkan kemajuan nyata
> yang bisa ditest langsung, dan selalu bisa rollback dalam hitungan detik.

---

*Plan ini dibuat berdasarkan analisis mendalam FrontEnd.html (6.161 baris, 343 KB).*
*Strategi dipilih & dikonfirmasi: 03 Maret 2026 — Parallel File + Zero-Delete Policy*
