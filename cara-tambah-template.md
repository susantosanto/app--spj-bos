# 📘 PANDUAN LENGKAP: MENAMBAH & EDIT TEMPLATE (MODULARISASI)

## 📊 STRUKTUR MODULARISASI SEKARANG

### File Template yang Ada:

```
📁 app-spj-bos/
├── 📄 js_templates.html           ← Include semua tpl_*.html
├── 📄 tpl_kwitansi.html           ← Template Kwitansi
├── 📄 tpl_nota.html               ← Template Nota (Standard, RM Family, Cahya Cellular, dll)
├── 📄 tpl_pesanan.html            ← Template Surat Pesanan
├── 📄 tpl_berita_acara.html       ← Template BA Serah Terima
├── 📄 tpl_undangan.html           ← Template Surat Undangan
├── 📄 tpl_notulen.html            ← Template Notulen
├── 📄 tpl_daftar_hadir.html       ← Template Daftar Hadir
├── 📄 tpl_dokumentasi.html        ← Template Dokumentasi
├── 📄 tpl_rencana.html            ← Template Rencana
├── 📄 tpl_spk.html                ← Template SPK
├── 📄 tpl_spk_guru.html           ← Template PKS Guru
├── 📄 tpl_spk_tenaga.html         ← Template PKS Tenaga
├── 📄 tpl_sk_tugas.html           ← Template SK Tugas
└── 📄 tpl_daftar_honor.html       ← Template Daftar Honor
```

### File Form Input yang Ada:

```
📁 form_*.html (14 files)
├── form_base_fields.html          ← Form dasar (nomor, tanggal, uraian, jumlah)
├── form_pesanan.html              ← Form khusus pesanan (jenis kegiatan, rincian)
├── form_makanan.html              ← Rincian makanan
├── form_barang.html               ← Rincian barang
├── form_jasa.html                 ← Rincian jasa
├── form_nota_items.html           ← Input item nota
├── form_dokumentasi.html          ← Upload foto dokumentasi
├── form_notulen.html              ← Input hasil notulen
├── form_attendance.html           ← Input daftar hadir
├── form_spk.html                  ← Form SPK
├── form_spk_guru.html             ← Form PKS Guru
├── form_spk_tenaga.html           ← Form PKS Tenaga
├── form_sk_tugas.html             ← Form SK Tugas
├── form_daftar_honor.html         ← Form Daftar Honor
├── form_rencana.html              ← Form Rencana
└── form_common_footer.html        ← Form footer bersama (vendor, stempel, layout)
```

---

---

## 📝 CARA EDIT/UPDATE TEMPLATE YANG SUDAH ADA

### CONTOH KASUS: Mengubah Template "Surat Undangan"

---

### ⚠️ PENTING SEBELUM EDIT:

1. **Backup file terlebih dahulu**
   ```bash
   cp tpl_undangan.html tpl_undangan.html.backup
   ```

2. **Catat perubahan yang akan dibuat**
   - Apa yang ingin diubah? (Layout, styling, content)
   - Apakah perlu form input baru?
   - Apakah perlu parameter baru?

3. **Test di browser setelah setiap perubahan**

---

### 📝 STEP 1: BUKA FILE TEMPLATE YANG ADA

**File:** `tpl_undangan.html`

```html
<!-- tpl_undangan.html - Surat Undangan Template -->
<script>
    function getUndanganHtml(schoolData, schoolKop, nomorSurat, perihal, cleanUraian, ...) {
        // ... existing code ...
    }

    window.getUndanganHtml = getUndanganHtml;
</script>
```

---

### 📝 STEP 2: IDENTIFIKASI YANG INGIN DIUBAH

#### **A. Mengubah Styling/Design** ✅

**Contoh:** Mengubah font dari Times New Roman ke Arial

**SEBELUM:**
```javascript
return `
    <div style="font-family: 'Times New Roman', Times, serif; ...">
        ...
    </div>
`;
```

**SESUDAH:**
```javascript
return `
    <div style="font-family: 'Arial', sans-serif; ...">
        ...
    </div>
`;
```

**Testing:**
1. Refresh browser
2. Pilih "Surat Undangan"
3. Check preview - font harus berubah

---

#### **B. Menambahkan Content Baru** ✅

**Contoh:** Menambahkan field "Lampiran" di surat undangan

**1. Edit template function - tambahkan parameter:**

**File:** `tpl_undangan.html`

**SEBELUM:**
```javascript
function getUndanganHtml(schoolData, schoolKop, nomorSurat, perihal, cleanUraian,
                         tanggalPesan, datePesanInfo, tanggalKegiatan, dateKegiatanInfo,
                         hari, tempatKegiatan, waktuKegiatan, tembusan) {
```

**SESUDAH (tambah parameter lampiran):**
```javascript
function getUndanganHtml(schoolData, schoolKop, nomorSurat, perihal, cleanUraian,
                         tanggalPesan, datePesanInfo, tanggalKegiatan, dateKegiatanInfo,
                         hari, tempatKegiatan, waktuKegiatan, tembusan, lampiran) {
```

**2. Edit template HTML - tambahkan content:**

**SEBELUM:**
```javascript
return `
    ...
    <div style="display: grid; grid-template-columns: 100px 20px 1fr; gap: 5px;">
        <div>Nomor</div><div>:</div><div>${nomorSurat}</div>
        <div>Sifat</div><div>:</div><div>Biasa</div>
        <div>Lampiran</div><div>:</div><div>-</div>
        ...
    </div>
`;
```

**SESUDAH (gunakan parameter lampiran):**
```javascript
return `
    ...
    <div style="display: grid; grid-template-columns: 100px 20px 1fr; gap: 5px;">
        <div>Nomor</div><div>:</div><div>${nomorSurat}</div>
        <div>Sifat</div><div>:</div><div>Biasa</div>
        <div>Lampiran</div><div>:</div><div>${lampiran || '-'}</div>
        ...
    </div>
`;
```

**3. Update js_preview.html - tambahkan parameter:**

**File:** `js_preview.html`

**SEBELUM:**
```javascript
} else if (docType === 'undangan') {
    const hari = document.getElementById('custHari')?.value || dateKegiatanInfo.dayName;
    html = getUndanganHtml(schoolData, schoolKop, nomorSurat, perihal, cleanUraian,
                           tanggalPesan, datePesanInfo, tanggalKegiatan, dateKegiatanInfo,
                           hari, tempatKegiatan, waktuKegiatan, tembusan);
}
```

**SESUDAH (tambah parameter lampiran):**
```javascript
} else if (docType === 'undangan') {
    const hari = document.getElementById('custHari')?.value || dateKegiatanInfo.dayName;
    const lampiran = document.getElementById('custLampiranUndangan')?.value || '-';
    html = getUndanganHtml(schoolData, schoolKop, nomorSurat, perihal, cleanUraian,
                           tanggalPesan, datePesanInfo, tanggalKegiatan, dateKegiatanInfo,
                           hari, tempatKegiatan, waktuKegiatan, tembusan, lampiran);
}
```

**4. Update/Tambah form input (jika perlu):**

**File:** `form_undangan.html` (atau tambahkan di form yang sudah ada)

```html
<div class="form-group">
    <label>Lampiran</label>
    <input type="text" id="custLampiranUndangan" oninput="updatePreview()"
           placeholder="Contoh: 1 Berkas Proposal">
</div>
```

**Testing:**
1. Refresh browser
2. Pilih "Surat Undangan"
3. Isi field "Lampiran"
4. Check preview - lampiran harus muncul

---

#### **C. Mengubah Layout Struktur** ✅

**Contoh:** Mengubah posisi tanda tangan dari kanan ke tengah

**SEBELUM:**
```javascript
return `
    ...
    <div style="display: flex; justify-content: flex-end; padding-right: 50px;">
        <div style="text-align: center;">
            <p style="font-weight: bold; margin-bottom: 80px;">Kepala Sekolah,</p>
            <p style="font-weight: bold; text-decoration: underline; margin:0;">${schoolData.principal}</p>
            <p style="margin:0;">NIP. ${schoolData.principalNip}</p>
        </div>
    </div>
`;
```

**SESUDAH (tengah/center):**
```javascript
return `
    ...
    <div style="display: flex; justify-content: center; margin-top: 40px;">
        <div style="text-align: center; width: 300px;">
            <p style="font-weight: bold; margin-bottom: 80px;">Kepala Sekolah,</p>
            <p style="font-weight: bold; text-decoration: underline; margin:0;">${schoolData.principal}</p>
            <p style="margin:0;">NIP. ${schoolData.principalNip}</p>
        </div>
    </div>
`;
```

**Testing:**
1. Refresh browser
2. Pilih "Surat Undangan"
3. Check preview - tanda tangan harus di tengah

---

#### **D. Menambahkan Logic Baru** ✅

**Contoh:** Menambahkan kondisi untuk menampilkan stempel

**SEBELUM:**
```javascript
return `
    ...
    <div style="text-align: center;">
        <p style="font-weight: bold; margin-bottom: 80px;">Kepala Sekolah,</p>
        <p style="font-weight: bold; text-decoration: underline; margin:0;">${schoolData.principal}</p>
        <p style="margin:0;">NIP. ${schoolData.principalNip}</p>
    </div>
`;
```

**SESUDAH (dengan stempel conditional):**
```javascript
const stampBase64 = data.stampBase64 || null;

return `
    ...
    <div style="text-align: center; position: relative;">
        <p style="font-weight: bold; margin-bottom: 80px;">Kepala Sekolah,</p>
        ${stampBase64 ? `<img src="${stampBase64}" style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 80px; opacity: 0.8;">` : ''}
        <p style="font-weight: bold; text-decoration: underline; margin:0;">${schoolData.principal}</p>
        <p style="margin:0;">NIP. ${schoolData.principalNip}</p>
    </div>
`;
```

**Testing:**
1. Refresh browser
2. Pilih "Surat Undangan"
3. Upload stempel di form
4. Check preview - stempel harus muncul di atas tanda tangan

---

### 📝 STEP 3: TESTING SETELAH EDIT

#### **Checklist Testing:**

- [ ] **Refresh browser** (Ctrl + F5)
- [ ] **Pilih dokumen** yang diedit dari dropdown
- [ ] **Isi semua field** form input
- [ ] **Check preview** - perubahan harus terlihat
- [ ] **Check console** - tidak ada error
- [ ] **Test print** - cetak dokumen, check hasil
- [ ] **Test di mobile** - responsive design (optional)

#### **Common Issues & Solutions:**

| Issue | Cause | Solution |
|-------|-------|----------|
| Preview kosong | Function tidak di-export | Pastikan `window.getNamaTemplate = getNamaTemplate;` |
| Parameter undefined | Parameter tidak di-pass di updatePreview() | Check js_preview.html - updatePreview() |
| Form tidak muncul | handleDocTypeChange() tidak update | Check js_doc_picker.html |
| Styling tidak berubah | Browser cache | Hard refresh (Ctrl + Shift + R) |
| Error di console | Syntax error di template | Check tanda kutip, kurung, template literals |

---

### 📝 STEP 4: VERSION CONTROL (GIT)

**Jika menggunakan Git:**

```bash
# Commit perubahan
git add tpl_undangan.html
git add js_preview.html
git add form_undangan.html (jika ada)
git commit -m "Update undangan template: tambah field lampiran"

# Push ke remote (optional)
git push origin main
```

**Best Practices:**
- Commit setiap perubahan kecil
- Gunakan commit message yang deskriptif
- Tag version jika perubahan besar: `git tag v1.2.0-undangan-update`

---

### 📝 STEP 5: DOKUMENTASI PERUBAHAN

**Update file changelog atau comment di code:**

**File:** `tpl_undangan.html`

```html
<!-- tpl_undangan.html - Surat Undangan Template -->
<!--
  CHANGELOG:
  - 2026-03-05: Added lampiran field (parameter #12)
  - 2026-03-01: Initial modular template
-->
<script>
    /**
     * Template Surat Undangan
     * @param {Object} schoolData - Data sekolah
     * @param {String} schoolKop - Kop surat HTML
     * @param {String} nomorSurat - Nomor surat
     * @param {String} perihal - Perihal surat
     * @param {String} cleanUraian - Uraian bersih (tanpa "Konsumsi")
     * @param {String} tanggalPesan - Tanggal surat
     * @param {Object} datePesanInfo - Date info object
     * @param {String} tanggalKegiatan - Tanggal kegiatan
     * @param {Object} dateKegiatanInfo - Date info object
     * @param {String} hari - Hari kegiatan
     * @param {String} tempatKegiatan - Tempat kegiatan
     * @param {String} waktuKegiatan - Waktu kegiatan
     * @param {String} tembusan - Tembusan surat
     * @param {String} lampiran - Lampiran surat (NEW!)
     * @returns {String} HTML template
     */
    function getUndanganHtml(...) {
        // ... function body ...
    }

    window.getUndanganHtml = getUndanganHtml;
</script>
```

---

## 🎯 CARA MENAMBAH TEMPLATE BARU - STEP BY STEP

### CONTOH KASUS: Menambahkan Template "Surat Keterangan"

---

### 📝 STEP 1: BUAT FILE TEMPLATE BARU

**File:** `tpl_surat_keterangan.html`

```html
<!-- tpl_surat_keterangan.html - Surat Keterangan Template -->
<script>
    /**
     * Template Surat Keterangan
     * @param {Object} schoolData - Data sekolah
     * @param {Object} schoolKop - Kop surat sekolah
     * @param {String} nomorSurat - Nomor surat
     * @param {String} tanggal - Tanggal surat
     * @param {String} uraian - Isi keterangan
     * @returns {String} HTML template
     */
    function getSuratKeteranganHtml(schoolData, schoolKop, nomorSurat, tanggal, uraian) {
        const dateInfo = getDateText(tanggal);
        
        return `
            <div style="font-family: 'Times New Roman', Times, serif; color: #000; padding: 10px 40px; width: 100%; box-sizing: border-box;">
                ${schoolKop}
                
                <div style="text-align: center; margin-bottom: 20px;">
                    <h3 style="text-decoration: underline; margin: 0; font-size: 16px;">SURAT KETERANGAN</h3>
                    <p style="margin: 5px 0 0 0;">Nomor: ${nomorSurat}</p>
                </div>
                
                <p style="text-align: justify; line-height: 1.6;">
                    Yang bertanda tangan di bawah ini Kepala Sekolah <strong>${schoolData.name}</strong>, 
                    Kecamatan ${schoolData.kecamatan}, menerangkan bahwa:
                </p>
                
                <table style="width: 100%; margin: 20px 0;">
                    <tr><td style="width: 200px;">Nama</td><td>: .................................</td></tr>
                    <tr><td>NIP</td><td>: .................................</td></tr>
                    <tr><td>Jabatan</td><td>: .................................</td></tr>
                    <tr><td>Unit Kerja</td><td>: ${schoolData.name}</td></tr>
                </table>
                
                <p style="text-align: justify; line-height: 1.6;">
                    ${uraian}
                </p>
                
                <p style="text-align: justify; line-height: 1.6;">
                    Demikian surat keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.
                </p>
                
                <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
                    <div style="text-align: center;">
                        <p style="margin-bottom: 5px;">${schoolData.kecamatan}, ${dateInfo.fullDate}</p>
                        <p style="font-weight: bold; margin-bottom: 80px;">Kepala Sekolah</p>
                        <p style="font-weight: bold; text-decoration: underline; margin:0;">${schoolData.principal}</p>
                        <p style="margin:0;">NIP. ${schoolData.principalNip}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // ⚠️ PENTING: Export function ke global scope!
    window.getSuratKeteranganHtml = getSuratKeteranganHtml;
</script>
```

---

### 📝 STEP 2: BUAT FILE FORM INPUT (JIKA PERLU)

**Jika template butuh input khusus**, buat file form baru:

**File:** `form_surat_keterangan.html`

```html
<!-- form_surat_keterangan.html - Form Input Surat Keterangan -->
<div id="suratKeteranganSection" style="display: none; border-top: 1px solid #eee; padding-top: 15px; margin-top: 15px;">
    <label style="font-weight: bold; font-size: 14px; margin-bottom: 10px; display: block;">
        Isian Surat Keterangan
    </label>
    
    <div class="form-group">
        <label>Nomor Surat</label>
        <input type="text" id="custNomorSuratKeterangan" oninput="updatePreview()" 
               placeholder="Contoh: 421/SD01-VII/2025">
    </div>
    
    <div class="form-group">
        <label>Isi Keterangan</label>
        <textarea id="custIsiKeterangan" oninput="updatePreview()" rows="5"
                  placeholder="Isi surat keterangan..."
                  style="width:100%; padding:10px; border-radius:8px; border:1px solid #e2e8f0;"></textarea>
    </div>
</div>
```

---

### 📝 STEP 3: UPDATE js_templates.html

**File:** `js_templates.html`

Tambahkan include di bagian bawah (sebelum `</body>` atau di akhir file):

```html
<!-- Load new template -->
<?!= include('tpl_surat_keterangan') ?>
```

**Jika ada form baru**, tambahkan juga di `modal_preview.html`:

```html
<?!= include('form_surat_keterangan') ?>
```

---

### 📝 STEP 4: UPDATE js_doc_picker.html

Tambahkan template baru ke array `docTypes[]`:

**File:** `js_doc_picker.html`

```javascript
function initDocPicker() {
    const docTypes = [
        // ... existing templates ...
        
        // ✅ TAMBAHKAN TEMPLATE BARU DI SINI:
        { 
            id: 'surat_keterangan', 
            name: 'Surat Keterangan', 
            icon: 'file-check',
            color: '#10b981'  // Green
        }
    ];
    
    // ... rest of the code ...
}
```

---

### 📝 STEP 5: UPDATE handleDocTypeChange() DI js_doc_picker.html

Tambahkan logic untuk menampilkan form khusus:

**File:** `js_doc_picker.html`

```javascript
function handleDocTypeChange() {
    const docType = document.getElementById('docType').value;
    
    // ... existing code ...
    
    // ✅ TAMBAHKAN LOGIC UNTUK TEMPLATE BARU:
    const suratKeteranganSection = document.getElementById('suratKeteranganSection');
    
    if (docType === 'surat_keterangan') {
        showFields(['fg-nomor', 'fg-tanggal']);
        if (suratKeteranganSection) suratKeteranganSection.style.display = 'block';
    }
    
    // ... rest of the code ...
}
```

---

### 📝 STEP 6: UPDATE js_preview.html

**A. Tambahkan parameter collection di `collectFormData()`:**

**File:** `js_preview.html`

```javascript
function collectFormData() {
    const getVal = (id) => document.getElementById(id)?.value || "";
    
    return {
        // ... existing fields ...
        
        // ✅ TAMBAHKAN FIELD BARU:
        nomorSuratKeterangan: getVal('custNomorSuratKeterangan'),
        isiKeterangan: getVal('custIsiKeterangan')
    };
}
```

**B. Tambahkan logic di `updatePreview()`:**

**File:** `js_preview.html`

```javascript
function updatePreview() {
    // ... existing code ...
    
    // ✅ TAMBAHKAN LOGIC UNTUK TEMPLATE BARU:
    } else if (docType === 'surat_keterangan') {
        const nomorSurat = document.getElementById('custNomorSuratKeterangan')?.value || "421/SD01-VII/2025";
        const isiKeterangan = document.getElementById('custIsiKeterangan')?.value || "Isi keterangan...";
        
        html = getSuratKeteranganHtml(schoolData, schoolKop, nomorSurat, tanggal, isiKeterangan);
    }
    
    // ... rest of the code ...
}
```

---

### 📝 STEP 7: UPDATE titles DI js_doc_picker.html

Tambahkan judul untuk template baru:

**File:** `js_doc_picker.html`

```javascript
const titles = {
    // ... existing titles ...
    'surat_keterangan': 'Surat Keterangan'
};
```

---

### 📝 STEP 8: TEST TEMPLATE BARU

1. **Refresh browser** (Ctrl + F5)
2. **Buka modal preview** (click tombol "Cetak" di Kelola Transaksi)
3. **Pilih template baru** dari daftar dokumen
4. **Isi form** input yang muncul
5. **Check preview** - HTML harus muncul dengan benar
6. **Check console** - Pastikan tidak ada error

---

## 🎨 BEST PRACTICES

### ✅ DO (Lakukan):

1. **Satu template = satu file** (`tpl_namaTemplate.html`)
2. **Export function ke global**: `window.getNamaTemplate = getNamaTemplate;`
3. **Gunakan JSDoc comments** untuk dokumentasi
4. **Test setelah setiap perubahan**
5. **Gunakan naming convention** yang konsisten:
   - Template: `getNamaTemplateHtml()`
   - Form: `form_namaTemplate.html`
   - Section: `namaTemplateSection`

### ❌ DON'T (Jangan):

1. **Jangan edit js_templates.html** langsung (kecuali untuk include)
2. **Jangan lupa export function** ke global scope
3. **Jangan hardcode values** - gunakan parameters
4. **Jangan skip testing** di browser

---

## 📈 MONITORING & MAINTENANCE

### Check Template Count:

```javascript
// Run in browser console
const templateCount = document.querySelectorAll('script[src*="tpl_"]').length;
console.log('Total templates loaded:', templateCount);
```

### Check Function Availability:

```javascript
// Check if template function exists
console.log('getSuratKeteranganHtml:', typeof window.getSuratKeteranganHtml);
// Should return: "function"
```

---

## 🔄 TROUBLESHOOTING

### Problem: Template tidak muncul di dropdown

**Solution:**
- Check `js_doc_picker.html` - pastikan template ada di array `docTypes[]`
- Refresh browser (Ctrl + F5)

### Problem: Preview kosong

**Solution:**
- Check console untuk error
- Pastikan function di-export: `window.getNamaTemplate = getNamaTemplate;`
- Check `updatePreview()` - pastikan logic ada

### Problem: Form tidak muncul

**Solution:**
- Check `handleDocTypeChange()` - pastikan section ditampilkan
- Check ID form section - harus match dengan yang di-check
- Pastikan form file di-include di `modal_preview.html`

---

## 📚 CONTOH LENGKAP

### Template Sederhana (Surat Keterangan):

**File Structure:**
```
tpl_surat_keterangan.html  ← Template HTML
form_surat_keterangan.html ← Form input (optional)
```

**Code Locations:**
```
js_templates.html      ← Include template
modal_preview.html     ← Include form (if any)
js_doc_picker.html     ← Add to docTypes[] + handleDocTypeChange()
js_preview.html        ← Add to updatePreview() + collectFormData()
```

**Testing:**
```
1. Refresh browser
2. Open preview modal
3. Select "Surat Keterangan"
4. Fill form fields
5. Check preview
6. Check console for errors
```

---

## ✅ CHECKLIST MENAMBAH TEMPLATE BARU

- [ ] Buat file `tpl_namaTemplate.html`
- [ ] Buat function template dengan parameter yang dibutuhkan
- [ ] Export function ke global: `window.getNamaTemplate = getNamaTemplate;`
- [ ] (Optional) Buat file `form_namaTemplate.html` jika perlu input khusus
- [ ] Update `js_templates.html` - tambahkan include
- [ ] (Optional) Update `modal_preview.html` - tambahkan form include
- [ ] Update `js_doc_picker.html` - tambahkan ke array `docTypes[]`
- [ ] Update `js_doc_picker.html` - tambahkan ke `titles` object
- [ ] Update `js_doc_picker.html` - tambahkan logic di `handleDocTypeChange()`
- [ ] Update `js_preview.html` - tambahkan field di `collectFormData()`
- [ ] Update `js_preview.html` - tambahkan logic di `updatePreview()`
- [ ] Test di browser - check preview muncul
- [ ] Test di browser - check console tidak ada error
- [ ] Test di browser - check form input berfungsi

---

## 🎉 SELESAI!

**Dengan mengikuti panduan ini, Anda dapat:**
- ✅ Menambahkan template baru dengan mudah
- ✅ Menjaga kode tetap modular dan terorganisir
- ✅ Mudah maintain dan debug
- ✅ Scalable untuk template masa depan

---

*Dibuat: 2026-03-05*
*Last Updated: 2026-03-05*
*Version: 2.0 (Modular Templates)*
