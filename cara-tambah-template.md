# 📖 Cara Menambah Template Dokumen Baru

> **Panduan Lengkap Menambah Template Dokumen di Si-BOS v2 (Modular)**
> Setelah modularisasi, menambah template dokumen baru menjadi sangat mudah!

---

## 🎯 Ringkasan: Cukup 5 Langkah!

```
1. Buat file form partial (jika butuh field khusus)
2. Buat file template HTML
3. Daftarkan di js_doc_picker.html
4. Daftarkan di js_templates.html (templateMap)
5. Include di FrontEnd_v2.html
```

**Selesai!** Tidak perlu lagi Ctrl+F di 6.000+ baris kode!

---

## 📝 Langkah Detail

### Langkah 1: Buat Form Partial (Jika Perlu)

Jika dokumen baru membutuhkan field input khusus, buat file form partial baru:

**File:** `form_nama_dokumen.html`

```html
<!-- Form Partial: Nama Dokumen -->
<div id="namaDokumenSection" style="display: none; margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
    <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 12px;">Detail Nama Dokumen</h4>
    
    <div class="form-group">
        <label>Field Khusus 1</label>
        <input type="text" id="custField1" placeholder="Isi field 1" oninput="updatePreview()">
    </div>
    
    <div class="form-group">
        <label>Field Khusus 2</label>
        <input type="date" id="custField2" onchange="updatePreview()">
    </div>
</div>
```

**Update:** `modal_preview_v2.html`
```html
<!-- Tambahkan include di tab-form -->
<?!= include('form_nama_dokumen') ?>
```

**Update:** `js_form_rows.html`
```javascript
function updateRincianSections() {
    // ... existing code ...
    
    // Tambahkan kondisi untuk dokumen baru
    if (docType === 'nama_dokumen') {
        document.getElementById('namaDokumenSection').style.display = 'block';
    }
}
```

---

### Langkah 2: Buat Template HTML

Buat file template HTML dengan struktur yang sudah ada:

**File:** `tpl_nama_dokumen.html`

```html
<!-- Template: Nama Dokumen -->
<!-- Usage: getHtml_namaDokumen(data) -->
<div style="font-family: Arial, sans-serif; color: #000; padding: 10px 40px; width: 100%; box-sizing: border-box;">
    ${getSchoolKop(data.schoolData)}
    
    <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="margin: 0; font-size: 16px; text-decoration: underline; font-weight: bold;">NAMA DOKUMEN</h2>
        <p style="margin: 5px 0 0 0; font-size: 13px;">Nomor: ${data.nomorSurat}</p>
    </div>
    
    <div style="margin: 20px 0; line-height: 1.8; font-size: 13px;">
        <p style="margin: 0;">Isi dokumen: <strong>${data.uraian}</strong></p>
        <p style="margin: 10px 0 0 0;">Nilai: <strong>Rp ${data.jumlah.toLocaleString('id-ID')}</strong></p>
    </div>
    
    <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
        <div style="text-align: center; width: 250px;">
            <p style="margin-bottom: 5px;">${getDateText(data.tanggal).fullDate}</p>
            <p style="font-weight: bold; margin-bottom: 80px;">Kepala Sekolah</p>
            <p style="font-weight: bold; text-decoration: underline; margin:0;">${data.schoolData.principal}</p>
        </div>
    </div>
</div>
```

**Copy template function** ke `js_templates_2.html`:

```javascript
// Template: Nama Dokumen
function getHtml_namaDokumen(data) {
    // Gunakan template HTML dari file tpl_nama_dokumen.html
    // atau tulis inline seperti contoh di atas
    return `...html template...`;
}
```

---

### Langkah 3: Daftarkan di js_doc_picker.html

**File:** `js_doc_picker.html`

Tambahkan entry baru di array `docs[]`:

```javascript
const docs = [
    // ... existing docs ...
    
    // TAMBAHKAN DOKUMEN BARU DI SINI:
    { 
        val: 'nama_dokumen',           // ID dokumen (harus unik)
        name: 'Nama Dokumen',          // Nama yang ditampilkan
        icon: 'file-text',             // Icon dari Lucide Icons
        color: '#10b981',              // Warna kartu (hex)
        desc: 'Deskripsi dokumen'      // Deskripsi singkat
    }
];
```

---

### Langkah 4: Daftarkan di js_templates.html

**File:** `js_templates.html` atau `js_templates_2.html`

Tambahkan mapping di fungsi `updatePreview()`:

```javascript
function updatePreview() {
    // ... existing code ...
    
    const templateMap = {
        // ... existing templates ...
        
        // TAMBAHKAN TEMPLATE BARU:
        'nama_dokumen': getHtml_namaDokumen,
    };
    
    // ... existing code ...
}
```

---

### Langkah 5: Include di FrontEnd_v2.html

**File:** `FrontEnd_v2.html`

Tambahkan include untuk form partial (jika ada):

```html
<!-- Tab: Form -->
<div id="tab-form" class="preview-tab-content">
    <!-- Base Fields -->
    <?!= include('form_base_fields') ?>
    
    <!-- Existing form sections -->
    <?!= include('form_nota_items') ?>
    <!-- ... -->
    
    <!-- TAMBAHKAN FORM PARTIAL BARU -->
    <?!= include('form_nama_dokumen') ?>
</div>
```

---

## ✅ Checklist Verifikasi

Setelah menambah template baru, pastikan:

```
[ ] File form partial dibuat (jika perlu)
[ ] File template HTML dibuat
[ ] Entry ditambahkan di js_doc_picker.html (array docs[])
[ ] Fungsi getHtml_*() dibuat di js_templates_2.html
[ ] Template ditambahkan ke templateMap di js_preview.html
[ ] Include ditambahkan di FrontEnd_v2.html
[ ] clasp push dilakukan
[ ] Test di browser: dokumen baru muncul di dropdown
[ ] Test di browser: form fields muncul saat dipilih
[ ] Test di browser: preview dokumen berfungsi
[ ] Test di browser: print dokumen berfungsi
```

---

## 📁 Struktur File Setelah Penambahan

```
app-spj-bos/
│
├── FrontEnd_v2.html         ← Entry point (include semua)
│
├── form_nama_dokumen.html   ← Form partial baru
├── tpl_nama_dokumen.html    ← Template HTML referensi
│
├── js_doc_picker.html       ← Daftarkan dokumen baru
├── js_templates_2.html      ← Fungsi getHtml_namaDokumen()
├── js_preview.html          ← TemplateMap entry
│
└── ... (file lainnya)
```

---

## 🎨 Contoh Lengkap: Menambah "Surat Keterangan"

### 1. Buat `form_surat_keterangan.html`

```html
<div id="suratKeteranganSection" style="display: none; margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
    <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 12px;">Detail Surat Keterangan</h4>
    <div class="form-group">
        <label>Keperluan</label>
        <input type="text" id="custKeperluan" placeholder="Contoh: Mengikuti Lomba" oninput="updatePreview()">
    </div>
    <div class="form-group">
        <label>Tempat Tujuan</label>
        <input type="text" id="custTujuan" placeholder="Contoh: Dinas Pendidikan" oninput="updatePreview()">
    </div>
</div>
```

### 2. Buat `tpl_surat_keterangan.html`

```html
<!-- Template: Surat Keterangan -->
<div style="font-family: Arial, sans-serif; padding: 10px 40px;">
    ${getSchoolKop(data.schoolData)}
    <div style="text-align: center; margin: 20px 0;">
        <h2 style="text-decoration: underline;">SURAT KETERANGAN</h2>
        <p>Nomor: ${data.nomorSurat}</p>
    </div>
    <div style="line-height: 1.8;">
        <p>Kepala Sekolah menerangkan bahwa:</p>
        <table style="margin: 15px 0 15px 20px;">
            <tr><td>Nama</td><td>: ${data.vendorName}</td></tr>
            <tr><td>Keperluan</td><td>: ${data.keperluan}</td></tr>
        </table>
        <p>Demikian surat keterangan ini dibuat untuk ${data.tujuan}.</p>
    </div>
    <div style="text-align: right; margin-top: 40px;">
        <p>${getDateText(data.tanggal).fullDate}</p>
        <p style="margin-top: 80px;">${data.schoolData.principal}</p>
    </div>
</div>
```

### 3. Update `js_doc_picker.html`

```javascript
const docs = [
    // ... existing ...
    { 
        val: 'surat_keterangan',
        name: 'Surat Keterangan',
        icon: 'file-check',
        color: '#8b5cf6',
        desc: 'Surat keterangan resmi sekolah'
    }
];
```

### 4. Update `js_templates_2.html`

```javascript
function getHtml_suratKeterangan(data) {
    // Template inline atau load dari tpl_surat_keterangan.html
    return `...html...`;
}
```

### 5. Update `js_preview.html`

```javascript
const templateMap = {
    // ... existing ...
    'surat_keterangan': getHtml_suratKeterangan,
};
```

### 6. Update `FrontEnd_v2.html`

```html
<?!= include('form_surat_keterangan') ?>
```

**Selesai!** Surat Keterangan siap digunakan! 🎉

---

## 💡 Tips & Best Practices

1. **Naming Convention**: Gunakan snake_case untuk nama file dan ID (`surat_keterangan`, bukan `SuratKeterangan`)
2. **Icon Selection**: Pilih icon yang relevan dari [Lucide Icons](https://lucide.dev/icons/)
3. **Template Reuse**: Jika template mirip dengan yang sudah ada, copy-paste dan modifikasi
4. **Testing**: Selalu test di browser setelah setiap penambahan
5. **Documentation**: Update dokumentasi ini setiap kali menambah template baru

---

## 🔧 Troubleshooting

### Template tidak muncul di dropdown?
- Cek spelling di `js_doc_picker.html` (array `docs[]`)
- Pastikan `clasp push` sudah dilakukan

### Form tidak muncul saat dipilih?
- Cek ID section di form partial (`id="xxxSection"`)
- Cek kondisi di `updateRincianSections()` di `js_form_rows.html`

### Preview kosong?
- Cek mapping di `templateMap` (js_preview.html)
- Pastikan fungsi `getHtml_*()` ada di `js_templates_2.html`
- Cek console browser untuk error

### Include tidak bekerja?
- Pastikan nama file benar (tanpa `.html` di include())
- Cek file ada di folder yang sama

---

*Dokumentasi ini dibuat untuk Si-BOS v2 (Modular) - Maret 2026*
