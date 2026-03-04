# 📖 CARA MENAMBAH TEMPLATE BARU (TANPA MEMBESARKAN js_templates.html)

## 🎯 STRATEGI: MODULAR TEMPLATE FILES

### ✅ STATUS SEKARANG:

| File | Lines | Purpose |
|------|-------|---------|
| `js_templates.html` | 2,263 | **Existing templates** (14 templates dari FrontEnd.html) |
| `tpl_*.html` | 14 files | **Future templates** (file terpisah) |

---

## 📊 MONITORING UKURAN js_templates.html:

```
Current:  2,263 lines  ✅ OK (manageable)
Warning:  3,000 lines  ⚠️ Consider splitting
Critical: 5,000 lines  ❌ Must split to tpl_*.html
```

---

## ➕ CARA 1: TAMBAH TEMPLATE DI js_templates.html (Untuk Template Kecil)

**Jika template < 200 baris**, tambahkan langsung di `js_templates.html`:

### Step 1: Edit js_templates.html

Buka file `js_templates.html`, cari bagian sebelum `</script>`, tambahkan:

```javascript
function getHtml_namaTemplateBaru() {
    const schoolData = {
        name: document.getElementById('schoolName').value || "SD NEGERI 01",
        kecamatan: document.getElementById('kecamatan').value || "",
        principal: document.getElementById('principalName').value || "",
        principalNip: document.getElementById('principalNip').value || ""
    };
    
    // Get form values
    const uraian = document.getElementById('custUraian').value || "";
    const jumlah = parseFloat(document.getElementById('custJumlah').value) || 0;
    const tanggal = document.getElementById('custTanggal').value || "01/01/2025";
    
    // Your template HTML
    const html = `
        <div style="padding: 40px; font-family: Arial, sans-serif;">
            <h2>Judul Template</h2>
            <p>Content: ${uraian}</p>
        </div>
    `;
    
    return html;
}

// EXPORT GLOBAL (IMPORTANT!)
window.getHtml_namaTemplateBaru = getHtml_namaTemplateBaru;
```

### Step 2: Update js_doc_picker.html

Tambahkan ke array `docs[]`:

```javascript
const docs = [
    // ... existing ...
    { 
        val: 'nama_template_baru', 
        name: 'Nama Template', 
        icon: 'file-text', 
        color: '#3b82f6', 
        desc: 'Deskripsi template' 
    }
];
```

### Step 3: Update js_preview.html

Tambahkan ke `templateMap` di fungsi `updatePreview()`:

```javascript
const templateMap = {
    // ... existing ...
    'nama_template_baru': getHtml_namaTemplateBaru,
};
```

### Step 4: Test

1. Refresh browser
2. Pilih dokumen baru di dropdown
3. Preview harus muncul

---

## ➕ CARA 2: BUAT FILE TERPISAH tpl_*.html (Untuk Template Besar)

**Jika template > 200 baris** atau ingin modular, buat file terpisah:

### Step 1: Buat file `tpl_namaTemplateBaru.html`

```html
<!-- tpl_namaTemplateBaru.html - Nama Template -->
<script>
    function getHtml_namaTemplateBaru() {
        const schoolData = {
            name: document.getElementById('schoolName').value || "SD NEGERI 01",
            kecamatan: document.getElementById('kecamatan').value || "",
            principal: document.getElementById('principalName').value || "",
            principalNip: document.getElementById('principalNip').value || ""
        };
        
        // Get form values
        const uraian = document.getElementById('custUraian').value || "";
        const jumlah = parseFloat(document.getElementById('custJumlah').value) || 0;
        
        // Your template HTML (can be very long - it's in separate file!)
        const html = `
            <div style="...">
                <!-- Complex template HTML -->
            </div>
        `;
        
        return html;
    }
    
    // Export globally
    window.getHtml_namaTemplateBaru = getHtml_namaTemplateBaru;
</script>
```

### Step 2: Update FrontEnd_v2.html

Tambahkan include di bagian bawah (sebelum `</body>`):

```html
<!-- Load new template -->
<?!= include('tpl_namaTemplateBaru') ?>
```

### Step 3: Update js_doc_picker.html

(Same as Cara 1 - Step 2)

### Step 4: Update js_preview.html

(Same as Cara 1 - Step 3)

---

## 🎯 REKOMENDASI:

| Ukuran Template | Metode | File Location |
|-----------------|--------|---------------|
| **< 200 baris** | Cara 1 | js_templates.html |
| **200-500 baris** | Cara 2 | tpl_*.html (separate file) |
| **> 500 baris** | Cara 2 (WAJIB) | tpl_*.html (separate file) |

---

## 📈 MONITORING GROWTH:

### Check current size:

```javascript
// Run in browser console
const lines = document.querySelector('script[src*="js_templates"]').textContent.split('\n').length;
console.log('js_templates.html:', lines, 'lines');

if (lines > 3000) {
    console.warn('⚠️ Warning: Consider splitting to tpl_*.html files');
}
if (lines > 5000) {
    console.error('❌ Critical: Must split to tpl_*.html files NOW');
}
```

### Projected growth:

| Templates Added | Avg Size | Total Lines | Action |
|----------------|----------|-------------|--------|
| Current (14) | - | 2,263 | ✅ OK |
| +5 small | 150 lines | ~3,000 | ⚠️ Warning |
| +5 large | 400 lines | ~4,263 | ⚠️ Should split |
| +10 mixed | 250 lines | ~4,763 | ❌ Must split |

---

## 🔄 MIGRASI KE tpl_*.html (Saat > 3000 baris):

### Step 1: Extract function dari js_templates.html

```javascript
// Copy this function from js_templates.html
function getHtml_namaTemplate() {
    // ... function body ...
}
```

### Step 2: Buat file tpl_namaTemplate.html

```html
<!-- tpl_namaTemplate.html -->
<script>
    function getHtml_namaTemplate() {
        // ... paste function body here ...
    }
    window.getHtml_namaTemplate = getHtml_namaTemplate;
</script>
```

### Step 3: Hapus dari js_templates.html

Delete the function dari js_templates.html

### Step 4: Add include di FrontEnd_v2.html

```html
<?!= include('tpl_namaTemplate') ?>
```

---

## ✅ BEST PRACTICES:

1. **Always export globally**: `window.getHtml_* = getHtml_*;`
2. **Test after adding**: Refresh browser, check preview
3. **Monitor size**: Check js_templates.html lines regularly
4. **Split early**: Don't wait until > 5000 lines
5. **Document**: Add comment di file baru

---

## 📝 EXAMPLE: Adding "Surat Tugas" Template

### File: `tpl_surat_tugas.html`

```html
<!-- surat_tugas.html - Surat Tugas Template -->
<script>
    function getHtml_suratTugas() {
        const schoolData = {
            name: document.getElementById('schoolName').value || "SD NEGERI 01",
            principal: document.getElementById('principalName').value || "",
            principalNip: document.getElementById('principalNip').value || ""
        };
        
        const nomorSurat = document.getElementById('custNomorSurat').value || "";
        const tanggal = document.getElementById('custTanggal').value || "01/01/2025";
        const uraian = document.getElementById('custUraian').value || "";
        
        return `
            <div style="padding: 40px; font-family: Arial, sans-serif;">
                <h2 style="text-align: center; text-decoration: underline;">SURAT TUGAS</h2>
                <p>Nomor: ${nomorSurat}</p>
                <p>Dated: ${tanggal}</p>
                <p>Task: ${uraian}</p>
            </div>
        `;
    }
    
    window.getHtml_suratTugas = getHtml_suratTugas;
</script>
```

### Update FrontEnd_v2.html:

```html
<?!= include('tpl_surat_tugas') ?>
```

### Update js_doc_picker.html:

```javascript
{ 
    val: 'surat_tugas', 
    name: 'Surat Tugas', 
    icon: 'file-check', 
    color: '#10b981', 
    desc: 'Surat tugas guru/karyawan' 
}
```

### Update js_preview.html:

```javascript
const templateMap = {
    // ... existing ...
    'surat_tugas': getHtml_suratTugas,
};
```

---

## 🎉 DONE!

**Dengan pendekatan modular ini:**
- ✅ js_templates.html tidak membengkak
- ✅ Setiap template di file terpisah
- ✅ Mudah maintain dan debug
- ✅ Scalable untuk template baru

**Current Status:**
- 14 templates in js_templates.html (2,263 lines)
- 14 empty tpl_*.html files ready for future use
- Growth: +150-200 lines per new template (in js_templates.html)
- Split point: When js_templates.html > 3,000 lines

---

*Dibuat: 2026-03-04*
*Last Updated: 2026-03-04*
