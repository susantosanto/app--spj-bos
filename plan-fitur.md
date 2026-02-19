# Rencana Fitur Si-BOS
## Sistem Administrasi SPJ Bantuan Operasional Sekolah Dasar

**Revisi berdasarkan research regulasi 2025-2026:** Mengikuti Permendikdasmen No. 8 Tahun 2025, No. 8 Tahun 2026, SBM 2026, dan persyaratan Inspektorat/BPK

**Tanggal:** 18 Februari 2026  
**Versi:** 7.0 (BPK/Inspektorat 2026 Latest Update)

---

## 🍱 RINGKASAN UPDATE - MAKAN MINUM RAPAT/KEGIATAN

### **Dasar Hukum:**
- Permendikdasmen No. 8 Tahun 2025
- Standar Biaya Masukan (SBM) 2026
- Perbup/Perwali Daerah 2025-2026

### **Batas Maksimum Biaya (SBM 2026):**
| Jenis | Batas Maksimum | Keterangan |
|-------|----------------|------------|
| Snack/Ringan | Rp 10.000 - Rp 15.000/orang | Rapat < 4 jam |
| Makan Siang/Malam | Rp 17.500 - Rp 35.000/orang | Rapat > 4 jam |
| Makan + Snack | Rp 25.000 - Rp 45.000/orang | Paket lengkap |

*Catatan: Sesuaikan dengan Perbup/Perwali daerah masing-masing*

### **11 Dokumen Wajib:**
| No | Dokumen | Status | Keterangan |
|----|---------|--------|------------|
| 1 | SPMK (Surat Perintah Melaksanakan Kegiatan) | ✅ | Surat tugas dari Kepala Sekolah |
| 2 | Surat Undangan/Rundown Acara | ✅ | Jadwal kegiatan |
| 3 | **Daftar Hadir Peserta** | 🔴 | **WAJIB** - Nama, instansi, ttd asli |
| 4 | Kwitansi Dinas | ✅ | Tanda terima dari vendor |
| 5 | **Nota/Faktur Asli** | 🔴 | **WAJIB** - Cap toko, alamat, telepon |
| 6 | Surat Pesanan Makan Minum | ✅ | Order ke vendor |
| 7 | BAST (Berita Acara Serah Terima) | ✅ | Serah terima dari vendor |
| 8 | **Rincian Menu** | ⚠️ | Daftar makanan & minuman |
| 9 | Rekapitulasi Peserta | ⚠️ | Total peserta untuk perhitungan |
| 10 | **Foto Dokumentasi** | 🔴 | **WAJIB** - Terlihat makanan di meja |
| 11 | Bukti Potong PPh 23 | ⚠️ | Jika vendor badan usaha & > 750rb |

### **Pajak - PPh 23 (2%):**
```
Kena Pajak Jika:
├─ Vendor berbentuk badan usaha (CV, PT, UD)
├─ Nilai transaksi > Rp 750.000
└─ Tarif: 2% dari jumlah bruto

Contoh:
Total tagihan: Rp 1.000.000
PPh 23 (2%): Rp 20.000
Yang dibayar: Rp 980.000
```

### **Temuan Umum Inspektorat/BPK:**
| Temuan | Status | Solusi |
|--------|--------|--------|
| ❌ Tidak ada daftar hadir | **TMS** | Wajib lampirkan |
| ❌ Foto tidak ada makanan | **TMS** | Foto harus terlihat makanan |
| ❌ Nota tanpa cap toko | **TMS** | Minta cap yang jelas |
| ❌ Harga > SBM daerah | **TMS** | Sesuaikan standar daerah |
| ❌ Tidak potong PPh 23 | **TMS** | Wajib potong 2% |
| ❌ Peserta ≠ Konsumsi | **TMS** | Harus logis |
| ❌ Rapat internal < 2 jam | **TMS** | Tidak boleh makan penuh |

### **Validasi Logika:**
```javascript
// Contoh validasi sederhana
if (jumlahKonsumsi > jumlahPeserta * 1.2) {
    warning("Jumlah konsumsi tidak logis!");
}

if (hargaPerOrang > sbmMaksimum) {
    warning("Harga melebihi SBM daerah!");
}

if (vendorBadanUsaha && total > 750000 && !pph23) {
    warning("Wajib potong PPh 23 (2%)!");
}
```

### **Checklist Cepat Sebelum Submit:**
```
┌─ CHECKLIST SPJ MAKAN MINUM ────────────────────┐
│ [ ] Kwitansi asli ada                          │
│ [ ] Nota ada cap toko                          │
│ [ ] Daftar hadir min. 10 peserta               │
│ [ ] Foto terlihat makanan                      │
│ [ ] Rincian menu lengkap                       │
│ [ ] Perhitungan: peserta x harga satuan        │
│ [ ] PPh 23 dipotong (jika kena)                │
│ [ ] SPMK ditandatangani Kepala Sekolah         │
│ [ ] Harga per orang ≤ SBM daerah               │
│ [ ] Tanggal kwitansi = tanggal kegiatan        │
└────────────────────────────────────────────────┘
```

### **Template Baru yang Perlu Ditambahkan:**
1. 🔴 Template Daftar Hadir Peserta Rapat
2. 🔴 Template Rincian Menu
3. 🔴 Template Rekapitulasi Peserta
4. 🔴 Template SPMK
5. 🔴 Template Surat Pesanan Makan Minum
6. 🔴 Template Bukti Potong PPh 23 (Form 1721-VI)

---

## ⚠️ TEMUAN BPK 2026 - YANG WAJIB DIKETAHUI

### **Kategori Temuan BPK:**

| Kategori | Contoh Temuan | Tindak Lanjut |
|----------|---------------|---------------|
| **Non-Finansial (Administratif)** | - Dokumen kurang lengkap<br>- Tanda tangan kurang<br>- Format tidak sesuai | Evaluasi & perbaikan administrasi |
| **Finansial** | - Pajak tidak dipotong/disetor<br>- Belanja tidak sesuai Juknis<br>- Kelebihan pembayaran<br>- Kwitansi kosong/tidak sah | **WAJIB DIKEMBALIKAN** oleh Kepala Sekolah |

### **Jadwal Pemeriksaan BPK 2026:**
- **Februari 2026**: Pemeriksaan reguler seluruh bendahara BOS
- **Cakupan**: Semua satuan pendidikan (SD, SMP, SMA, SMK)
- **Fokus**: Laporan keuangan lengkap & tertib, detail per item

### **Pernyataan BPK:**
> *"Temuan finansial bersifat zero tolerance - wajib dikembalikan oleh pihak terkait"*  
> *"Pemeriksaan BPK sekarang jauh lebih detail hingga ke item-item laporan"*

---

## 📋 9 KOMPONEN PENGGUNAAN DANA BOS UNTUK SD (LENGKAP)

Berdasarkan **Permendikdasmen No. 8 Tahun 2025** dan **No. 8 Tahun 2026**, SD memiliki **9 komponen** yang dapat dibiayai dari dana BOS:

| No | Komponen | Batas Alokasi |
|----|----------|---------------|
| 1 | Penerimaan Peserta Didik Baru (PPDB) | - |
| 2 | Pengembangan Perpustakaan dan/atau Pojok Baca | **Minimal 10%** |
| 3 | Kegiatan Pembelajaran dan Ekstrakurikuler | - |
| 4 | Evaluasi dan Asesmen Pembelajaran | - |
| 5 | Administrasi Kegiatan Satuan Pendidikan | - |
| 6 | Pengembangan Profesi Pendidik dan Tenaga Kependidikan | - |
| 7 | Langganan Daya dan Jasa | - |
| 8 | Pemeliharaan Sarana dan Prasarana | **Maksimal 20%** |
| 9 | Penyediaan Alat Multimedia Pembelajaran | - |
| **-** | **Pembayaran Honor** | **Maksimal 20%** (negeri) / **40%** (swasta) |

---

## 📑 DOKUMEN SPJ LENGKAP PER KOMPONEN

### **KOMPONEN 1: PENERIMAAN PESERTA DIDIK BARU (PPDB)** 🎒

| Kegiatan | Dokumen Wajib | Keterangan |
|----------|---------------|------------|
| **Publikasi PPDB** | - Kwitansi<br>- Nota/Organisasi event<br>- Dokumentasi foto | Banner, brosur, iklan |
| **Pendaftaran Online** | - Kwitansi<br>- Bukti transfer<br>- Kontrak layanan | Platform pendaftaran |
| **Pengenalan Lingkungan Sekolah** | - Surat Tugas<br>- Daftar Hadir<br>- Kwitansi konsumsi<br>- Foto kegiatan | Untuk siswa baru |
| **Pendataan Ulang** | - Kwitansi ATK<br>- Nota printing | Formulir, laporan |

**Pajak:** Tidak ada pajak khusus  
**Temuan Umum:** Tidak ada dokumentasi foto kegiatan PPDB

---

### **KOMPONEN 2: PENGEMBANGAN PERPUSTAKAAN** 📚 **(MINIMAL 10%)**

| Kegiatan | Dokumen Wajib | Keterangan |
|----------|---------------|------------|
| **Pembelian Buku Teks** | - Surat Pesanan<br>- Kwitansi<br>- Nota/Faktur<br>- BAST<br>- Foto buku<br>- Katalog buku | Rasio 1 buku/siswa/tema |
| **Pembelian Buku Non-Teks** | - Surat Pesanan<br>- Kwitansi<br>- Nota<br>- BAST<br>- Daftar buku | Pengayaan, ensiklopedia |
| **Buku Digital** | - Kontrak lisensi<br>- Kwitansi<br>- Faktur pajak | E-book, platform digital |
| **Rak & Perabot** | - Surat Pesanan<br>- Kwitansi<br>- Nota<br>- BAST<br>- Foto | Aset sekolah |
| **Kegiatan Literasi** | - Surat Tugas<br>- Daftar Hadir<br>- Kwitansi konsumsi<br>- Notulen<br>- Foto | Lomba baca, bedah buku |

**Pajak:** PPh 22 (1.5-3%) jika beli dari distributor non-PKP > Rp 2 juta  
**Temuan Umum:** Buku tidak dicatat dalam inventaris perpustakaan

---

### **KOMPONEN 3: KEGIATAN PEMBELAJARAN DAN EKSTRAKURIKULER** 🎯

| Kegiatan | Dokumen Wajib | Keterangan |
|----------|---------------|------------|
| **Alat/Bahan Pembelajaran** | - Surat Pesanan<br>- Kwitansi<br>- Nota<br>- BAST<br>- Foto barang | Alat peraga, praktikum |
| **Media TIK** | - Surat Pesanan<br>- Kwitansi<br>- Nota<br>- BAST<br>- Foto | Software, aplikasi |
| **Literasi & Numerasi** | - Surat Tugas<br>- Daftar Hadir<br>- Kwitansi<br>- Modul<br>- Foto | Program khusus |
| **Pembelajaran Remedial** | - SK Pembagian Tugas<br>- Daftar Hadir Guru<br>- Daftar Hadir Siswa<br>- Kwitansi honor<br>- Bukti potong PPh 21 | Honor guru |
| **Ekstrakurikuler (Pramuka, Olahraga, Seni)** | - Surat Tugas<br>- Daftar Hadir<br>- Kwitansi<br>- Nota peralatan<br>- Foto kegiatan | Rutin/periodik |
| **Lomba/Kompetisi** | - Surat Undangan<br>- Surat Tugas<br>- SPPD<br>- Kwitansi pendaftaran<br>- Kwitansi konsumsi<br>- Foto | Tingkat kecamatan/kabupaten |

**Pajak:** PPh 21 untuk honor guru > Rp 500.000/hari  
**Temuan Umum:** Tidak ada SK pembagian tugas mengajar untuk remedial

---

### **KOMPONEN 4: EVALUASI DAN ASESMEN PEMBELAJARAN** 📝

| Kegiatan | Dokumen Wajib | Keterangan |
|----------|---------------|------------|
| **Ulangan Harian** | - Kwitansi ATK<br>- Nota printing soal<br>- Daftar Hadir | Per mata pelajaran |
| **Ulangan Tengah/Akhir Semester** | - Surat Tugas (pengawas)<br>- Daftar Hadir<br>- Kwitansi ATK<br>- Nota printing<br>- Kwitansi konsumsi | UTS/UAS |
| **Ujian Kenaikan Kelas** | - SK Panitia<br>- Daftar Hadir<br>- Kwitansi<br>- Nota<br>- Berita Acara | Akhir tahun |
| **Asesmen Nasional** | - SK Panitia<br>- Surat Tugas<br>- Daftar Hadir<br>- Kwitansi<br>- Nota konsumsi<br>- Laporan hasil | Wajib nasional |
| **Tes Kemampuan Akademik** | - Kwitansi<br>- Nota<br>- Daftar Hadir | Tes internal |

**Pajak:** Tidak ada pajak khusus  
**Temuan Umum:** Tidak ada berita acara pelaksanaan ujian

---

### **KOMPONEN 5: ADMINISTRASI KEGIATAN SATUAN PENDIDIKAN** 📋

| Kegiatan | Dokumen Wajib | Keterangan |
|----------|---------------|------------|
| **ATK Rutin** | - Surat Pesanan<br>- Kwitansi<br>- Nota detail<br>- BAST | Kertas, pulpen, dll |
| **Alat Kebersihan** | - Kwitansi<br>- Nota<br>- BAST | Sapu, sabun, dll |
| **Pencetakan Ijazah** | - Kwitansi<br>- Nota<br>- Daftar penerima ijazah | Kelas 6 SD |
| **Pengesahan Fotokopi Ijazah** | - Kwitansi<br>- Buku agenda | Legalisir |
| **Penyusunan RKAS** | - Surat Tugas<br>- Daftar Hadir<br>- Kwitansi konsumsi<br>- Notulen | Rapat perencanaan |
| **Pelaporan** | - Kwitansi<br>- Bukti transfer | Submit laporan triwulan |

**Pajak:** PPh 22 (1.5-3%) untuk ATK > Rp 2 juta dari toko non-PKP  
**Temuan Umum:** Pembelian ATK tidak detail (hanya tulis "ATK" tanpa rincian)

---

### **KOMPONEN 6: PENGEMBANGAN PROFESI PENDIDIK DAN TENAGA KEPENDIDIKAN** 👨‍🏫

| Kegiatan | Dokumen Wajib | Keterangan |
|----------|---------------|------------|
| **Pelatihan/KKG/MGMP** | - Surat Tugas<br>- Daftar Hadir<br>- Kwitansi pendaftaran<br>- SPPD<br>- Sertifikat | Wajib ada sertifikat |
| **Workshop Pembelajaran** | - Surat Tugas<br>- Daftar Hadir<br>- Kwitansi<br>- Notulen<br>- Foto<br>- Materi | Internal/eksternal |
| **Komunitas Belajar** | - Daftar Hadir<br>- Notulen<br>- Kwitansi konsumsi<br>- Foto | Rutin bulanan |
| **Pelatihan Mendalam** | - Surat Tugas<br>- Kwitansi<br>- Sertifikat<br>- Laporan | Deep learning, AI |

**Pajak:** Tidak ada pajak khusus untuk pelatihan  
**Temuan Umum:** Guru tidak membuat laporan/imbas setelah pelatihan

---

### **KOMPONEN 7: LANGGANAN DAYA DAN JASA** 💡

| Kegiatan | Dokumen Wajib | Keterangan |
|----------|---------------|------------|
| **Listrik** | - Kwitansi PLN<br>- Bukti transfer | Bulanan |
| **Air (PDAM)** | - Kwitansi PDAM<br>- Bukti transfer | Bulanan |
| **Telepon** | - Kwitansi<br>- Bukti transfer | Telepon kantor |
| **Internet** | - Kontrak layanan<br>- Kwitansi<br>- Bukti transfer | Bulanan/tahunan |
| **Genset/Panel Surya** | - Surat Pesanan<br>- Kwitansi<br>- Nota<br>- BAST<br>- Foto | Sewa/beli |
| **Pulsa/Paket Data** | - Kwitansi<br>- Bukti transfer | Untuk PJJ |

**Pajak:** Sudah termasuk PPN di tagihan (vendor PKP)
**Temuan Umum:** Tagihan atas nama pribadi, bukan sekolah

---

## 📑 KELENGKAPAN DOKUMEN PER JENIS BELANJA

### **A. BELANJA JASA (SERVICE/PERBAIKAN)** 🔧

#### **1. Service AC**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| SPK | ✅ | Untuk pekerjaan > Rp 500.000 |
| Kwitansi | ✅ | Tanda terima pembayaran |
| Nota Material | ✅ | Freon, pipa, dll (jika ada) |
| Daftar Hadir Tukang | ✅ | Absensi harian |
| Amprah Harian | ✅ | Upah per hari x jumlah hari |
| Foto Before | ✅ | Kondisi AC sebelum service |
| Foto After | ✅ | Kondisi AC setelah service |
| BA Pemeriksaan | ✅ | Verifikasi hasil pekerjaan |

**Pajak:** PPh 21 (5%) jika upah > Rp 500.000/hari

---

#### **2. Service Komputer/Laptop**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| SPK | ✅ | Untuk > Rp 500.000 |
| Kwitansi | ✅ | Tanda terima |
| Nota Sparepart | ✅ | Harddisk, RAM, dll |
| Laporan Pekerjaan | ✅ | Kerusakan & perbaikan |
| Foto Unit | ✅ | Bukti fisik |

**Pajak:** PPh 21 (5%) jika jasa > Rp 500.000

---

#### **3. Perbaikan Listrik**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| SPK | ✅ | Wajib ada |
| Kwitansi | ✅ | Tanda terima |
| Nota Material | ✅ | Kabel, saklar, dll |
| Daftar Hadir | ✅ | Absensi tukang |
| Amprah | ✅ | Upah harian |
| Foto Before-After | ✅ | Instalasi lama & baru |
| BA Pemeriksaan | ✅ | Tes fungsi |

---

#### **4. Perbaikan Atap/Bangunan**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| SPK | ✅ | **WAJIB** jika > Rp 5 juta |
| Kwitansi | ✅ | Tanda terima |
| Nota Material | ✅ | Genteng, semen, kayu |
| Daftar Hadir Tukang | ✅ | Absensi |
| Amprah Harian | ✅ | Upah x hari |
| Foto Before | ✅ | Kondisi rusak |
| Foto After | ✅ | Kondisi selesai |
| BA Pemeriksaan | ✅ | **WAJIB** - BPK sering minta |

**Pajak:**
- PPh 21 (5%) untuk upah tukang
- PPh 22 (1.5-3%) untuk material > Rp 2 juta

---

#### **5. Perbaikan Meubel (Meja/Kursi)**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| SPK | ✅ | Kontrak perbaikan |
| Kwitansi | ✅ | Tanda terima |
| Nota Material | ✅ | Kayu, cat, lem |
| Daftar Hadir | ✅ | Absensi |
| Amprah | ✅ | Upah |
| Foto Before-After | ✅ | Bukti perbaikan |

---

### **B. BELANJA ATK & PERLENGKAPAN** 📝

#### **1. ATK Rutin (Kertas, Pulpen, dll)**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Pesanan | ✅ | Order ke toko |
| Kwitansi | ✅ | Asli |
| **Nota Detail** | ✅ | **WAJIB** - Rincian per item (bukan "ATK" saja) |
| BAST | ✅ | Serah terima barang |
| Foto Barang | ✅ | Bukti fisik |

**Temuan Umum:** Nota hanya tulis "ATK" tanpa rincian → **TMS**

---

#### **2. Tinta Printer & Cartridge**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Pesanan | ✅ | Order |
| Kwitansi | ✅ | Asli |
| Nota | ✅ | Detail tipe & jumlah |
| BAST | ✅ | Terima barang |

---

#### **3. Alat Kebersihan (Sapu, Pel, Sabun)**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Kwitansi | ✅ | Asli |
| Nota | ✅ | Detail item |
| BAST | ✅ | Terima barang |

---

### **C. BELANJA MODAL (ASET/INVENTARIS)** 🏫

#### **1. Komputer/Laptop**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Pesanan | ✅ | Order ke supplier |
| Kwitansi | ✅ | Asli |
| Faktur | ✅ | Detail spesifikasi |
| BAST | ✅ | Serah terima |
| BA Penerimaan | ✅ | Pemeriksaan unit |
| Foto Barang | ✅ | Fisik komputer |
| **Kartu Inventaris** | ✅ | **WAJIB** - Catat aset |
| Label Aset | ✅ | Tempel di barang |

**Pajak:** PPh 22 (1.5-3%) jika > Rp 2 juta

**Temuan BPK:** Aset tidak dicatat inventaris → **TMS**

---

#### **2. Printer/Scanner**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Pesanan | ✅ | Order |
| Kwitansi | ✅ | Asli |
| Nota | ✅ | Detail tipe |
| BAST | ✅ | Terima |
| Foto | ✅ | Fisik |
| Kartu Inventaris | ✅ | Catat aset |

---

#### **3. LCD Proyektor**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Pesanan | ✅ | Order |
| Kwitansi | ✅ | Asli |
| Nota | ✅ | Detail |
| BAST | ✅ | Terima |
| Foto | ✅ | Fisik |
| Kartu Inventaris | ✅ | Wajib |

---

#### **4. Meubel (Meja/Kursi/Rak)**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Pesanan | ✅ | Order |
| Kwitansi | ✅ | Asli |
| Nota | ✅ | Detail jenis & jumlah |
| BAST | ✅ | Terima |
| Foto | ✅ | Fisik barang |
| Kartu Inventaris | ✅ | Catat aset |

---

### **D. BELANJA PERJALANAN DINAS** ✈️

#### **1. Perjalanan Dinas Dalam Kota**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Undangan | ✅ | Dari penyelenggara |
| Surat Tugas | ✅ | Dari Kepala Sekolah |
| **SPPD** | ✅ | **WAJIB** |
| Kwitansi Transport | ✅ | Taksi/ojol/bensin |
| Kwitansi Konsumsi | ✅ | Makan |
| Laporan | ✅ | Ringkasan kegiatan |

---

#### **2. Perjalanan Dinas Luar Kota**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Undangan | ✅ | Asli/fotokopi |
| Surat Tugas | ✅ | Dari Kepala Sekolah |
| **SPPD** | ✅ | **WAJIB** - Form lengkap |
| Tiket | ✅ | Bus/kereta/pesawat |
| Kwitansi Hotel | ✅ | Jika menginap |
| Kwitansi Konsumsi | ✅ | Uang harian |
| Laporan Perjalanan | ✅ | **WAJIB** - Hasil kegiatan |
| Sertifikat | ✅ | Jika ada |

**Temuan Umum:** Tidak ada SPPD, tidak ada laporan → **TMS**

---

### **E. BELANJA HONORARIUM** 💰

#### **1. Honor Guru Tidak Tetap**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Kwitansi Honor | ✅ | Asli, bermaterai jika > Rp 5 juta |
| **Daftar Penerimaan Honor** | ✅ | **WAJIB** - List semua penerima |
| Daftar Hadir Guru | ✅ | Absensi mengajar |
| **SK Pengangkatan** | ✅ | **WAJIB** - Berlaku 1 tahun |
| **SPK** | ✅ | **WAJIB** - Kontrak kerja |
| SK Pembagian Tugas | ✅ | Jadwal mengajar |
| **Bukti Potong PPh 21** | ✅ | **WAJIB** jika > Rp 500.000/hari |
| **Bukti Transfer** | ✅ | **WAJIB** jika > Rp 5 juta |

**Pajak:** PPh 21 (5%) untuk honor > Rp 500.000/hari

**Temuan BPK:**
- ❌ SK tidak ada → **TMS**
- ❌ Tidak ada bukti potong PPh 21 → **FINANSIAL**
- ❌ Tunai > Rp 5 juta → **TMS**

---

#### **2. Honor Guru Ekstrakurikuler**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Kwitansi | ✅ | Asli |
| SK Pembagian Tugas | ✅ | Tugas ekstrakurikuler |
| Daftar Hadir | ✅ | Absensi guru & siswa |
| Bukti Potong PPh 21 | ✅ | Jika > Rp 500.000/hari |

---

#### **3. Honor Tenaga Administrasi**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Kwitansi | ✅ | Asli |
| SK Pengangkatan | ✅ | Wajib |
| Daftar Hadir | ✅ | Absensi |
| Bukti Potong PPh 21 | ✅ | Jika > Rp 500.000/hari |

---

#### **4. Honor Tukang (Harian)**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Kwitansi | ✅ | Asli |
| Daftar Hadir Tukang | ✅ | **WAJIB** - Absensi harian |
| Amprah Harian | ✅ | **WAJIB** - Upah x hari |
| Foto Kegiatan | ✅ | Bukti kerja |

**Pajak:** PPh 21 (5%) jika > Rp 500.000/hari

---

### **F. BELANJA KEGIATAN SISWA** 🎓

#### **1. Lomba/Kompetisi**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Undangan | ✅ | Dari panitia |
| Surat Tugas | ✅ | Guru pendamping |
| SPPD | ✅ | Jika luar kota |
| Kwitansi Pendaftaran | ✅ | Biaya lomba |
| Kwitansi Konsumsi | ✅ | Makan |
| Nota Perlengkapan | ✅ | Kostum, alat, dll |
| Daftar Hadir | ✅ | Peserta |
| Foto Dokumentasi | ✅ | Minimal 3 foto |
| Laporan | ✅ | Hasil lomba |

---

#### **2. Ekstrakurikuler (Pramuka, Olahraga, Seni)**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Tugas | ✅ | Pembina ekskul |
| Daftar Hadir | ✅ | Siswa & pembina |
| Kwitansi | ✅ | Pembelian perlengkapan |
| Nota | ✅ | Detail item |
| Foto Kegiatan | ✅ | Dokumentasi |

---

### **G. BELANJA PELATIHAN GURU** 👨‍🏫

#### **1. KKG/MGMP**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Tugas | ✅ | Dari Kepala Sekolah |
| Daftar Hadir | ✅ | Absensi |
| Kwitansi Pendaftaran | ✅ | Biaya |
| SPPD | ✅ | Jika luar kota |
| **Sertifikat** | ✅ | **WAJIB** |
| **Laporan/Imbas** | ✅ | **WAJIB** - Tindak lanjut |

**Temuan:** Tidak ada laporan/imbas → **TMS**

---

#### **2. Workshop/Diklat**
| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| Surat Tugas | ✅ | Wajib |
| Daftar Hadir | ✅ | Absensi |
| Kwitansi | ✅ | Pendaftaran |
| SPPD | ✅ | Jika luar kota |
| Sertifikat | ✅ | Wajib |
| Laporan | ✅ | Wajib |
| Materi | ✅ | Handout |
| Foto | ✅ | Dokumentasi |

---

### **H. BELANJA MAKAN MINUM RAPAT** 🍱

*(Sudah detail di Komponen 7A)*

**Dokumen Wajib:** 11 dokumen (SPMK, Daftar Hadir, Nota, Rincian Menu, Foto, dll)

**Pajak:** PPh 23 (2%) untuk vendor badan usaha > Rp 750.000

---

### **I. PAJAK & BATASAN PENTING**

#### **Pajak Yang Wajib Dipotong:**
| Pajak | Kena Kena | Tarif |
|-------|-----------|-------|
| PPh 21 | Honor > Rp 500.000/hari | 5% |
| PPh 22 | Belanja > Rp 2 juta (non-PKP) | 1.5-3% |
| PPh 23 | Jasa/Konsumsi > Rp 750.000 | 2% |

#### **Batas Pembayaran:**
| Nominal | Metode |
|---------|--------|
| < Rp 5 juta | Tunai/Transfer |
| ≥ Rp 5 juta | **WAJIB TRANSFER** |

#### **Materai:**
- Kwitansi > Rp 5 juta: **Wajib Materai Rp 10.000**
- SPK: **Wajib Materai**

---

## 🍱 KOMPONEN 7A: MAKAN MINUM RAPAT/KEGIATAN

> ### 📌 RINGKASAN CEPAT
> 
> **Dasar Hukum:** Permendikdasmen No. 8 Tahun 2025 | SBM 2026 | Perbup/Perwali 2025-2026
> 
> **Batas Biaya SBM 2026:**
> - Snack: Rp 10.000 - Rp 15.000/orang (rapat < 4 jam)
> - Makan: Rp 17.500 - Rp 35.000/orang (rapat > 4 jam)
> - Makan + Snack: Rp 25.000 - Rp 45.000/orang
> 
> **11 Dokumen Wajib:**
> 1. SPMK (Surat Perintah Melaksanakan Kegiatan)
> 2. Surat Undangan/Rundown
> 3. **Daftar Hadir Peserta** 🔴
> 4. Kwitansi Dinas
> 5. **Nota/Faktur (ada cap toko)** 🔴
> 6. Surat Pesanan Makan Minum
> 7. BAST
> 8. Rincian Menu
> 9. Rekapitulasi Peserta
> 10. **Foto (terlihat makanan)** 🔴
> 11. Bukti Potong PPh 23 (jika kena)
> 
> **Pajak PPh 23 (2%):** Vendor badan usaha (CV/PT/UD) + nominal > Rp 750.000
> 
> **Temuan Umum TMS:**
> - ❌ Tidak ada daftar hadir
> - ❌ Foto tidak ada makanan
> - ❌ Nota tanpa cap
> - ❌ Harga > SBM
> - ❌ Tidak potong PPh 23
> - ❌ Peserta ≠ konsumsi
> 
> **Checklist Cepat:**
> ```
> [ ] Kwitansi asli ada
> [ ] Nota ada cap toko
> [ ] Daftar hadir min. 10 peserta
> [ ] Foto terlihat makanan
> [ ] Rincian menu lengkap
> [ ] PPh 23 dipotong (jika kena)
> [ ] SPMK ditandatangani
> ```

**Dasar Hukum:**
- Permendikdasmen No. 8 Tahun 2025
- Standar Biaya Masukan (SBM) 2026
- Peraturan Bupati/Wali Kota tentang Standar Biaya Daerah 2025-2026

**Batas Maksimum Biaya (SBM 2026):**
| Jenis | Batas Maksimum | Keterangan |
|-------|----------------|------------|
| **Snack/Ringan** | Rp 10.000 - Rp 15.000/orang | Untuk rapat < 4 jam |
| **Makan Siang/Malam** | Rp 17.500 - Rp 35.000/orang | Untuk rapat > 4 jam atau seharian |
| **Makan + Snack** | Rp 25.000 - Rp 45.000/orang | Paket lengkap |

*Catatan: Harga dapat berbeda per daerah, sesuaikan dengan Perbup/Perwali setempat*

| Dokumen | Wajib | Keterangan |
|---------|-------|------------|
| ✅ **Surat Perintah Melaksanakan Kegiatan (SPMK)** | ✅ | Surat tugas pelaksanaan kegiatan dari Kepala Sekolah |
| ✅ **Surat Undangan/Rundown Acara** | ✅ | Undangan resmi atau jadwal kegiatan |
| ✅ **Daftar Hadir Peserta Rapat** | ✅ | **WAJIB** - Nama lengkap, instansi, tanda tangan asli |
| ✅ **Kwitansi Dinas** | ✅ | Tanda terima pembayaran dari vendor |
| ✅ **Nota/Faktur Asli dari Toko** | ✅ | **WAJIB** - Ada cap toko, alamat, nomor telepon |
| ✅ **Surat Pesanan Makan Minum** | ✅ | Order resmi ke vendor (restoran/catering) |
| ✅ **Berita Acara Serah Terima (BAST)** | ✅ | Serah terima konsumsi dari vendor ke sekolah |
| ✅ **Rincian Menu yang Disajikan** | ✅ | Daftar makanan & minuman yang disajikan |
| ✅ **Rekapitulasi Peserta** | ✅ | Jumlah total peserta untuk perhitungan per-head |
| ✅ **Foto Dokumentasi Kegiatan** | ✅ | **WAJIB** - Foto suasana rapat + foto makanan di meja |
| ✅ **Perhitungan Rincian Biaya** | ✅ | Breakdown: jumlah peserta x harga satuan |
| ✅ **Bukti Transfer** | ✅ | Untuk pembayaran non-tunai (> Rp 5 juta wajib transfer) |
| ⚠️ **Bukti Potong PPh 23** | ⚠️ | **Jika vendor badan usaha & nilai > Rp 750.000** |

**Contoh Perhitungan:**
```
Rapat Koordinasi Guru - 25 Peserta
├─ Snack: 25 orang x Rp 12.000 = Rp 300.000
├─ Makan Siang: 25 orang x Rp 25.000 = Rp 625.000
└─ TOTAL = Rp 925.000

PPh 23 (2%): Rp 925.000 x 2% = Rp 18.500
Net Payment: Rp 925.000 - Rp 18.500 = Rp 906.500
```

**Temuan Umum Inspektorat/BPK:**

| Temuan | Status | Rekomendasi |
|--------|--------|-------------|
| ❌ Tidak ada daftar hadir peserta | **TMS** (Tidak Memenuhi Syarat) | Wajib lampirkan daftar hadir |
| ❌ Foto tidak menunjukkan makanan | **TMS** | Foto harus ada makanan di meja |
| ❌ Nota tanpa cap toko | **TMS** | Minta cap toko yang jelas |
| ❌ Harga melebihi standar biaya daerah | **TMS** | Sesuaikan dengan SBM daerah |
| ❌ Tidak potong PPh 23 untuk vendor badan usaha | **TMS** | Wajib potong PPh 23 (2%) |
| ❌ Jumlah peserta tidak sesuai dengan konsumsi | **TMS** | Harus logis (25 peserta ≠ 50 box) |
| ❌ Makan minum untuk rapat internal < 2 jam | **TMS** | Tidak dapat dipertanggungjawabkan |
| ❌ Kwitansi tanggal berbeda dengan kegiatan | **TMS** | Tanggal kwitansi harus sesuai |

**Ketentuan Penting:**

1. **Rapat Internal Sekolah** (guru & staff saja):
   - Hanya boleh snack untuk rapat > 2 jam
   - Tidak boleh makan penuh kecuali rapat seharian

2. **Rapat dengan Pihak Luar** (pengawas, dinas, komite):
   - Boleh makan + snack
   - Wajib ada daftar hadir lengkap

3. **PPh 23 (2%)**:
   - Wajib potong jika vendor berbentuk **badan usaha** (CV, PT, UD)
   - Tidak perlu potong jika vendor **perorangan** (RM, warung)
   - Threshold: > Rp 750.000 per transaksi

4. **Batas Waktu Pertanggungjawaban**:
   - SPJ harus disusun maksimal **14 hari** setelah kegiatan
   - Submit ke dinas pendidikan sesuai jadwal triwulan

---

### **KOMPONEN 8: PEMELIHARAAN SARANA DAN PRASARANA** 🔧 **(MAKSIMAL 20%)**

| Kegiatan | Dokumen Wajib | Keterangan |
|----------|---------------|------------|
| **Perbaikan Atap/Plafon** | - SPK<br>- Kwitansi<br>- Nota material<br>- Daftar hadir tukang<br>- Amprah harian<br>- Foto before-after<br>- BA Pemeriksaan Hasil | Kontrak jika > Rp 5 juta |
| **Perbaikan Listrik** | - SPK<br>- Kwitansi<br>- Nota<br>- Foto | Instalasi |
| **Pengecatan** | - SPK<br>- Kwitansi<br>- Nota cat<br>- Foto before-after | Ruangan, pagar |
| **Perbaikan Meubel** | - SPK<br>- Kwitansi<br>- Nota<br>- BAST | Meja, kursi |
| **Perbaikan Toilet** | - SPK<br>- Kwitansi<br>- Nota material<br>- Foto before-after<br>- BA Pemeriksaan | Sanitasi |
| **Pemeliharaan Komputer** | - Kwitansi service<br>- Nota sparepart | Laptop, printer |
| **Taman Sekolah** | - Kwitansi<br>- Nota tanaman<br>- Foto | Penghijauan |
| **Aksesibilitas Disabilitas** | - SPK<br>- Kwitansi<br>- Nota<br>- Foto | Ramp, toilet khusus |

**Pajak:** 
- PPh 21 (5%) untuk honor tukang/orang pribadi > Rp 500.000/hari
- PPh 22 (1.5-3%) untuk material > Rp 2 juta

**Temuan Umum BPK:**
- ❌ Tidak ada foto before-after
- ❌ Tidak ada BA pemeriksaan hasil pekerjaan
- ❌ SPK tidak ada untuk pekerjaan > Rp 5 juta
- ❌ Aset hasil perbaikan tidak dicatat

---

### **KOMPONEN 9: PENYEDIAAN ALAT MULTIMEDIA PEMBELAJARAN** 💻

| Kegiatan | Dokumen Wajib | Keterangan |
|----------|---------------|------------|
| **Komputer Desktop/Laptop** | - Surat Pesanan<br>- Kwitansi<br>- Faktur<br>- BAST<br>- Foto<br>- Kartu Inventaris | Aset sekolah |
| **Printer/Scanner** | - Surat Pesanan<br>- Kwitansi<br>- Nota<br>- BAST<br>- Kartu Inventaris | Aset |
| **LCD Proyektor** | - Surat Pesanan<br>- Kwitansi<br>- Nota<br>- BAST<br>- Foto | Aset |
| **Multimedia Lainnya** | - Surat Pesanan<br>- Kwitansi<br>- Nota<br>- BAST | Kamera, speaker |

**Pajak:** 
- PPh 22 (1.5-3%) untuk pembelian > Rp 2 juta dari toko non-PKP
- PPN (11%) jika toko PKP

**Temuan Umum BPK:**
- ❌ Aset tidak dicatat dalam inventaris
- ❌ Tidak ada kartu inventaris barang
- ❌ Barang tidak diberi label aset sekolah

---

### **KOMPONEN TAMBAHAN: PEMBAYARAN HONOR** 💰 **(MAKSIMAL 20% NEGERI / 40% SWASTA)**

| Kegiatan | Dokumen Wajib | Keterangan |
|----------|---------------|------------|
| **Honor Guru Tidak Tetap** | - Kwitansi Honor<br>- Daftar Penerimaan Honor<br>- Daftar Hadir Guru<br>- SK Pengangkatan (1 tahun)<br>- SPK (1 tahun)<br>- SK Pembagian Tugas<br>- Bukti Potong PPh 21<br>- Bukti Transfer | Wajib transfer jika > Rp 5 juta |
| **Honor Guru Ekstrakurikuler** | - Kwitansi<br>- SK Pembagian Tugas<br>- Daftar Hadir<br>- Bukti Potong PPh 21 | Honor per jam/sesi |
| **Honor Tenaga Administrasi** | - Kwitansi<br>- SK Pengangkatan<br>- Daftar Hadir<br>- Bukti Potong PPh 21 | Bendahara, TU |
| **Honor Guru Pengganti** | - Kwitansi<br>- SK Tugas Tambahan<br>- Daftar Hadir<br>- Bukti Potong PPh 21 | Guru berhalangan |

**Pajak:** PPh 21 (5%) untuk honor > Rp 500.000/hari  
**Temuan Umum BPK:**
- ❌ SK pengangkatan tidak ada/tidak berlaku
- ❌ Tidak ada bukti potong PPh 21
- ❌ Pembayaran tunai > Rp 5 juta (harus transfer)
- ❌ Daftar hadir tidak lengkap

---

## 🔍 TEMUAN UMUM BPK/INSPEKTORAT 2025-2026 (UPDATE TERBARU)

### **Kategori Temuan:**

| No | Temuan | Kategori | Tindak Lanjut |
|----|--------|----------|---------------|
| 1 | SPJ tidak didukung bukti lengkap | **TMS** | Lengkapi dokumen |
| 2 | SPJ tidak sah (tidak ada cap/ttd) | **TMS** | Minta cap/ttd lengkap |
| 3 | Pajak tidak dipotong/disetor | **FINANSIAL** | Bayar pajak + denda |
| 4 | Aset tidak dicatat inventaris | **TMS** | Catat dalam inventaris |
| 5 | Belanja melebihi SBM | **FINANSIAL** | Kembalikan kelebihan |
| 6 | Honor melebihi 20% (negeri) | **FINANSIAL** | Revisi penggunaan |
| 7 | Perpustakaan < 10% | **TMS** | Tambah alokasi |
| 8 | Pemeliharaan > 20% | **FINANSIAL** | Revisi penggunaan |
| 9 | Pembayaran tunai > Rp 5 juta | **TMS** | Ubah ke transfer |
| 10 | Tanggal kwitansi tidak sesuai | **TMS** | Minta revisi vendor |
| 11 | Kwitansi kosong/tidak sah | **FINANSIAL** | Ganti dengan kwitansi sah |
| 12 | Belanja tidak sesuai Juknis | **FINANSIAL** | Kembalikan dana |
| 13 | Kelebihan pembayaran | **FINANSIAL** | Kembalikan kelebihan |
| 14 | Tagihan atas nama pribadi | **TMS** | Ubah atas nama sekolah |

### **Kategori Temuan BPK:**
- **TMS** = Tidak Memenuhi Syarat (administratif, perbaikan)
- **FINANSIAL** = Temuan Finansial (wajib dikembalikan)

### **Pernyataan BPK 2026:**
> *"Temuan finansial bersifat zero tolerance - wajib dikembalikan oleh Kepala Sekolah"*  
> *"Pemeriksaan BPK sekarang jauh lebih detail hingga ke item-item laporan"*

### **Yang Diperiksa BPK:**
- ✅ Laporan keuangan lengkap & tertib
- ✅ Detail per item transaksi
- ✅ Kepatuhan pajak (PPh 21/22/23, PPN)
- ✅ Kesesuaian dengan Juknis BOS
- ✅ Aset sekolah (inventaris)
- ✅ Bukti transfer untuk transaksi besar
- ✅ Tanda tangan & cap pada dokumen

---

## ✅ CHECKLIST LENGKAP PER KOMPONEN

### **DOKUMEN WAJIB YANG SERING DIPERIKSA BPK:**

```
┌─ DOKUMEN KRITIS (WAJIB ADA) ───────────────────────────┐
│                                                         │
│  [ ] BKU (Buku Kas Umum) lengkap & rapi                │
│  [ ] Buku Pembantu (Kas Tunai, Bank, Pajak)            │
│  [ ] Kwitansi asli (ada nomor, tanggal, nominal)       │
│  [ ] Nota/faktur (ada cap toko, alamat, telepon)       │
│  [ ] Surat Pesanan (untuk pembelian)                   │
│  [ ] BAST (Berita Acara Serah Terima)                  │
│  [ ] SPK (untuk pekerjaan > Rp 5 juta)                 │
│  [ ] Bukti transfer (untuk transaksi > Rp 5 juta)      │
│  [ ] Bukti potong pajak (PPh 21/22/23)                 │
│  [ ] SK Pengangkatan (untuk honor guru)                │
│  [ ] Daftar Hadir (peserta, guru, tukang)              │
│  [ ] Foto dokumentasi (before-after untuk pemeliharaan)│
│  [ ] Kartu Inventaris (untuk aset/barang modal)        │
│  [ ] Laporan Triwulan (submit tepat waktu)             │
│                                                         │
│  ⚠️ PERHATIAN:                                          │
│  - Semua tanda tangan harus asli (bukan fotokopi)      │
│  - Cap toko harus jelas (bukan stempel biasa)          │
│  - Materai Rp 10.000 untuk kwitansi > Rp 5 juta        │
│  - Tanggal kwitansi harus sesuai tanggal kegiatan      │
│  - Nominal angka = nominal huruf                       │
└─────────────────────────────────────────────────────────┘
```

### **Checklist Umum (Semua Komponen):**
```
[ ] Kwitansi asli ada
[ ] Nota/faktur ada cap toko
[ ] Surat pesanan ada (untuk pembelian)
[ ] BAST ada (untuk barang/jasa)
[ ] Foto dokumentasi ada
[ ] Pajak sudah dipotong (jika kena)
[ ] Bukti transfer ada (jika > Rp 5 juta)
[ ] Tanggal sesuai dengan kegiatan
[ ] Nominal sesuai (angka & huruf)
[ ] Tanda tangan lengkap
```

### **Checklist Khusus per Komponen:**

| Komponen | Checklist Khusus |
|----------|------------------|
| **PPDB** | [ ] Foto kegiatan PPDB |
| **Perpustakaan** | [ ] Katalog buku, [ ] Catatan inventaris perpustakaan |
| **Pembelajaran** | [ ] SK pembagian tugas, [ ] Modul pembelajaran |
| **Evaluasi** | [ ] Berita acara ujian, [ ] Daftar hadir pengawas |
| **Administrasi** | [ ] Rincian ATK (tidak hanya tulis "ATK") |
| **Pengembangan Guru** | [ ] Sertifikat, [ ] Laporan/imbas pelatihan |
| **Langganan** | [ ] Tagihan atas nama sekolah |
| **Pemeliharaan** | [ ] Foto before-after, [ ] BA pemeriksaan, [ ] SPK (>5jt) |
| **Multimedia** | [ ] Kartu inventaris, [ ] Label aset |
| **Honor** | [ ] SK pengangkatan, [ ] Bukti potong PPh 21, [ ] Bukti transfer |

---

## 🎯 FITUR APLIKASI YANG DIPERLUKAN (UPDATE LENGKAP)

### **PRIORITAS MUTLAK** 🔴

#### 1. **Template Per Komponen BOS** (9 Komponen)

| Template | Status | Prioritas |
|----------|--------|-----------|
| Kwitansi | ✅ Ada | - |
| Nota | ✅ Ada | - |
| Surat Pesanan | ✅ Ada | - |
| BAST | ✅ Ada | - |
| SPK | ✅ Ada | - |
| Surat Undangan | ✅ Ada | - |
| Notulen | ✅ Ada | - |
| Daftar Hadir | ✅ Ada | - |
| Dokumentasi Foto | ✅ Ada | - |
| **Surat Tugas** | ⚠️ Perlu | 🔴 |
| **SPPD** | ❌ Belum | 🔴 |
| **SPMK** | ❌ Belum | 🔴 |
| **Daftar Penerimaan Honor** | ❌ Belum | 🔴 |
| **Amprah Uang Harian** | ❌ Belum | 🔴 |
| **Rincian Menu** | ❌ Belum | 🔴 |
| **Rekapitulasi Peserta** | ❌ Belum | 🔴 |
| **Berita Acara Ujian** | ❌ Belum | 🟡 |
| **Berita Acara Pemeriksaan** | ❌ Belum | 🟡 |
| **Kartu Inventaris** | ❌ Belum | 🟡 |
| **Bukti Potong PPh 21** | ❌ Belum | 🔴 |
| **Bukti Potong PPh 22** | ❌ Belum | 🟡 |
| **Bukti Potong PPh 23** | ❌ Belum | 🔴 |

---

#### 2. **Kalkulasi Pajak Otomatis**

| Pajak | Status | Prioritas |
|-------|--------|-----------|
| PPh 21 (Honor > 500rb) | ❌ Belum | 🔴 |
| PPh 22 (Belanja > 2jt) | ❌ Belum | 🟡 |
| PPh 23 (Konsumsi > 750rb) | ❌ Belum | 🔴 |

---

#### 3. **Validasi Per Komponen**

| Validasi | Status | Prioritas |
|----------|--------|-----------|
| Alokasi perpustakaan ≥ 10% | ❌ Belum | 🔴 |
| Alokasi pemeliharaan ≤ 20% | ❌ Belum | 🔴 |
| Alokasi honor ≤ 20%/40% | ❌ Belum | 🔴 |
| Foto before-after (pemeliharaan) | ❌ Belum | 🟡 |
| Kartu inventaris (multimedia) | ❌ Belum | 🟡 |

---

#### 4. **Upload & Attach**

| Upload | Status | Prioritas |
|--------|--------|-----------|
| SK Pengangkatan | ❌ Belum | 🔴 |
| SPK Guru | ❌ Belum | 🔴 |
| Bukti Transfer | ❌ Belum | 🔴 |
| Sertifikat Pelatihan | ❌ Belum | 🟡 |
| Katalog Buku | ❌ Belum | 🟡 |
| BA Pemeriksaan | ❌ Belum | 🟡 |

---

#### 5. **Batch Download ZIP**

| ZIP Bundle | Status | Prioritas |
|------------|--------|-----------|
| Honor Guru | ❌ Belum | 🔴 |
| Pemeliharaan | ❌ Belum | 🔴 |
| Makan Minum | ❌ Belum | 🔴 |
| Perjalanan Dinas | ❌ Belum | 🟡 |
| Pelatihan Guru | ❌ Belum | 🟡 |
| Lengkap Triwulan | ❌ Belum | 🔴 |

---

## 📊 ASSESSMENT FINAL

### **Kesesuaian dengan Regulasi 2025-2026:**

| Aspek | Status | Catatan |
|-------|--------|---------|
| 9 Komponen BOS untuk SD | ✅ Sudah | Semua komponen tercover |
| Batas alokasi (10%, 20%) | ⚠️ Perlu | Validasi persentase |
| Dokumen SPJ lengkap | ⚠️ Perlu | Tambah template khusus |
| Pajak (PPh 21/22/23) | ❌ Belum | Kalkulasi & template |
| Upload dokumen pendukung | ❌ Belum | SK, bukti transfer, dll |
| Batch download | ❌ Belum | ZIP per komponen |
| Validasi aset | ❌ Belum | Kartu inventaris |

### **Kesiapan Menghadapi Pemeriksaan BPK 2026:**

| Kesiapan | Status | Catatan |
|----------|--------|---------|
| Dokumen kritis lengkap | ⚠️ 70% | Perlu template tambahan |
| Kepatuhan pajak | ❌ 0% | Perlu kalkulasi otomatis |
| Aset terinventaris | ❌ 0% | Perlu template kartu inventaris |
| Bukti transfer | ❌ 0% | Perlu fitur upload |
| Laporan triwulan | ⚠️ 50% | Perlu batch download |

### **Fitur yang PERLU DITAMBAHKAN:**

| Fitur | Prioritas | Urgency | Dampak BPK |
|-------|-----------|---------|------------|
| Template Surat Tugas | 🔴 | Critical | Tinggi |
| Template SPPD | 🔴 | Critical | Tinggi |
| Template SPMK | 🔴 | Critical | Tinggi |
| Template Daftar Penerimaan Honor | 🔴 | Critical | **Sangat Tinggi** |
| Template Amprah | 🔴 | Critical | Tinggi |
| Template Bukti Potong PPh 21 | 🔴 | Critical | **Sangat Tinggi** |
| Template Bukti Potong PPh 23 | 🔴 | Critical | **Sangat Tinggi** |
| Kalkulasi PPh 21 | 🔴 | Critical | **Sangat Tinggi** |
| Kalkulasi PPh 23 | 🔴 | Critical | **Sangat Tinggi** |
| Validasi alokasi perpustakaan (≥10%) | 🔴 | Critical | Tinggi |
| Validasi alokasi pemeliharaan (≤20%) | 🔴 | Critical | Tinggi |
| Validasi alokasi honor (≤20%/40%) | 🔴 | Critical | **Sangat Tinggi** |
| Upload SK & Bukti Transfer | 🔴 | Critical | Tinggi |
| Batch Download ZIP | 🔴 | Critical | Sedang |
| Template Berita Acara Pemeriksaan | 🟡 | Important | Sedang |
| Template Kartu Inventaris | 🟡 | Important | Tinggi |
| Validasi foto before-after | 🟡 | Important | Sedang |

### **Risiko Temuan BPK Jika Tidak Ada Fitur:**

| Fitur Tidak Ada | Risiko Temuan | Kategori | Konsekuensi |
|-----------------|---------------|----------|-------------|
| Kalkulasi PPh 21 | Pajak tidak dipotong | **FINANSIAL** | Wajib bayar + denda |
| Kalkulasi PPh 23 | Pajak tidak dipotong | **FINANSIAL** | Wajib bayar + denda |
| Validasi alokasi honor | Honor > 20% | **FINANSIAL** | Wajib kembalikan |
| Validasi alokasi perpustakaan | Perpustakaan < 10% | **TMS** | Revisi laporan |
| Validasi alokasi pemeliharaan | Pemeliharaan > 20% | **FINANSIAL** | Wajib kembalikan |
| Template Bukti Potong | Tidak ada bukti potong | **FINANSIAL** | Wajib bayar + denda |
| Upload SK | SK tidak ada | **TMS** | Temuan administratif |
| Upload bukti transfer | Tidak ada bukti transfer | **TMS** | Temuan administratif |
| Template Kartu Inventaris | Aset tidak tercatat | **TMS** | Catat inventaris |

---

## 📝 KESIMPULAN

Aplikasi Si-BOS ini **sudah 70% COMPLIANT** dengan regulasi BOS 2025-2026.

**Yang SUDAH BAGUS:**
- ✅ 10 jenis dokumen utama sudah ada
- ✅ Template nota variatif (8+ vendor)
- ✅ Upload foto dokumentasi
- ✅ Font tulisan tangan (12+ jenis)
- ✅ Preview real-time
- ✅ Cover 9 komponen BOS untuk SD

**Yang PERLU DITAMBAHKAN (CRITICAL):**
- 🔴 Template khusus (Surat Tugas, SPPD, SPMK, Daftar Honor, Amprah)
- 🔴 Template Bukti Potong Pajak (PPh 21, 23)
- 🔴 Kalkulasi pajak otomatis
- 🔴 Validasi persentase alokasi (10%, 20%)
- 🔴 Upload dokumen pendukung (SK, bukti transfer)
- 🔴 Batch download ZIP per komponen

**TIDAK PERLU MENAMBAHKAN:**
- Dashboard
- Multi-user
- Approval system
- Notifikasi

**Prinsip:** Tetap simple, focused pada cetak dokumen yang COMPLIANT dengan regulasi Permendikdasmen No. 8 Tahun 2025/2026 dan temuan BPK/Inspektorat.

---

## 📚 REFERENSI REGULASI

1. **Permendikdasmen No. 8 Tahun 2025** - Petunjuk Teknis Pengelolaan Dana BOSP
2. **Permendikdasmen No. 8 Tahun 2026** - Petunjuk Teknis Pengelolaan Dana BOSP 2026
3. **Standar Biaya Masukan (SBM) 2026** - Peraturan Menteri Keuangan
4. **Perbup/Perwali Daerah 2025-2026** - Standar Biaya Daerah
5. **Temuan BPK RI 2025-2026** - Hasil Pemeriksaan Dana BOS
6. **Juknis BOSP 2025-2026** - Kemendikdasmen
7. **Panduan Arkas** - Aplikasi Rencana Kegiatan dan Anggaran Sekolah

---

**Versi:** 6.0 (Complete BOS Components Update)  
**Last Updated:** 18 Februari 2026  
**Status:** Ready to Implement  
**References:** Permendikdasmen No. 8 Tahun 2025/2026, Temuan BPK/Inspektorat 2025-2026
