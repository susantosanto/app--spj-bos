# 📋 PLAN FITUR LENGKAP: SPJ BOS COMPATIBLE DENGAN SIPLAH 2026

## 🔍 ANALISIS REGULASI & PERSYARATAN SPJ BOS (Perpres 12/2021, Perpres 25/2025, Juknis BOS 2024/2025)

### 📚 Dasar Hukum & Regulasi SIPLAH

1. **Perpres No. 12 Tahun 2021** tentang Pengadaan Barang/Jasa Pemerintah (diperbarui dengan **Perpres No. 25 Tahun 2025**)
2. **Permendikbud No. 34 Tahun 2024** tentang Petunjuk Teknis Pengelolaan Dana BOS Reguler
3. **Surat Edaran Dirjen Dikdasmen** tentang Implementasi SIPLAH untuk Sekolah Dasar
4. **Panduan SIPLAH Kemdikbud 2026** - Sistem Informasi Pengadaan Sekolah
5. **Permendikbudristek No. 48 Tahun 2021** tentang ARKAS (Aplikasi Rencana Kegiatan dan Anggaran Sekolah)
6. **Perdirjen Dikdasmen No. 13695/D7/KR/2021** tentang Petunjuk Teknis ARKAS

---

## 🤖 FITUR BARU: ASK TO AI - CONVERSATIONAL FINANCIAL REPORTING

### 📋 Deskripsi Fitur

Fitur **"Ask to AI"** adalah interface **conversational** (chat-based) yang memungkinkan pengguna meminta laporan keuangan **dadakan** menggunakan bahasa alami, dan AI akan:
- ✅ **Memahami permintaan** pengguna dalam bahasa Indonesia
- ✅ **Mengambil data** dari BKU 12 bulan yang sudah terupload
- ✅ **Memproses & menghitung** sesuai kebutuhan laporan
- ✅ **Generate file Excel (.xlsx)** yang siap download
- ✅ **Format sesuai standar ARKAS/SAP**

### 🎯 Use Cases - Contoh Perintah yang Bisa Diberikan

#### **Laporan Pajak:**
```
"Buatkan laporan pajak PPh 21 semester 1 tahun 2026"
"Hitung total PPN yang sudah dibayar tahun 2026"
"Rekap semua pajak yang harus disetor bulan Maret"
```

#### **Berita Acara & Penutupan Kas:**
```
"Buatkan berita acara penutupan kas tahun 2026"
"Generate BAPK bulan Desember untuk audit"
```

#### **Laporan Keuangan Standar:**
```
"Buatkan Laporan Realisasi Anggaran tahun 2026"
"Generate neraca posisi keuangan per 31 Desember"
"Buatkan laporan arus kas metode langsung"
"Buatkan CaLK (Catatan atas Laporan Keuangan) 2026"
```

#### **Laporan Custom/Dadakan:**
```
"Tampilkan semua honor yang dibayarkan ke guru honorer tahun 2026"
"Berapa total belanja makan minum untuk rapat di tahun 2026?"
"Rekap biaya perjalanan dinas ke luar kota semester 2"
"Tampilkan transaksi di atas 5 juta rupiah tahun 2026"
"Berapa sisa anggaran untuk kode rekening 5.1.02.01?"
"Analisis tren pengeluaran per bulan tahun 2026"
```

#### **Laporan untuk Audit:**
```
"Siapkan dokumen audit untuk BPK tahun 2026"
"Buatkan rekapitulasi per vendor untuk audit"
"Export semua transaksi dengan bukti potong pajak"
```

---

### 🏗️ Arsitektur Fitur "Ask to AI"

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE (Chat)                           │
├─────────────────────────────────────────────────────────────────────────┤
│  👤 User: "Buatkan laporan pajak PPh 21 tahun 2026 dalam Excel"        │
│                                                                         │
│  🤖 AI: "Baik, saya akan membuatkan laporan PPh 21 tahun 2026..."      │
│      [Processing...]                                                    │
│      ✅ Laporan selesai! [📥 Download PPh21_2026.xlsx]                  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         AI PROCESSING LAYER                             │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │
│  │  Natural        │  │  Query          │  │  Data                   │ │
│  │  Language       │→ │  Builder        │→ │  Extractor              │ │
│  │  Understanding  │  │  (SQL-like)     │  │  (from BKU 12 bulan)    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │
│         │                    │                       │                  │
│         ▼                    ▼                       ▼                  │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │              AI Engine (Groq/Gemini API)                         │   │
│  │  - Intent Classification (apa yang diminta user?)                │   │
│  │  - Entity Extraction (periode, kode rekening, jenis laporan)     │   │
│  │  - Query Generation (ambil data dari BKU)                        │   │
│  │  - Format Determination (struktur Excel seperti apa?)            │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         REPORT GENERATION ENGINE                        │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │
│  │  Excel          │  │  Data           │  │  File                   │ │
│  │  Template       │→ │  Population     │→ │  Generation             │ │
│  │  Selector       │  │  (xlsx)         │  │  (.xlsx output)         │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                          ┌─────────────────────┐
                          │   Download .xlsx    │
                          │   File ke User      │
                          └─────────────────────┘
```

---

### 🎯 Komponen Teknis

#### 1. **Natural Language Understanding (NLU) Module**

```javascript
/**
 * AI-powered Natural Language Understanding
 * Mengubah pertanyaan user menjadi structured query
 */
var NLUModule = (function() {

  /**
   * Parse permintaan user menjadi structured intent
   * @param {string} userInput - Pertanyaan user dalam bahasa Indonesia
   * @returns {object} Structured intent object
   */
  function parseIntent(userInput) {
    var prompt =
      'Anda adalah NLU (Natural Language Understanding) engine untuk sistem keuangan sekolah.\n' +
      'Tugas Anda adalah menganalisis permintaan user dan mengekstrak intent.\n\n' +
      'Permintaan User: "' + userInput + '"\n\n' +
      'Analisis dan hasilkan JSON dengan struktur berikut:\n' +
      '{\n' +
      '  "intent": "REPORT_TYPE", // TAX_REPORT, CLOSING_REPORT, FINANCIAL_REPORT, CUSTOM_REPORT, AUDIT_REPORT\n' +
      '  "reportName": "Nama Laporan",\n' +
      '  "period": {\n' +
      '    "type": "year|month|semester|custom",\n' +
      '    "value": "2026",\n' +
      '    "startMonth": 1,\n' +
      '    "endMonth": 12\n' +
      '  },\n' +
      '  "filters": {\n' +
      '    "accountCode": "5.1.02.01", // optional\n' +
      '    "minAmount": 0, // optional\n' +
      '    "maxAmount": null, // optional\n' +
      '    "vendor": null, // optional\n' +
      '    "category": "honor|makan|perjalanan|barang" // optional\n' +
      '  },\n' +
      '  "outputFormat": "xlsx",\n' +
      '  "templateName": "template_pajak_pph21", // nama template Excel yang akan digunakan\n' +
      '  "confidence": 0.95\n' +
      '}';

    var response = GroqService.chat(prompt);
    var jsonMatch = response.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return null;
  }

  /**
   * Validasi intent yang dihasilkan
   */
  function validateIntent(intent) {
    if (!intent || !intent.intent) {
      return { valid: false, message: 'Maaf, saya tidak memahami permintaan Anda. Bisa diulang dengan bahasa yang lebih jelas?' };
    }

    if (!intent.period || !intent.period.type) {
      return { valid: false, message: 'Mohon sebutkan periode (tahun/bulan) yang dimaksud' };
    }

    return { valid: true, message: 'OK' };
  }

  /**
   * Clarification - AI bertanya jika permintaan tidak jelas
   */
  function askClarification(userInput, intent) {
    var prompt =
      'Permintaan user: "' + userInput + '"\n' +
      'Intent yang terdeteksi: ' + JSON.stringify(intent) + '\n\n' +
      'Buat pertanyaan klarifikasi yang sopan dalam bahasa Indonesia untuk memastikan laporan yang benar.';

    return GroqService.chat(prompt);
  }

  return {
    parseIntent: parseIntent,
    validateIntent: validateIntent,
    askClarification: askClarification
  };

})();
```

#### 2. **Data Extractor Module**

```javascript
/**
 * Mengambil data dari BKU 12 bulan berdasarkan intent
 */
var DataExtractor = (function() {

  /**
   * Extract data dari BKU berdasarkan intent
   */
  function extractData(intent) {
    var year = intent.period.value;
    var startMonth = intent.period.startMonth || 1;
    var endMonth = intent.period.endMonth || 12;

    // Ambil semua BKU data untuk periode yang diminta
    var bkuData = getBKUData(year, startMonth, endMonth);

    // Apply filters
    var filteredData = applyFilters(bkuData, intent.filters);

    // Aggregate data sesuai kebutuhan report
    var aggregatedData = aggregateData(filteredData, intent);

    return {
      raw: filteredData,
      aggregated: aggregatedData,
      metadata: {
        totalTransactions: filteredData.length,
        period: intent.period,
        generatedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Apply filters dari intent
   */
  function applyFilters(data, filters) {
    return data.filter(function(tx) {
      if (filters.accountCode && tx.kodeRekening !== filters.accountCode) {
        return false;
      }
      if (filters.minAmount && tx.amount < filters.minAmount) {
        return false;
      }
      if (filters.maxAmount && tx.amount > filters.maxAmount) {
        return false;
      }
      if (filters.vendor && tx.vendor.toLowerCase().indexOf(filters.vendor.toLowerCase()) === -1) {
        return false;
      }
      if (filters.category && tx.category !== filters.category) {
        return false;
      }
      return true;
    });
  }

  /**
   * Aggregate data untuk laporan
   */
  function aggregateData(data, intent) {
    var aggregation = {};

    switch (intent.intent) {
      case 'TAX_REPORT':
        aggregation = aggregateForTax(data);
        break;
      case 'CLOSING_REPORT':
        aggregation = aggregateForClosing(data);
        break;
      case 'FINANCIAL_REPORT':
        aggregation = aggregateForFinancial(data);
        break;
      case 'CUSTOM_REPORT':
        aggregation = aggregateForCustom(data, intent);
        break;
      case 'AUDIT_REPORT':
        aggregation = aggregateForAudit(data);
        break;
    }

    return aggregation;
  }

  function aggregateForTax(data) {
    var taxByType = {
      pph21: { total: 0, transactions: [] },
      pph23: { total: 0, transactions: [] },
      ppn: { total: 0, transactions: [] },
      pph4: { total: 0, transactions: [] }
    };

    data.forEach(function(tx) {
      if (tx.taxType) {
        if (taxByType[tx.taxType]) {
          taxByType[tx.taxType].total += tx.taxAmount;
          taxByType[tx.taxType].transactions.push(tx);
        }
      }
    });

    return taxByType;
  }

  function aggregateForClosing(data) {
    var saldoAwal = getSaldoAwalTahun();
    var totalPenerimaan = data.filter(function(tx) { return tx.type === 'masuk'; }).reduce(function(sum, tx) { return sum + tx.amount; }, 0);
    var totalPengeluaran = data.filter(function(tx) { return tx.type === 'keluar'; }).reduce(function(sum, tx) { return sum + tx.amount; }, 0);
    var saldoAkhir = saldoAwal + totalPenerimaan - totalPengeluaran;

    return {
      saldoAwal: saldoAwal,
      totalPenerimaan: totalPenerimaan,
      totalPengeluaran: totalPengeluaran,
      saldoAkhir: saldoAkhir,
      transactions: data
    };
  }

  function aggregateForFinancial(data) {
    // Aggregate by account code
    var byAccount = {};
    data.forEach(function(tx) {
      if (!byAccount[tx.kodeRekening]) {
        byAccount[tx.kodeRekening] = {
          code: tx.kodeRekening,
          name: tx.namaRekening,
          total: 0,
          transactions: []
        };
      }
      byAccount[tx.kodeRekening].total += tx.amount;
      byAccount[tx.kodeRekening].transactions.push(tx);
    });

    return byAccount;
  }

  function aggregateForCustom(data, intent) {
    // Custom aggregation based on specific request
    return {
      data: data,
      summary: generateSummary(data, intent)
    };
  }

  function aggregateForAudit(data) {
    // Audit-specific aggregation
    var byVendor = {};
    data.forEach(function(tx) {
      if (!byVendor[tx.vendor]) {
        byVendor[tx.vendor] = {
          vendor: tx.vendor,
          total: 0,
          transactionCount: 0,
          transactions: []
        };
      }
      byVendor[tx.vendor].total += tx.amount;
      byVendor[tx.vendor].transactionCount++;
      byVendor[tx.vendor].transactions.push(tx);
    });

    return {
      byVendor: byVendor,
      allTransactions: data
    };
  }

  return {
    extractData: extractData
  };

})();
```

#### 3. **Excel Template Engine**

```javascript
/**
 * Template engine untuk generate Excel files
 * Menggunakan library xlsx (SheetJS) atau custom implementation
 */
var ExcelTemplateEngine = (function() {

  // Template registry
  var templates = {
    'template_pajak_pph21': generatePPh21Template,
    'template_pajak_pph23': generatePPh23Template,
    'template_pajak_ppn': generatePPNTemplate,
    'template_bapk': generateBAPKTemplate,
    'template_lra': generateLRATemplate,
    'template_neraca': generateNeracaTemplate,
    'template_calk': generateCALKTemplate,
    'template_custom': generateCustomTemplate,
    'template_audit': generateAuditTemplate
  };

  /**
   * Generate Excel file berdasarkan template dan data
   */
  function generateExcel(intent, data) {
    var templateName = intent.templateName || 'template_custom';
    var templateFunction = templates[templateName] || templates['template_custom'];

    // Call template function
    var workbook = templateFunction(data, intent);

    // Convert to blob
    var blob = workbookToBlob(workbook);

    // Generate filename
    var filename = generateFilename(intent);

    return {
      blob: blob,
      filename: filename
    };
  }

  /**
   * Template: Laporan PPh 21
   */
  function generatePPh21Template(data, intent) {
    var wb = {
      SheetNames: ['Rekap PPh 21', 'Rincian'],
      Sheets: {}
    };

    // Sheet 1: Rekap
    var rekapData = [
      ['REKAPITULASI PPh 21'],
      ['Tahun ' + intent.period.value],
      [''],
      ['No', 'Bulan', 'Dasar Pengenaan', 'Tarif', 'PPh 21 Terutang'],
    ];

    // Add monthly data
    var monthlyData = aggregateMonthly(data.aggregated.pph21.transactions);
    monthlyData.forEach(function(month, index) {
      rekapData.push([
        index + 1,
        month.month,
        month.taxBase,
        '5%',
        month.taxAmount
      ]);
    });

    // Total row
    var totalTax = data.aggregated.pph21.transactions.reduce(function(sum, tx) { return sum + tx.taxAmount; }, 0);
    rekapData.push(['', 'TOTAL', '', '', totalTax]);

    wb.Sheets['Rekap PPh 21'] = arrayToSheet(rekapData);

    // Sheet 2: Rincian
    var rincianData = [
      ['RINCIAN TRANSAKSI PPh 21'],
      [''],
      ['Tanggal', 'Keterangan', 'Nama Penerima', 'Dasar Pengenaan', 'PPh 21']
    ];

    data.aggregated.pph21.transactions.forEach(function(tx) {
      rincianData.push([
        tx.date,
        tx.description,
        tx.recipient,
        tx.taxBase,
        tx.taxAmount
      ]);
    });

    wb.Sheets['Rincian'] = arrayToSheet(rincianData);

    return wb;
  }

  /**
   * Template: Berita Acara Penutupan Kas (BAPK)
   */
  function generateBAPKTemplate(data, intent) {
    var wb = {
      SheetNames: ['BAPK'],
      Sheets: {}
    };

    var bapkData = [
      ['BERITA ACARA PENUTUPAN KAS (BAPK)'],
      ['Tahun Anggaran ' + intent.period.value],
      [''],
      ['Saldo Awal Tahun', '', data.aggregated.saldoAwal],
      ['Total Penerimaan', '', data.aggregated.totalPenerimaan],
      ['Total Pengeluaran', '', data.aggregated.totalPengeluaran],
      ['Saldo Akhir Tahun', '', data.aggregated.saldoAkhir],
      [''],
      ['Selisih Kas Fisik vs Buku', '', data.saldoFisik - data.aggregated.saldoAkhir],
      [''],
      ['Mengetahui,'],
      ['Kepala Sekolah', 'Bendahara'],
      ['', ''],
      ['(_______________)', '(_______________)']
    ];

    wb.Sheets['BAPK'] = arrayToSheet(bapkData);

    return wb;
  }

  /**
   * Template: Laporan Realisasi Anggaran (LRA)
   */
  function generateLRATemplate(data, intent) {
    var wb = {
      SheetNames: ['LRA'],
      Sheets: {}
    };

    var lraData = [
      ['LAPORAN REALISASI ANGGARAN'],
      ['Tahun ' + intent.period.value],
      [''],
      ['Kode Rekening', 'Uraian', 'Anggaran', 'Realisasi', '%'],
    ];

    // Get budget data from ARKAS
    var budgetData = getBudgetData(intent.period.value);

    // Merge with actual data
    Object.keys(data.aggregated).forEach(function(code) {
      var account = data.aggregated[code];
      var budget = budgetData[code] || { budget: 0 };
      var percentage = budget.budget > 0 ? (account.total / budget.budget * 100).toFixed(2) : 0;

      lraData.push([
        code,
        account.name,
        budget.budget,
        account.total,
        percentage + '%'
      ]);
    });

    wb.Sheets['LRA'] = arrayToSheet(lraData);

    return wb;
  }

  /**
   * Template: Custom Report (dinamis berdasarkan request)
   */
  function generateCustomTemplate(data, intent) {
    var wb = {
      SheetNames: ['Laporan'],
      Sheets: {}
    };

    // Generate header based on intent
    var header = [
      [intent.reportName || 'Laporan Custom'],
      ['Periode: ' + formatPeriod(intent.period)],
      [''],
    ];

    // Dynamic columns based on data
    var columns = Object.keys(data.aggregated.data[0] || {});
    header.push(columns);

    // Data rows
    var rows = data.aggregated.data.map(function(tx) {
      return columns.map(function(col) { return tx[col]; });
    });

    var sheetData = header.concat(rows);
    wb.Sheets['Laporan'] = arrayToSheet(sheetData);

    return wb;
  }

  // Helper functions
  function arrayToSheet(array) {
    var sheet = {};
    for (var r = 0; r < array.length; r++) {
      for (var c = 0; c < array[r].length; c++) {
        var cellRef = encodeCell(r, c);
        sheet[cellRef] = { v: array[r][c] };
      }
    }
    sheet['!ref'] = encodeRange(0, 0, array.length - 1, array[0].length - 1);
    return sheet;
  }

  function encodeCell(row, col) {
    var colName = '';
    var dividend = col + 1;
    while (dividend > 0) {
      var modulo = (dividend - 1) % 26;
      colName = String.fromCharCode(65 + modulo) + colName;
      dividend = Math.floor((dividend - modulo) / 26);
    }
    return colName + (row + 1);
  }

  function encodeRange(sRow, sCol, eRow, eCol) {
    return encodeCell(sRow, sCol) + ':' + encodeCell(eRow, eCol);
  }

  function workbookToBlob(workbook) {
    // Implement workbook to blob conversion
    // Can use SheetJS library or custom implementation
    return Utilities.newBlob('dummy', MimeType.EXCEL, 'report.xlsx');
  }

  function generateFilename(intent) {
    var parts = [
      intent.reportName || 'Laporan',
      intent.period.value,
      new Date().toISOString().split('T')[0]
    ];
    return parts.join('_') + '.xlsx';
  }

  function aggregateMonthly(transactions) {
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var monthly = {};

    transactions.forEach(function(tx) {
      var month = new Date(tx.date).getMonth();
      if (!monthly[month]) {
        monthly[month] = { month: months[month], taxBase: 0, taxAmount: 0 };
      }
      monthly[month].taxBase += tx.taxBase || 0;
      monthly[month].taxAmount += tx.taxAmount || 0;
    });

    return months.map(function(m, i) { return monthly[i] || { month: m, taxBase: 0, taxAmount: 0 }; });
  }

  return {
    generateExcel: generateExcel
  };

})();
```

#### 4. **Chat UI Component**

```html
<!-- form_ask_to_ai.html -->
<div class="ask-to-ai-container">
  <div class="chat-header">
    <h3>🤖 Ask to AI - Buat Laporan Keuangan</h3>
    <p class="subtitle">Minta laporan keuangan dalam bahasa alami, AI akan buatkan file Excel</p>
  </div>

  <div class="chat-messages" id="chatMessages">
    <div class="message ai-message">
      <div class="message-content">
        <p>Halo! Saya AI Assistant untuk laporan keuangan SPJ BOS.</p>
        <p>Saya bisa membantu Anda membuat:</p>
        <ul>
          <li>📊 Laporan Pajak (PPh 21, PPh 23, PPN)</li>
          <li>📋 Berita Acara Penutupan Kas (BAPK)</li>
          <li>📈 Laporan Realisasi Anggaran (LRA)</li>
          <li>💰 Neraca, CaLK, Laporan Arus Kas</li>
          <li>📝 Laporan Custom/Dadakan untuk audit</li>
        </ul>
        <p><strong>Contoh perintah:</strong></p>
        <blockquote>"Buatkan laporan pajak PPh 21 tahun 2026 dalam Excel"</blockquote>
        <blockquote>"Generate berita acara penutupan kas Desember 2026"</blockquote>
        <blockquote>"Tampilkan semua honor guru honorer semester 1"</blockquote>
        <p>Apa yang bisa saya bantu hari ini?</p>
      </div>
    </div>
  </div>

  <div class="chat-input-container">
    <textarea
      id="userInput"
      placeholder="Ketik permintaan laporan Anda di sini..."
      rows="3"
      onkeydown="if(event.keyCode===13 && !event.shiftKey){event.preventDefault(); sendMessage();}"
    ></textarea>
    <button onclick="sendMessage()" class="btn-primary">
      🚀 Kirim
    </button>
  </div>

  <div class="quick-actions">
    <p class="label">Quick Actions:</p>
    <button onclick="setInput('Buatkan laporan PPh 21 tahun 2026')">Laporan PPh 21</button>
    <button onclick="setInput('Buatkan berita acara penutupan kas 2026')">BAPK 2026</button>
    <button onclick="setInput('Buatkan Laporan Realisasi Anggaran 2026')">LRA 2026</button>
    <button onclick="setInput('Tampilkan semua transaksi di atas 5 juta')">Transaksi > 5 Juta</button>
  </div>

  <div id="downloadArea" class="download-area" style="display:none;">
    <!-- Download links will appear here -->
  </div>
</div>

<script>
function sendMessage() {
  var input = document.getElementById('userInput');
  var message = input.value.trim();

  if (!message) return;

  // Add user message to chat
  addMessage('user', message);
  input.value = '';

  // Show loading
  addLoadingMessage();

  // Call AI backend
  google.script.run
    .withSuccessHandler(function(response) {
      removeLoadingMessage();
      addMessage('ai', response.message);

      if (response.file) {
        showDownload(response.file);
      }
    })
    .withFailureHandler(function(error) {
      removeLoadingMessage();
      addMessage('ai', '❌ Error: ' + error.message);
    })
    .processAIRequest(message);
}

function addMessage(type, content) {
  var messagesDiv = document.getElementById('chatMessages');
  var messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + (type === 'user' ? 'user-message' : 'ai-message');
  messageDiv.innerHTML = '<div class="message-content">' + content + '</div>';
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showDownload(file) {
  var downloadArea = document.getElementById('downloadArea');
  downloadArea.style.display = 'block';
  downloadArea.innerHTML =
    '<div class="download-item">' +
    '  <a href="' + file.url + '" download="' + file.name + '" class="btn-download">' +
    '    📥 Download ' + file.name +
    '  </a>' +
    '</div>';
}

function setInput(text) {
  document.getElementById('userInput').value = text;
}
</script>

<style>
.ask-to-ai-container {
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 10px 10px 0 0;
}

.chat-messages {
  height: 500px;
  overflow-y: auto;
  padding: 20px;
  background: #f5f5f5;
  border: 1px solid #ddd;
}

.message {
  margin-bottom: 15px;
  display: flex;
}

.user-message {
  justify-content: flex-end;
}

.ai-message {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.user-message .message-content {
  background: #667eea;
  color: white;
}

.chat-input-container {
  display: flex;
  gap: 10px;
  padding: 15px;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
}

.chat-input-container textarea {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
}

.quick-actions {
  padding: 15px;
  background: #f9f9f9;
}

.quick-actions button {
  margin: 5px;
  padding: 8px 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.download-area {
  padding: 20px;
  background: #e8f5e9;
  border-top: 2px solid #4caf50;
}

.btn-download {
  display: inline-block;
  padding: 12px 24px;
  background: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}
</style>
```

---

### 🎯 Backend Handler - Main AI Processing

```javascript
/**
 * Main handler untuk memproses permintaan AI dari user
 * @param {string} userInput - Permintaan user dalam bahasa Indonesia
 * @returns {object} Response dengan message dan file (jika ada)
 */
function processAIRequest(userInput) {
  try {
    // Step 1: Parse intent dengan NLU
    var intent = NLUModule.parseIntent(userInput);

    // Step 2: Validasi intent
    var validation = NLUModule.validateIntent(intent);
    if (!validation.valid) {
      return {
        message: validation.message,
        file: null
      };
    }

    // Step 3: Extract data dari BKU
    var data = DataExtractor.extractData(intent);

    // Step 4: Generate Excel report
    var excelFile = ExcelTemplateEngine.generateExcel(intent, data);

    // Step 5: Save file to Drive dan generate download URL
    var fileUrl = saveFileToDrive(excelFile.blob, excelFile.filename);

    // Step 6: Generate response message
    var responseMessage = generateResponseMessage(intent, data);

    return {
      message: responseMessage,
      file: {
        url: fileUrl,
        name: excelFile.filename
      }
    };

  } catch (e) {
    Logger.log('AI Request Error: ' + e.toString());
    return {
      message: '❌ Maaf, terjadi kesalahan saat memproses permintaan Anda: ' + e.message,
      file: null
    };
  }
}

/**
 * Generate response message berdasarkan intent
 */
function generateResponseMessage(intent, data) {
  var message = '✅ **Laporan berhasil dibuat!**\n\n';
  message += '📊 **Nama Laporan:** ' + intent.reportName + '\n';
  message += '📅 **Periode:** ' + formatPeriod(intent.period) + '\n';
  message += '📝 **Total Transaksi:** ' + data.metadata.totalTransactions + ' transaksi\n';
  message += '⏰ **Waktu Generate:** ' + new Date().toLocaleString('id-ID') + '\n\n';
  message += 'Silakan download file Excel menggunakan tombol di bawah ini. 👇';

  return message;
}

/**
 * Format period untuk display
 */
function formatPeriod(period) {
  var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  if (period.type === 'year') {
    return 'Tahun ' + period.value;
  } else if (period.type === 'month') {
    return months[period.startMonth - 1] + ' ' + period.value;
  } else if (period.type === 'semester') {
    var startMonth = period.startMonth === 1 ? 'Januari' : 'Juli';
    var endMonth = period.endMonth === 6 ? 'Juni' : 'Desember';
    return 'Semester ' + (period.startMonth === 1 ? '1' : '2') + ' (' + startMonth + ' - ' + endMonth + ') ' + period.value;
  } else {
    return months[period.startMonth - 1] + ' - ' + months[period.endMonth - 1] + ' ' + period.value;
  }
}

/**
 * Save file to Google Drive
 */
function saveFileToDrive(blob, filename) {
  var folderId = PropertiesService.getScriptProperties().getProperty('AI_REPORTS_FOLDER_ID');
  var folder = DriveApp.getFolderById(folderId);

  var file = folder.createFile(blob);
  file.setName(filename);

  // Generate download URL
  return 'https://drive.google.com/file/d/' + file.getId() + '/view';
}
```

---

### 📊 Template Excel yang Tersedia

| No | Template | Fungsi | Output Columns |
|----|----------|--------|----------------|
| 1 | `template_pajak_pph21` | Laporan PPh 21 | Bulan, Dasar Pengenaan, Tarif, PPh Terutang |
| 2 | `template_pajak_pph23` | Laporan PPh 23 | Bulan, Jenis Jasa, Dasar Pengenaan, PPh Terutang |
| 3 | `template_pajak_ppn` | Laporan PPN | Bulan, Nama Vendor, DPP, PPN |
| 4 | `template_bapk` | Berita Acara Penutupan Kas | Saldo Awal, Penerimaan, Pengeluaran, Saldo Akhir |
| 5 | `template_lra` | Laporan Realisasi Anggaran | Kode Rekening, Uraian, Anggaran, Realisasi, % |
| 6 | `template_neraca` | Neraca Posisi Keuangan | Aset, Kewajiban, Ekuitas |
| 7 | `template_calk` | Catatan atas Laporan Keuangan | Uraian, Nilai Tahun Ini, Nilai Tahun Lalu |
| 8 | `template_audit` | Laporan Audit | Vendor, Total Transaksi, Jumlah, Detail |
| 9 | `template_custom` | Laporan Custom | Dinamis sesuai request |

---

### 🔧 Konfigurasi & Setup

#### 1. **Script Properties yang Diperlukan**

```javascript
function setupAIProperties() {
  var props = PropertiesService.getScriptProperties();

  // API Keys
  props.setProperty('GROQ_API_KEY', 'your_groq_api_key');
  props.setProperty('GEMINI_API_KEY', 'your_gemini_api_key');

  // Folder ID untuk menyimpan laporan AI
  var folder = DriveApp.createFolder('AI Generated Reports');
  props.setProperty('AI_REPORTS_FOLDER_ID', folder.getId());

  // Configuration
  props.setProperty('AI_PROVIDER', 'groq'); // groq atau gemini
  props.setProperty('AI_MODEL', 'llama-3.1-8b-instant');
  props.setProperty('AI_RATE_LIMIT', '30'); // requests per minute
  props.setProperty('AI_CACHE_ENABLED', 'true');
}
```

---

## 📋 TERMINOLOGI STANDAR SIPLAH/ARKAS

#### 1. **AI Model Integration**
```javascript
// Menggunakan AI untuk:
// - Klasifikasi transaksi otomatis per kode rekening ARKAS
// - Perhitungan pajak terutang (PPh 21, PPh 23, PPN)
// - Generate laporan keuangan standar SAP (Standar Akuntansi Pemerintahan)
// - Deteksi anomali transaksi
// - Rekomendasi kode rekening berdasarkan deskripsi

const AI_CAPABILITIES = {
  transactionClassification: 'Auto-classify transaksi ke kode rekening ARKAS',
  taxCalculation: 'Hitung PPh 21, PPh 23, PPN otomatis',
  reportGeneration: 'Generate LRA, Neraca, Arus Kas, CaLK',
  anomalyDetection: 'Deteksi transaksi tidak wajar',
  closingEntry: 'Jurnal penutup otomatis',
  auditTrail: 'Audit trail lengkap'
};
```

#### 2. **Tax Calculation Engine (Perhitungan Pajak)**
```javascript
// Pajak yang dihitung otomatis:

// PPh 21 - Honorarium
const PPh21_TARIFF = {
  honorarium: 0.05, // 5% dari bruto (final)
  threshold: 500000 // Tidak kena jika < 500rb
};

// PPh 23 - Jasa
const PPh23_TARIFF = {
  jasa: 0.02, // 2% dari bruto
  threshold: 750000 // Tidak kena jika < 750rb
};

// PPN - Pembelian Barang
const PPN_TARIFF = {
  barang: 0.11, // 11% (2026)
  threshold: 0 // Semua kena kecuali exempt
};

// PPh 4 ayat 2 - Sewa
const PPh4_TARIFF = {
  sewa: 0.10, // 10% final
  threshold: 0
};
```

#### 3. **Financial Report Templates (Standar ARKAS/SAP)**

**A. Laporan Realisasi Anggaran (LRA)**
```
LAPORAN REALISASI ANGGARAN
TAHUN ANGGARAN 2026

┌───────────────────────────────────────────────────────────────────────────┐
│ Uraian                          │ Anggaran    │ Realisasi   │ %    │     │
├───────────────────────────────────────────────────────────────────────────┤
│ PENDAPAPATAN                                                           │
│   Pendapatan BOS                │ 500.000.000 │ 500.000.000 │ 100% │     │
│   Pendapatan Lain-lain          │      -      │      -      │  -   │     │
│   Total Pendapatan             │ 500.000.000 │ 500.000.000 │ 100% │     │
├───────────────────────────────────────────────────────────────────────────┤
│ BELANJA                                                                │
│   Belanja Pegawai              │ 150.000.000 │ 148.500.000 │ 99%  │     │
│   Belanja Barang & Jasa        │ 250.000.000 │ 245.000.000 │ 98%  │     │
│   Belanja Modal                │ 100.000.000 │  98.000.000 │ 98%  │     │
│   Total Belanja                │ 500.000.000 │ 491.500.000 │ 98%  │     │
├───────────────────────────────────────────────────────────────────────────┤
│ SURPLUS/(DEFISIT)              │       -     │   8.500.000 │      │     │
└───────────────────────────────────────────────────────────────────────────┘
```

**B. Berita Acara Penutupan Kas (BAPK)**
```
BERITA ACARA PENUTUPAN KAS
TAHUN ANGGARAN 2026
Nomor: BAPK/[KODE_SEKOLAH]/[BULAN]/[TAHUN]

Pada hari ini [HARI], tanggal [TANGGAL], kami yang bertanda tangan di bawah ini:

1. Nama: [NAMA_KEPALA_SEKOLAH]
   NIP: [NIP_KEPALA_SEKOLAH]
   Jabatan: Kepala Sekolah [NAMA_SEKOLAH]
   Selanjutnya disebut **PIHAK PERTAMA** (Kuasa Pengguna Anggaran)

2. Nama: [NAMA_BENDAHARA]
   NIP: [NIP_BENDAHARA]
   Jabatan: Bendahara BOS [NAMA_SEKOLAH]
   Selanjutnya disebut **PIHAK KEDUA** (Bendahara)

PIHAK KEDUA menyampaikan laporan kas kepada PIHAK PERTAMA berupa:
- Saldo Awal Tahun: Rp [SALDO_AWAL]
- Total Penerimaan: Rp [TOTAL_PENERIMAAN]
- Total Pengeluaran: Rp [TOTAL_PENGELUARAN]
- Saldo Akhir: Rp [SALDO_AKHIR]

Saldo kas fisik: Rp [SALDO_FISIK]
Selisih (kurang/lebih): Rp [SELISIH]

Demikian berita acara ini dibuat dengan sesungguhnya.

[KOTA], [TANGGAL]

PIHAK KEDUA,              PIHAK PERTAMA,

[TANDA_TANGAN_1]          [TANDA_TANGAN_2]

[NAMA_BENDAHARA]          [NAMA_KEPALA_SEKOLAH]
NIP. [NIP_BENDAHARA]      NIP. [NIP_KEPALA_SEKOLAH]

Mengetahui,
Komite Sekolah,

[TANDA_TANGAN_3]

[NAMA_KOMITE]
```

**C. Laporan Pajak (SPT Masa)**
```
REKAPITULASI PAJAK TERUTANG
TAHUN ANGGARAN 2026

┌───────────────────────────────────────────────────────────────────────────┐
│ Jenis Pajak    │ Objek Pajak      │ Dasar Pengenaan │ Tarif │ Pajak     │
├───────────────────────────────────────────────────────────────────────────┤
│ PPh 21         │ Honorarium       │  50.000.000     │  5%   │ 2.500.000 │
│ PPh 23         │ Jasa             │  30.000.000     │  2%   │   600.000 │
│ PPh 4(2)       │ Sewa             │  10.000.000     │ 10%   │ 1.000.000 │
│ PPN            │ Pembelian        │ 100.000.000     │ 11%   │11.000.000 │
├───────────────────────────────────────────────────────────────────────────┤
│ TOTAL PAJAK TERUTANG                                          │15.100.000│
└───────────────────────────────────────────────────────────────────────────┘
```

#### 4. **AI-Powered Features**

```javascript
// Fitur AI yang tersedia:

const AI_FEATURES = {
  // 1. Auto-Classification
  classifyTransaction: async (description, amount, vendor) => {
    // AI akan menganalisis:
    // - Kata kunci deskripsi
    // - Nominal transaksi
    // - Jenis vendor
    // Output: Kode rekening ARKAS yang sesuai
    return {
      kodeRekening: '5.1.02.01.01',
      namaRekening: 'Belanja Pegawai - Honorarium',
      confidence: 0.95
    };
  },

  // 2. Tax Detection
  detectTax: async (transaction) => {
    // AI mendeteksi apakah transaksi kena pajak
    // dan menghitung otomatis
    return {
      pph21: 25000,
      pph23: 0,
      ppn: 0,
      isFinal: true
    };
  },

  // 3. Report Generation
  generateReport: async (type, period) => {
    // Generate laporan berdasarkan tipe
    // LRA, Neraca, Arus Kas, CaLK, BAPK
    return pdfBuffer;
  },

  // 4. Anomaly Detection
  detectAnomaly: async (transactions) => {
    // Deteksi transaksi mencurigakan
    // - Pembelian di atas harga pasar
    // - Transaksi ke vendor sama berulang
    // - Pola tidak wajar
    return [
      {
        transactionId: 'TRX-001',
        anomaly: 'Harga di atas rata-rata pasar 25%',
        severity: 'medium'
      }
    ];
  },

  // 5. Closing Entry
  generateClosingEntry: async (year) => {
    // Jurnal penutup otomatis
    return {
      debit: [{account: '4.1', amount: 500000000}],
      credit: [{account: '5.1', amount: 491500000}, {account: '3.1', amount: 8500000}]
    };
  }
};
```

#### 5. **Database Structure untuk AI**
```javascript
// Struktur data untuk AI training & inference
{
  "ai_training_data": {
    "transactions": [
      {
        "description": "Honor guru honorer bulan Januari",
        "amount": 500000,
        "vendor": "Guru Honorer",
        "category": "Belanja Pegawai",
        "arkas_code": "5.1.02.01.01",
        "tax_applicable": "PPh 21 Final 5%"
      }
      // ... ribuan data training
    ],
    "vendor_classification": {
      "toko_bangunan": "Belanja Modal",
      "katering": "Belanja Barang & Jasa - Makan Minum",
      "guru": "Belanja Pegawai - Honorarium"
    }
  },
  "tax_rules": {
    "pph21": { /* aturan PPh 21 */ },
    "pph23": { /* aturan PPh 23 */ },
    "ppn": { /* aturan PPN */ }
  },
  "report_templates": {
    "LRA": { /* template LRA */ },
    "BAPK": { /* template BAPK */ },
    "NERACA": { /* template Neraca */ }
  }
}
```

#### 6. **UI Components untuk AI Features**

```
┌─────────────────────────────────────────────────────────────────────┐
│  🤖 AI FINANCIAL REPORTING                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Pilih Laporan yang akan digenerate:                               │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ ☑ Laporan Realisasi Anggaran (LRA)                          │   │
│  │ ☑ Berita Acara Penutupan Kas (BAPK)                         │   │
│  │ ☑ Rekapitulasi Pajak (PPh 21, PPh 23, PPN)                  │   │
│  │ ☑ Laporan Posisi Keuangan (Neraca)                          │   │
│  │ ☑ Catatan atas Laporan Keuangan (CaLK)                      │   │
│  │ ☑ Analisis Varian Anggaran vs Realisasi                     │   │
│  │ ☑ Rekapitulasi per Kode Rekening ARKAS                      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Periode: [Januari 2026] s/d [Desember 2026]                       │
│                                                                     │
│  ⚙️ Opsi AI:                                                       │
│  ☑ Auto-classification transaksi                                   │
│  ☑ Deteksi dan hitung pajak otomatis                               │
│  ☑ Deteksi anomali                                                 │
│  ☑ Generate jurnal penutup                                         │
│                                                                     │
│  [🔍 Preview AI Analysis]  [📤 Generate Report]  [📥 Export Excel] │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📋 TERMINOLOGI STANDAR SIPLAH/ARKAS

### 🔄 Perubahan Terminologi (DRC → RAB/Rincian Anggaran)

| Istilah Lama | Istilah Baru (SIPLAH/ARKAS) | Keterangan |
|--------------|-----------------------------|------------|
| **DRC (Daftar Rincian Cost)** | **RAB (Rencana Anggaran Biaya)** | Terminologi standar ARKAS |
| Cost | **Biaya** | Indonesianisasi |
| Vendor | **Penyedia** | Terminologi Perpres 12/2021 |
| BAP | **BAST (Berita Acara Serah Terima)** | Lebih formal |

> **Catatan**: Istilah "DRC" diganti dengan **"RAB"** (Rencana Anggaran Biaya) atau **"Rincian Biaya"** untuk mengikuti terminologi standar ARKAS dan SIPLAH yang lebih formal dan sesuai dengan bahasa Indonesia.

---

## 📄 KELENGKAPAN DOKUMEN SPJ PER JENIS BELANJA

### 1️⃣ **JASA / HONORARIUM** (Honor Guru, Tenaga Kependidikan, Narasumber)

#### Dokumen Wajib:
| No | Dokumen | Keterangan | Format |
|----|---------|------------|--------|
| 1 | **Daftar Tanda Terima Honorarium** | Nama lengkap, jabatan, nominal, tanda tangan basah | PDF (tpl_daftar_honor.html) |
| 2 | **Berita Acara Penyerahan & Penerimaan (BAP)** | Penyerahan honor dari bendahara ke penerima | PDF (template baru) |
| 3 | **Surat Keputusan/Tugas** | SK Penugasan atau Surat Perjanjian Kerja | PDF (tpl_sk_tugas.html / tpl_spk.html) |
| 4 | **Daftar Hadir** | Jika honor terkait kegiatan/rapat | PDF (tpl_daftar_hadir.html) |
| 5 | **Notulen Kegiatan** | Untuk honor narasumber/rapat | PDF (tpl_notulen.html) |
| 6 | **Dokumentasi Foto** | Foto kegiatan (min. 3 foto) | JPG/PNG (tpl_dokumentasi.html) |
| 7 | **Buku Kas Umum (BKU)** | Bukti pencatatan transaksi | PDF (upload fitur baru) |

#### Template yang Dibutuhkan:
- ✅ `tpl_daftar_honor.html` (sudah ada)
- 🆕 `tpl_bap_honor.html` (BARU - Berita Acara Penyerahan Honor)
- ✅ `tpl_daftar_hadir.html` (sudah ada)
- ✅ `tpl_notulen.html` (sudah ada)
- ✅ `tpl_dokumentasi.html` (sudah ada)

#### Format BAP Honor (SIPLAH Compatible):
```
BERITA ACARA PENYERAHAN DAN PENERIMAAN
HONORARIUM [NAMA KEGIATAN]
Nomor: [NOMOR_OTOMATIS]

Pada hari ini [HARI], tanggal [TANGGAL], kami yang bertanda tangan di bawah ini:

1. Nama: [NAMA BENDAHARA]
   NIP: [NIP_BENDAHARA]
   Jabatan: Bendahara BOS [NAMA_SEKOLAH]
   Selanjutnya disebut **PIHAK PERTAMA**

2. Nama: [NAMA_PENERIMA]
   NIP/NIK: [NIP_PENERIMA]
   Jabatan: [JABATAN_PENERIMA]
   Selanjutnya disebut **PIHAK KEDUA**

PIHAK PERTAMA menyerahkan kepada PIHAK KEDUA berupa:
- Honorarium kegiatan: [NAMA_KEGIATAN]
- Periode: [PERIODE]
- Jumlah: Rp [NOMINAL] (terbilang: [TERBILANG])
- Sumber Dana: BOS Reguler TA [TAHUN]

PIHAK KEDUA menyatakan telah menerima uang sebesar tersebut di atas dengan sebenarnya.

Demikian berita acara ini dibuat dengan sesungguhnya untuk dapat dipergunakan sebagaimana mestinya.

[KOTA], [TANGGAL]

PIHAK KEDUA,          PIHAK PERTAMA,

[TANDA_TANGAN_1]     [TANDA_TANGAN_2]

[NAMA_PENERIMA]       [NAMA_BENDAHARA]
NIP. [NIP_PENERIMA]   NIP. [NIP_BENDAHARA]
```

---

### 2️⃣ **MAKAN DAN MINUM RAPAT/KEGIATAN**

#### Dokumen Wajib:
| No | Dokumen | Keterangan | Format |
|----|---------|------------|--------|
| 1 | **Nota/Faktur Penyedia** | Nota dari penyedia katering/Restoran | PDF (tpl_nota.html) |
| 2 | **Rincian Biaya (RAB)** | Rincian menu, harga satuan, total | PDF (template baru) |
| 3 | **Berita Acara Serah Terima (BAST)** | BAST konsumsi | PDF (template baru) |
| 4 | **Daftar Hadir Peserta** | Daftar peserta rapat/kegiatan | PDF (tpl_daftar_hadir.html) |
| 5 | **Surat Undangan** | Undangan rapat/kegiatan | PDF (tpl_undangan.html) |
| 6 | **Notulen Kegiatan** | Hasil rapat/kegiatan | PDF (tpl_notulen.html) |
| 7 | **Dokumentasi Foto** | Foto konsumsi & kegiatan | JPG/PNG (tpl_dokumentasi.html) |
| 8 | **Buku Kas Umum (BKU)** | Bukti pencatatan transaksi | PDF (upload fitur baru) |

#### Template yang Dibutuhkan:
- ✅ `tpl_nota.html` (sudah ada)
- 🆕 `tpl_rab_konsumsi.html` (BARU - Rincian Biaya Makanan)
- 🆕 `tpl_bast_konsumsi.html` (BARU - Berita Acara Serah Terima Konsumsi)
- ✅ `tpl_daftar_hadir.html` (sudah ada)
- ✅ `tpl_undangan.html` (sudah ada)
- ✅ `tpl_notulen.html` (sudah ada)
- ✅ `tpl_dokumentasi.html` (sudah ada)

#### Format RAB Konsumsi (SIPLAH Compatible):
```
RINCIAN BIAYA (RAB)
KONSUMSI RAPAT/KEGIATAN [NAMA_KEGIATAN]
Nomor: [NOMOR_OTOMATIS]

Tanggal Kegiatan: [TANGGAL]
Tempat: [LOKASI]
Peserta: [JUMLAH] orang

┌─────────────────────────────────────────────────────────────────────┐
│ No │ Jenis Menu      │ Qty  │ Harga Satuan    │ Jumlah            │
├────┼─────────────────┼──────┼─────────────────┼───────────────────┤
│ 1  │ [MENU_1]        │ [QTY]│ Rp [HARGA]      │ Rp [SUBTOTAL]     │
│ 2  │ [MENU_2]        │ [QTY]│ Rp [HARGA]      │ Rp [SUBTOTAL]     │
│ 3  │ [MENU_3]        │ [QTY]│ Rp [HARGA]      │ Rp [SUBTOTAL]     │
├────┴─────────────────┴──────┴─────────────────┼───────────────────┤
│ TOTAL                                         │ Rp [TOTAL]        │
└─────────────────────────────────────────────────────────────────────┘

Terbilang: [TERBILANG]

Penyedia: [NAMA_PENYEDIA]
Alamat: [ALAMAT_PENYEDIA]
Kontak: [KONTAK_PENYEDIA]

[KOTA], [TANGGAL]

Mengetahui,
Ketua Panitia,              Bendahara,

[TANDA_TANGAN_1]           [TANDA_TANGAN_2]

[NAMA_KETUA]               [NAMA_BENDAHARA]
NIP. [NIP_KETUA]           NIP. [NIP_BENDAHARA]
```

#### Format BAST Konsumsi (SIPLAH Compatible):
```
BERITA ACARA SERAH TERIMA (BAST)
KONSUMSI RAPAT/KEGIATAN [NAMA_KEGIATAN]
Nomor: [NOMOR_OTOMATIS]

Pada hari ini [HARI], tanggal [TANGGAL], kami yang bertanda tangan di bawah ini:

1. Nama: [NAMA_PENYEDIA]
   Alamat: [ALAMAT_PENYEDIA]
   Selanjutnya disebut **PIHAK PERTAMA** (Penyedia)

2. Nama: [NAMA_BENDAHARA]
   NIP: [NIP_BENDAHARA]
   Jabatan: Bendahara BOS [NAMA_SEKOLAH]
   Selanjutnya disebut **PIHAK KEDUA** (Penerima)

PIHAK PERTAMA menyerahkan kepada PIHAK KEDUA berupa:
- Konsumsi untuk: [NAMA_KEGIATAN]
- Tanggal: [TANGGAL_KEGIATAN]
- Jumlah Peserta: [JUMLAH] orang
- Menu: [RINCIAN_MENU]
- Total: Rp [NOMINAL] (terbilang: [TERBILANG])

PIHAK KEDUA menyatakan telah menerima konsumsi tersebut dengan baik dan lengkap.

Demikian berita acara ini dibuat dengan sesungguhnya.

[KOTA], [TANGGAL]

PIHAK PERTAMA,           PIHAK KEDUA,

[TANDA_TANGAN_1]         [TANDA_TANGAN_2]

[NAMA_PENYEDIA]          [NAMA_BENDAHARA]
                         NIP. [NIP_BENDAHARA]
```

---

### 3️⃣ **PERJALANAN DINAS (SPPD) UNTUK RAPAT/KEGIATAN**

#### Dokumen Wajib:
| No | Dokumen | Keterangan | Format |
|----|---------|------------|--------|
| 1 | **Surat Perintah Perjalanan Dinas (SPPD)** | SPPD internal sekolah | PDF (template baru) |
| 2 | **Surat Undangan** | Undangan rapat/kegiatan dari pihak lain | PDF (tpl_undangan.html) |
| 3 | **Nota/Faktur Transportasi** | Tiket/bensin/tol | PDF (tpl_nota.html) |
| 4 | **Nota/Faktur Akomodasi** | Hotel (jika ada) | PDF (tpl_nota.html) |
| 5 | **Rincian Biaya (RAB)** | Rincian biaya perjalanan | PDF (template baru) |
| 6 | **Berita Acara Serah Terima (BAST)** | BAST SPPD | PDF (template baru) |
| 7 | **Laporan Perjalanan Dinas** | Laporan hasil kegiatan | PDF (template baru) |
| 8 | **Dokumentasi Foto** | Foto kegiatan di lokasi | JPG/PNG (tpl_dokumentasi.html) |
| 9 | **Buku Kas Umum (BKU)** | Bukti pencatatan transaksi | PDF (upload fitur baru) |

#### Template yang Dibutuhkan:
- 🆕 `tpl_sppd.html` (BARU - Surat Perintah Perjalanan Dinas)
- ✅ `tpl_undangan.html` (sudah ada)
- ✅ `tpl_nota.html` (sudah ada)
- 🆕 `tpl_rab_perjalanan.html` (BARU - RAB Perjalanan Dinas)
- 🆕 `tpl_bast_perjalanan.html` (BARU - BAST Perjalanan Dinas)
- 🆕 `tpl_laporan_perjalanan.html` (BARU - Laporan Perjalanan Dinas)
- ✅ `tpl_dokumentasi.html` (sudah ada)

#### Format SPPD (SIPLAH Compatible):
```
SURAT PERINTAH PERJALANAN DINAS (SPPD)
Nomor: [NOMOR_OTOMATIS]

Dasar:
1. DPA Sekolah [NAMA_SEKOLAH] TA [TAHUN]
2. Surat Undangan dari [INSTANSI_PENGUNDANG] Nomor: [NOMOR_SURAT] tanggal [TANGGAL]

Memerintahkan kepada:

1. Nama: [NAMA_1]
   NIP: [NIP_1]
   Jabatan: [JABATAN_1]
   Sebagai: [PERAN_1]

2. Nama: [NAMA_2]
   NIP: [NIP_2]
   Jabatan: [JABATAN_2]
   Sebagai: [PERAN_2]

Untuk:
- Mengikuti: [NAMA_KEGIATAN]
- Hari/Tanggal: [HARI_TANGGAL]
- Waktu: [WAKTU]
- Tempat: [LOKASI]
- Alamat: [ALAMAT_LENGKAP]

Demikian surat perintah ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.

[KOTA], [TANGGAL]

Kepala Sekolah,

[TANDA_TANGAN]

[NAMA_KEPALA_SEKOLAH]
NIP. [NIP_KEPALA_SEKOLAH]
```

#### Format RAB Perjalanan Dinas (SIPLAH Compatible):
```
RINCIAN BIAYA (RAB)
PERJALANAN DINAS [NAMA_KEGIATAN]
Nomor: [NOMOR_OTOMATIS]

Tanggal: [TANGGAL]
Lokasi: [KOTA_TUJUAN]
Peserta: [JUMLAH] orang

┌─────────────────────────────────────────────────────────────────────┐
│ No │ Jenis Biaya       │ Qty  │ Harga Satuan    │ Jumlah            │
├────┼───────────────────┼──────┼─────────────────┼───────────────────┤
│ 1  │ Transportasi      │ [QTY]│ Rp [HARGA]      │ Rp [SUBTOTAL]     │
│    │ - BBM/Tiket       │      │                 │                   │
│ 2  │ Uang Harian       │ [QTY]│ Rp [HARGA]      │ Rp [SUBTOTAL]     │
│ 3  │ Akomodasi         │ [QTY]│ Rp [HARGA]      │ Rp [SUBTOTAL]     │
│ 4  │ Representasi      │ [QTY]│ Rp [HARGA]      │ Rp [SUBTOTAL]     │
├────┴───────────────────┴──────┴─────────────────┼───────────────────┤
│ TOTAL                                           │ Rp [TOTAL]        │
└─────────────────────────────────────────────────────────────────────┘

Terbilang: [TERBILANG]

[KOTA], [TANGGAL]

Mengetahui,
Ketua Panitia,              Bendahara,

[TANDA_TANGAN_1]           [TANDA_TANGAN_2]

[NAMA_KETUA]               [NAMA_BENDAHARA]
NIP. [NIP_KETUA]           NIP. [NIP_BENDAHARA]
```

#### Format BAST Perjalanan Dinas (SIPLAH Compatible):
```
BERITA ACARA SERAH TERIMA (BAST)
PERJALANAN DINAS [NAMA_KEGIATAN]
Nomor: [NOMOR_OTOMATIS]

Pada hari ini [HARI], tanggal [TANGGAL], kami yang bertanda tangan di bawah ini:

1. Nama: [NAMA_PELAKSANA]
   NIP: [NIP_PELAKSANA]
   Jabatan: [JABATAN]
   Selanjutnya disebut **PIHAK PERTAMA** (Pelaksana)

2. Nama: [NAMA_BENDAHARA]
   NIP: [NIP_BENDAHARA]
   Jabatan: Bendahara BOS [NAMA_SEKOLAH]
   Selanjutnya disebut **PIHAK KEDUA** (Penerima)

PIHAK PERTAMA menyampaikan laporan perjalanan dinas kepada PIHAK KEDUA berupa:
- Kegiatan: [NAMA_KEGIATAN]
- Tanggal: [TANGGAL_KEGIATAN]
- Lokasi: [LOKASI]
- Total Biaya: Rp [NOMINAL] (terbilang: [TERBILANG])

PIHAK KEDUA menyatakan telah menerima laporan dan bukti biaya perjalanan dinas tersebut.

Demikian berita acara ini dibuat dengan sesungguhnya.

[KOTA], [TANGGAL]

PIHAK PERTAMA,           PIHAK KEDUA,

[TANDA_TANGAN_1]         [TANDA_TANGAN_2]

[NAMA_PELAKSANA]         [NAMA_BENDAHARA]
NIP. [NIP_PELAKSANA]     NIP. [NIP_BENDAHARA]
```

---

### 4️⃣ **PEMBELIAN BARANG/JASA DI BAWAH Rp 500.000** (Pengadaan Langsung)

#### Dokumen Wajib:
| No | Dokumen | Keterangan | Format |
|----|---------|------------|--------|
| 1 | **Nota/Faktur Penyedia** | Nota dari toko/penyedia | PDF (tpl_nota.html) |
| 2 | **Rincian Biaya (RAB)** | Rincian barang/jasa | PDF (template baru) |
| 3 | **Berita Acara Serah Terima (BAST)** | BAST barang/jasa | PDF (template baru) |
| 4 | **Surat Pesanan** (opsional) | Untuk pembelian > Rp 200rb | PDF (tpl_pesanan.html) |
| 5 | **Dokumentasi Foto** | Foto barang yang dibeli | JPG/PNG (tpl_dokumentasi.html) |
| 6 | **Buku Kas Umum (BKU)** | Bukti pencatatan transaksi | PDF (upload fitur baru) |

#### Template yang Dibutuhkan:
- ✅ `tpl_nota.html` (sudah ada)
- 🆕 `tpl_rab_barang.html` (BARU - RAB Pembelian Barang)
- 🆕 `tpl_bast_barang.html` (BARU - BAST Pembelian Barang)
- ✅ `tpl_pesanan.html` (sudah ada, opsional)
- ✅ `tpl_dokumentasi.html` (sudah ada)

#### Format RAB Barang (SIPLAH Compatible):
```
RINCIAN BIAYA (RAB)
PEMBELIAN BARANG/JASA [NAMA_BARANG]
Nomor: [NOMOR_OTOMATIS]

Tanggal Pembelian: [TANGGAL]
Kebutuhan: [URAIAN_KEBUTUHAN]

┌─────────────────────────────────────────────────────────────────────┐
│ No │ Nama Barang       │ Qty  │ Satuan │ Harga Satuan │ Jumlah     │
├────┼───────────────────┼──────┼────────┼──────────────┼────────────┤
│ 1  │ [BARANG_1]        │ [QTY]│ [UNIT] │ Rp [HARGA]   │ Rp [SUB]   │
│ 2  │ [BARANG_2]        │ [QTY]│ [UNIT] │ Rp [HARGA]   │ Rp [SUB]   │
│ 3  │ [BARANG_3]        │ [QTY]│ [UNIT] │ Rp [HARGA]   │ Rp [SUB]   │
├────┴───────────────────┴──────┴────────┴──────────────┼────────────┤
│ TOTAL                                                 │ Rp [TOTAL] │
└─────────────────────────────────────────────────────────────────────┘

Terbilang: [TERBILANG]

Penyedia: [NAMA_PENYEDIA]
Alamat: [ALAMAT_PENYEDIA]
Kontak: [KONTAK_PENYEDIA]

[KOTA], [TANGGAL]

Mengetahui,
Guru/Kaur Sarpras,        Bendahara,

[TANDA_TANGAN_1]          [TANDA_TANGAN_2]

[NAMA_GURU]               [NAMA_BENDAHARA]
NIP. [NIP_GURU]           NIP. [NIP_BENDAHARA]
```

#### Format BAST Barang (SIPLAH Compatible):
```
BERITA ACARA SERAH TERIMA (BAST)
PEMBELIAN BARANG/JASA [NAMA_BARANG]
Nomor: [NOMOR_OTOMATIS]

Pada hari ini [HARI], tanggal [TANGGAL], kami yang bertanda tangan di bawah ini:

1. Nama: [NAMA_PENYEDIA]
   Alamat: [ALAMAT_PENYEDIA]
   Selanjutnya disebut **PIHAK PERTAMA** (Penyedia)

2. Nama: [NAMA_BENDAHARA]
   NIP: [NIP_BENDAHARA]
   Jabatan: Bendahara BOS [NAMA_SEKOLAH]
   Selanjutnya disebut **PIHAK KEDUA** (Penerima)

PIHAK PERTAMA menyerahkan kepada PIHAK KEDUA berupa:
- Barang/Jasa: [RINCIAN_BARANG]
- Untuk keperluan: [URAIAN_KEBUTUHAN]
- Jumlah: [JUMLAH_BARANG]
- Total: Rp [NOMINAL] (terbilang: [TERBILANG])

PIHAK KEDUA menyatakan telah menerima barang tersebut dalam keadaan baik dan lengkap.

Demikian berita acara ini dibuat dengan sesungguhnya.

[KOTA], [TANGGAL]

PIHAK PERTAMA,           PIHAK KEDUA,

[TANDA_TANGAN_1]         [TANDA_TANGAN_2]

[NAMA_PENYEDIA]          [NAMA_BENDAHARA]
                         NIP. [NIP_BENDAHARA]
```

---

## 🆕 FITUR BARU: UPLOAD BKU 12 BULAN (Multi-Month BKU Upload)

### 📋 Deskripsi Fitur

Fitur **baru** untuk upload Buku Kas Umum (BKU) yang dapat:
- ✅ Upload BKU untuk **12 bulan** dalam satu tahun anggaran
- ✅ Upload **bertahap** (tidak harus sekaligus)
- ✅ Menyimpan **semua data BKU** untuk pengolahan nilai dokumen berikutnya
- ✅ **Tidak mengubah** fitur upload BKU yang sudah ada (tetap berfungsi terpisah)

### 🎯 Kebutuhan Fitur

#### 1. Database Structure (Google Sheets/PropertiesService)
```javascript
// Struktur data BKU per bulan
{
  "bku_2026": {
    "januari": {
      "file_id": "google_drive_file_id",
      "file_name": "BKU_Januari_2026.pdf",
      "upload_date": "2026-01-31T23:59:59",
      "status": "uploaded", // uploaded, processed, verified
      "total_transaksi": 15,
      "total_masuk": 50000000,
      "total_keluar": 45000000,
      "saldo_akhir": 5000000
    },
    "februari": { ... },
    // ... sampai desember
  }
}
```

#### 2. UI Components
- **Dashboard Widget**: "Status Upload BKU 12 Bulan"
- **Progress Bar**: Menampilkan bulan yang sudah/belum diupload
- **Upload Modal**: Form upload per bulan
- **Preview Table**: Tabel ringkasan semua BKU terupload

#### 3. File Structure (Baru)
```
📁 app-spj-bos/
├── form_bku_upload.html          ← Form upload BKU multi-month
├── tpl_bku_summary.html          ← Template ringkasan BKU 12 bulan
├── js_bku_manager.html           ← Logic manajemen BKU
└── css_bku.html                  ← Styling khusus BKU
```

#### 4. Functions (Code.js)
```javascript
// Fungsi baru untuk BKU multi-month
async function uploadBKUMultiMonth(bulan, fileData)
async function getBKUStatus(tahun)
async function getBKUSummary(tahun)
async function processBKUData(bulan, fileData)
async function exportBKUReport(tahun)
```

### 📐 Design UI

```
┌─────────────────────────────────────────────────────────────────────┐
│  📊 STATUS UPLOAD BKU TAHUN 2026                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Progress: ████████░░░░ 8/12 bulan (67%)                           │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Januari 2026    ✅ Uploaded      31 Jan 2026   [Preview]    │   │
│  │ Februari 2026   ✅ Uploaded      28 Feb 2026   [Preview]    │   │
│  │ Maret 2026      ✅ Uploaded      31 Mar 2026   [Preview]    │   │
│  │ April 2026      ✅ Uploaded      30 Apr 2026   [Preview]    │   │
│  │ Mei 2026        ✅ Uploaded      31 Mei 2026   [Preview]    │   │
│  │ Juni 2026       ✅ Uploaded      30 Jun 2026   [Preview]    │   │
│  │ Juli 2026       ��� Uploaded      31 Jul 2026   [Preview]    │   │
│  │ Agustus 2026    ✅ Uploaded      31 Agu 2026   [Preview]    │   │
│  │ September 2026  ⏳ Belum         -             [Upload]     │   │
│  │ Oktober 2026    ⏳ Belum         -             [Upload]     │   │
│  │ November 2026   ⏳ Belum         -             [Upload]     │   │
│  │ Desember 2026   ⏳ Belum         -             [Upload]     │   │
│  └──────────────────────────────────────────────────────────��──┘   │
│                                                                     │
│  [📥 Upload BKU]  [📤 Export Ringkasan]  [🖨️ Cetak Laporan]       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 TEMPLATE BARU YANG HARUS DIBUAT

### Daftar Template Baru (Total: 11 Template)

| No | Template File | Fungsi | Prioritas |
|----|---------------|--------|-----------|
| 1 | `tpl_bap_honor.html` | BAP Penyerahan Honorarium | 🔴 HIGH |
| 2 | `tpl_bast_konsumsi.html` | BAST Konsumsi | 🔴 HIGH |
| 3 | `tpl_bast_barang.html` | BAST Pembelian Barang | 🔴 HIGH |
| 4 | `tpl_bast_perjalanan.html` | BAST Perjalanan Dinas | 🔴 HIGH |
| 5 | `tpl_rab_konsumsi.html` | RAB Makanan & Minuman | 🔴 HIGH |
| 6 | `tpl_rab_barang.html` | RAB Pembelian Barang | 🔴 HIGH |
| 7 | `tpl_rab_perjalanan.html` | RAB Perjalanan Dinas | 🔴 HIGH |
| 8 | `tpl_sppd.html` | Surat Perintah Perjalanan Dinas | 🔴 HIGH |
| 9 | `tpl_laporan_perjalanan.html` | Laporan Perjalanan Dinas | 🟡 MEDIUM |
| 10 | `tpl_bku_summary.html` | Ringkasan BKU 12 Bulan | 🟡 MEDIUM |
| 11 | `tpl_validasi_spj.html` | Checklist Validasi SPJ | 🟢 LOW |
| 12 | `tpl_lra.html` | Laporan Realisasi Anggaran | 🟡 HIGH |
| 13 | `tpl_bapk.html` | Berita Acara Penutupan Kas | 🟡 HIGH |
| 14 | `tpl_pajak.html` | Rekapitulasi Pajak | 🟡 HIGH |
| 15 | `tpl_neraca.html` | Laporan Posisi Keuangan | 🟡 MEDIUM |
| 16 | `tpl_calk.html` | Catatan atas Laporan Keuangan | 🟡 MEDIUM |

---

## 🛠️ RENCANA IMPLEMENTASI

### **FASE 1: Template RAB & BAST** (Week 1-2)
- [ ] Buat 7 template RAB & BAST (prioritas tinggi)
- [ ] Buat form input untuk setiap template
- [ ] Integrasikan dengan sistem preview yang ada
- [ ] Test compatibility dengan format SIPLAH

### **FASE 2: Template Perjalanan Dinas** (Week 2-3)
- [ ] Buat template SPPD
- [ ] Buat template RAB Perjalanan
- [ ] Buat template Laporan Perjalanan
- [ ] Buat form input terkait

### **FASE 3: Fitur Upload BKU 12 Bulan** (Week 3-4)
- [ ] Buat database structure untuk BKU multi-month
- [ ] Buat UI dashboard status upload
- [ ] Buat form upload bertahap
- [ ] Buat fungsi export ringkasan BKU

### **FASE 4: Ask to AI - Conversational Reporting** (Week 4-7)
- [ ] Implementasi NLU (Natural Language Understanding) module
- [ ] Implementasi Data Extractor module
- [ ] Implementasi Excel Template Engine
- [ ] Buat Chat UI component (form_ask_to_ai.html)
- [ ] Integrasi dengan Groq/Gemini API
- [ ] Implementasi rate limiting & caching
- [ ] Test end-to-end workflow

### **FASE 5: Validasi & Export** (Week 7-8)
- [ ] Buat fitur validasi kelengkapan SPJ
- [ ] Buat export ZIP dokumen siap upload SIPLAH
- [ ] Buat checklist otomatis per jenis belanja
- [ ] Test end-to-end workflow

---

## 📊 CHECKLIST KELENGKAPAN DOKUMEN SPJ

### Matrix Dokumen per Jenis Belanja:

```
┌─────────────────────────────────────────────────────────────────────┐
│ Jenis Dokumen          │ Honor │ Makan │ SPPD │ Barang <500rb │    │
├─────────────────────────────────────────────────────────────────────┤
│ BAP/BAST               │   ✅  │   ✅  │   ✅  │      ✅       │    │
│ RAB                    │   ❌  │   ✅  │   ✅  │      ✅       │    │
│ Nota/Faktur            │   ❌  │   ✅  │   ✅  │      ✅       │    │
│ Daftar Honor           │   ✅  │   ❌  │   ❌  │      ❌       │    │
│ Daftar Hadir           │   ✅  │   ✅  │   ❌  │      ❌       │    │
│ Notulen                │   ✅  │   ✅  │   ❌  │      ❌       │    │
│ SPPD                   │   ❌  │   ❌  │   ✅  │      ❌       │    │
│ Laporan Perjalanan     │   ❌  │   ❌  │   ✅  │      ❌       │    │
│ Dokumentasi            │   ✅  │   ✅  │   ✅  │      ✅       │    │
│ BKU                    │   ✅  │   ✅  │   ✅  │      ✅       │    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔗 INTEGRASI DENGAN FITUR YANG SUDAH ADA

### Fitur yang **TIDAK** diubah:
- ✅ Upload BKU existing (tetap berfungsi terpisah)
- ✅ Template yang sudah ada (tpl_kwitansi, tpl_nota, dll)
- ✅ Sistem preview PDF yang ada
- ✅ Dashboard existing

### Fitur yang **DITAMBAHKAN**:
- 🆕 Template RAB & BAST baru
- 🆕 Upload BKU 12 bulan (multi-month)
- 🆕 **Ask to AI** - Conversational Financial Reporting
- 🆕 Excel report generation (XLSX)
- 🆕 Validasi kelengkapan SPJ
- 🆕 Export ZIP dokumen SIPLAH

---

## 📝 CATATAN TEKNIS

### 1. **Format Nomor Dokumen Otomatis**
```
Format: [KODE_DOKUMEN]/[KODE_SEKOLAH]/[BULAN]/[TAHUN]/[URUTAN]
Contoh:
- BAP/SDN001-VII/03/2026/001
- RAB/SDN001-VII/03/2026/001
- BAST/SDN001-VII/03/2026/001
- SPPD/SDN001-VII/03/2026/001
- LRA/SDN001-XII/2026/001
- BAPK/SDN001-XII/2026/001
```

### 2. **Storage Strategy**
- **Google Drive**: Simpan file PDF BKU
- **PropertiesService (User)**: Simpan metadata & status
- **Google Sheets**: Log audit & riwayat transaksi

### 3. **Security**
- Enkripsi data sensitif (NIP, nominal)
- Access control per user
- Audit log semua aktivitas

### 4. **Compatibility**
- Format PDF A3/A4 (sesuai standar SIPLAH)
- Resolution min. 300 DPI untuk scan
- File size max. 2MB per dokumen

---

## ✅ TESTING CHECKLIST

### Template Testing:
- [ ] Preview dokumen muncul dengan benar
- [ ] Nomor dokumen auto-generate berfungsi
- [ ] Tanda tangan & stempel muncul di posisi benar
- [ ] Print PDF berfungsi dengan layout sempurna
- [ ] Mobile responsive (optional)

### BKU Upload Testing:
- [ ] Upload per bulan berfungsi
- [ ] Progress bar update otomatis
- [ ] Preview ringkasan menampilkan data benar
- [ ] Export ZIP menghasilkan file lengkap
- [ ] Data persist setelah refresh

### Ask to AI Feature Testing:
- [ ] NLU intent classification accuracy > 90%
- [ ] Data extraction dari BKU 12 bulan berfungsi
- [ ] Excel template generation sesuai format
- [ ] Download file XLSX berfungsi
- [ ] Chat UI responsive dan user-friendly
- [ ] Rate limiting bekerja dengan baik
- [ ] Caching mengurangi API calls
- [ ] Error handling menampilkan pesan yang jelas
- [ ] Response time < 30 detik per request

### Integration Testing:
- [ ] Workflow lengkap dari input → preview → print → upload
- [ ] Tidak ada konflik dengan fitur existing
- [ ] Performance tetap baik dengan 12 bulan data

---

## 📚 REFERENSI REGULASI

1. **Perpres No. 12 Tahun 2021** - Pengadaan Barang/Jasa Pemerintah
2. **Perpres No. 25 Tahun 2025** - Perubahan Perpres 12/2021
3. **Permendikbud No. 34 Tahun 2024** - Juknis BOS Reguler
4. **Permendikbudristek No. 48 Tahun 2021** - ARKAS
5. **Perdirjen Dikdasmen No. 13695/D7/KR/2021** - Petunjuk Teknis ARKAS
6. **Panduan SIPLAH 2026** - Kemdikbud
7. **SE Dirjen Dikdasmen** - Implementasi SIPLAH untuk SD
8. **SAP (Standar Akuntansi Pemerintahan)** - PP No. 71 Tahun 2010

---

## 🎯 NEXT STEPS

1. **Review & Approval**: Pastikan semua requirement sesuai
2. **Template Development**: Mulai dari RAB & BAST (prioritas)
3. **UI/UX Design**: Finalisasi design dashboard BKU & Ask to AI
4. **Development**: Implementasi bertahap sesuai fase
5. **Testing**: UAT dengan user actual
6. **Deployment**: Rollout ke production

---

*Dibuat: 2026-03-07*
*Version: 3.0*
*Status: Ready for Implementation*
*Last Updated: 2026-03-07 - Ask to AI Feature (Conversational Financial Reporting)**
