# 🤖 INTEGRASI GOOGLE APPS SCRIPT DENGAN AI GRATIS UNTUK PRODUCTION

## 📋 RINGKASAN EKSEKUTIF

**Ya, Google Apps Script BISA diintegrasikan dengan AI gratis untuk production**, dengan beberapa pertimbangan penting. Berikut adalah analisis mendalam dan panduan implementasi.

---

## 🎯 OPSI AI GRATIS UNTUK PRODUCTION

### 1. **Groq Cloud API** ⭐ RECOMMENDED

| Aspek | Detail |
|-------|--------|
| **Model** | Llama 3.1, Llama 3, Mixtral, Phi-3, Gemma |
| **Free Tier** | ✅ Tersedia (dengan rate limit) |
| **Rate Limit** | ~30 requests/minute (free tier) |
| **Kecepatan** | Sangat cepat (LPU technology) |
| **Auth** | API Key |
| **Production Ready** | ✅ Ya |

**Kelebihan:**
- ⚡ Inferensi tercepat (hingga 500 tokens/detik)
- 🆓 Free tier cukup untuk penggunaan sekolah
- 🔌 OpenAI-compatible API
- 📊 Dashboard monitoring tersedia

**Kekurangan:**
- ⚠️ Rate limit untuk free tier
- ⚠️ Model terbatas pada yang didukung Groq

---

### 2. **Hugging Face Inference API**

| Aspek | Detail |
|-------|--------|
| **Model** | Ribuan model (Llama, Phi, Mistral, dll) |
| **Free Tier** | ✅ Tersedia |
| **Rate Limit** | ~1000 requests/hari (varies) |
| **Kecepatan** | Sedang |
| **Auth** | HF Token |
| **Production Ready** | ✅ Ya (dengan paid tier) |

**Kelebihan:**
- 🎯 Pilihan model sangat banyak
- 🆓 Free tier tersedia
- 🔌 Multiple providers (Groq, Cerebras, Together, dll)
- 🔄 Automatic failover

**Kekurangan:**
- ⚠️ Rate limit free tier cukup ketat
- ⚠️ Latency bervariasi per model

---

### 3. **Ollama Self-Hosted** 🏠

| Aspek | Detail |
|-------|--------|
| **Model** | Llama, Phi, Mistral, dll (open source) |
| **Free Tier** | ✅ 100% Gratis (self-hosted) |
| **Rate Limit** | Tidak ada (tergantung hardware) |
| **Kecepatan** | Tergantung hardware |
| **Auth** | Optional |
| **Production Ready** | ⚠️ Dengan setup yang tepat |

**Kelebihan:**
- 💰 100% gratis (hanya biaya server)
- 🔒 Data tetap di infrastruktur sendiri
- 🎯 Full control atas model
- 🚫 No rate limits

**Kekurangan:**
- 🖥️ Butuh server sendiri (VPS ~$5-20/bulan)
- 🔧 Perlu setup dan maintenance
- 🌐 Perlu public endpoint untuk diakses Apps Script

---

### 4. **Together AI**

| Aspek | Detail |
|-------|--------|
| **Model** | Llama, Phi, Mistral, Qwen, dll |
| **Free Tier** | ✅ $25 credit gratis (trial) |
| **Rate Limit** | Tergantung credit |
| **Kecepatan** | Cepat |
| **Auth** | API Key |
| **Production Ready** | ✅ Ya |

---

### 5. **Google AI Studio (Gemini)**

| Aspek | Detail |
|-------|--------|
| **Model** | Gemini 1.5 Flash/Pro |
| **Free Tier** | ✅ 60 requests/minute gratis |
| **Rate Limit** | 60 RPM, 1500 RPD |
| **Kecepatan** | Cepat |
| **Auth** | API Key |
| **Production Ready** | ✅ Ya |

**Kelebihan:**
- 🎯 Terintegrasi dengan ekosistem Google
- 🆓 Free tier cukup besar
- 📝 Context window besar (1M tokens)

---

## 📊 PERBANDINGAN LENGKAP

| Provider | Free Tier | Rate Limit | Model | Production | Setup |
|----------|-----------|------------|-------|------------|-------|
| **Groq** | ✅ | 30 RPM | Llama, Phi, Mixtral | ✅ | Mudah |
| **Hugging Face** | ✅ | 1000/hari | Semua | ✅ | Mudah |
| **Ollama** | ✅ 100% | Unlimited | Semua | ⚠️ | Sulit |
| **Together AI** | ✅ $25 | Credit-based | Semua | ✅ | Mudah |
| **Gemini** | ✅ | 60 RPM | Gemini | ✅ | Mudah |

---

## 🛠️ TAHAPAN INTEGRASI (STEP-BY-STEP)

### **FASE 1: Persiapan (Week 1)**

#### 1.1 Pilih Provider AI
Untuk kasus SPJ BOS, **Groq** atau **Gemini** direkomendasikan karena:
- Rate limit cukup untuk penggunaan sekolah
- Setup mudah
- Dokumentasi lengkap
- Production-ready

#### 1.2 Buat API Key

**Groq:**
```
1. Kunjungi https://console.groq.com
2. Sign up/login
3. Navigate ke "API Keys"
4. Create API Key baru
5. Simpan key (tidak bisa dilihat lagi!)
```

**Gemini:**
```
1. Kunjungi https://makersuite.google.com/app/apikey
2. Login dengan Google account
3. Create API Key
4. Simpan key
```

#### 1.3 Simpan API Key di Apps Script

```javascript
// Simpan di Script Properties (aman!)
function saveAPIKey() {
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty('GROQ_API_KEY', 'gsk_your_api_key_here');
  properties.setProperty('GEMINI_API_KEY', 'your_gemini_key');
}
```

---

### **FASE 2: Implementasi Basic Integration (Week 1-2)**

#### 2.1 Setup UrlFetchApp Service

```javascript
/**
 * Service untuk integrasi Groq AI
 */
var GroqService = (function() {
  
  var BASE_URL = 'https://api.groq.com/openai/v1/chat/completions';
  
  function getApiKey() {
    return PropertiesService.getScriptProperties().getProperty('GROQ_API_KEY');
  }
  
  /**
   * Call Groq API untuk classification
   * @param {string} prompt - Prompt untuk AI
   * @param {string} model - Model yang digunakan (default: llama-3.1-8b-instant)
   * @returns {string} Response dari AI
   */
  function chat(prompt, model) {
    model = model || 'llama-3.1-8b-instant';
    
    var payload = JSON.stringify({
      'model': model,
      'messages': [
        {
          'role': 'system',
          'content': 'Anda adalah asisten AI yang membantu pengelolaan keuangan sekolah dan SPJ BOS.'
        },
        {
          'role': 'user',
          'content': prompt
        }
      ],
      'temperature': 0.3,
      'max_tokens': 500
    });
    
    var options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': payload,
      'headers': {
        'Authorization': 'Bearer ' + getApiKey()
      },
      'muteHttpExceptions': true,
      'timeout': 30000
    };
    
    try {
      var response = UrlFetchApp.fetch(BASE_URL, options);
      var responseCode = response.getResponseCode();
      var content = response.getContentText();
      
      if (responseCode === 200) {
        var json = JSON.parse(content);
        return json.choices[0].message.content;
      } else {
        Logger.log('Error ' + responseCode + ': ' + content);
        throw new Error('Groq API Error: ' + responseCode);
      }
    } catch (e) {
      Logger.log('GroqService error: ' + e.toString());
      throw e;
    }
  }
  
  /**
   * Call dengan retry mechanism
   */
  function chatWithRetry(prompt, model, maxRetries) {
    maxRetries = maxRetries || 3;
    
    for (var i = 0; i < maxRetries; i++) {
      try {
        return chat(prompt, model);
      } catch (e) {
        if (i === maxRetries - 1) throw e;
        Utilities.sleep(1000 * Math.pow(2, i)); // Exponential backoff
      }
    }
  }
  
  return {
    chat: chat,
    chatWithRetry: chatWithRetry
  };
  
})();
```

#### 2.2 Setup Gemini Service (Alternative)

```javascript
/**
 * Service untuk integrasi Google Gemini AI
 */
var GeminiService = (function() {
  
  var BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
  
  function getApiKey() {
    return PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  }
  
  /**
   * Call Gemini API
   */
  function generateContent(prompt, model) {
    model = model || 'gemini-1.5-flash';
    
    var url = BASE_URL + '/' + model + ':generateContent?key=' + getApiKey();
    
    var payload = JSON.stringify({
      'contents': [{
        'parts': [{
          'text': prompt
        }]
      }],
      'generationConfig': {
        'temperature': 0.3,
        'maxOutputTokens': 500
      }
    });
    
    var options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': payload,
      'muteHttpExceptions': true,
      'timeout': 30000
    };
    
    try {
      var response = UrlFetchApp.fetch(url, options);
      var content = response.getContentText();
      var json = JSON.parse(content);
      
      if (json.candidates && json.candidates[0]) {
        return json.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Gemini API Error: ' + content);
      }
    } catch (e) {
      Logger.log('GeminiService error: ' + e.toString());
      throw e;
    }
  }
  
  return {
    generateContent: generateContent
  };
  
})();
```

---

### **FASE 3: Implementasi Use Cases (Week 2-3)**

#### 3.1 Auto-Classification Transaksi (ARKAS)

```javascript
/**
 * AI-powered transaction classification
 * @param {string} description - Deskripsi transaksi
 * @param {number} amount - Nominal transaksi
 * @param {string} vendor - Nama vendor/penyedia
 * @returns {object} {kodeRekening, namaRekening, confidence}
 */
function classifyTransaction(description, amount, vendor) {
  var prompt = 
    'Klasifikasikan transaksi berikut ke kode rekening ARKAS:\n\n' +
    'Deskripsi: ' + description + '\n' +
    'Nominal: Rp ' + amount + '\n' +
    'Vendor: ' + vendor + '\n\n' +
    'Pilih salah satu kode rekening berikut:\n' +
    '5.1.02.01.01 - Belanja Pegawai - Honorarium\n' +
    '5.1.02.02.01 - Belanja Barang & Jasa - Makan Minum\n' +
    '5.1.02.03.01 - Belanja Perjalanan Dinas\n' +
    '5.1.02.04.01 - Belanja Modal - Peralatan\n' +
    '5.1.02.05.01 - Belanja Barang & Jasa - ATK\n\n' +
    'Format jawaban (JSON):\n' +
    '{\n' +
    '  "kodeRekening": "X.X.XX.XX.XX",\n' +
    '  "namaRekening": "Nama Rekening",\n' +
    '  "confidence": 0.95\n' +
    '}';
  
  try {
    var response = GroqService.chat(prompt);
    // Parse JSON response
    var jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch (e) {
    Logger.log('Classification error: ' + e.toString());
    return null;
  }
}

// Test
function testClassification() {
  var result = classifyTransaction('Honor guru honorer bulan Januari', 500000, 'Guru Honorer');
  Logger.log(result);
  // Output: {kodeRekening: "5.1.02.01.01", namaRekening: "Belanja Pegawai - Honorarium", confidence: 0.95}
}
```

#### 3.2 Tax Calculation Engine

```javascript
/**
 * AI-powered tax detection and calculation
 */
function calculateTax(description, amount, vendorType) {
  var prompt = 
    'Analisis apakah transaksi berikut kena pajak dan hitung jumlahnya:\n\n' +
    'Deskripsi: ' + description + '\n' +
    'Nominal: Rp ' + amount + '\n' +
    'Jenis Vendor: ' + vendorType + '\n\n' +
    'Aturan pajak Indonesia 2026:\n' +
    '- PPh 21 Final 5% untuk honorarium > Rp 500.000\n' +
    '- PPh 23 2% untuk jasa > Rp 750.000\n' +
    '- PPN 11% untuk pembelian barang (kecuali exempt)\n' +
    '- PPh 4(2) 10% final untuk sewa\n\n' +
    'Format jawaban (JSON):\n' +
    '{\n' +
    '  "pph21": 0,\n' +
    '  "pph23": 0,\n' +
    '  "ppn": 0,\n' +
    '  "pph4": 0,\n' +
    '  "totalTax": 0,\n' +
    '  "isFinal": false,\n' +
    '  "explanation": "Penjelasan"\n' +
    '}';
  
  try {
    var response = GroqService.chat(prompt);
    var jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch (e) {
    Logger.log('Tax calculation error: ' + e.toString());
    return null;
  }
}
```

#### 3.3 Generate Laporan Keuangan

```javascript
/**
 * Generate laporan keuangan dari data BKU
 */
function generateFinancialReport(reportType, transactions, period) {
  var prompt = 
    'Buatkan ' + reportType + ' berdasarkan data transaksi berikut:\n\n' +
    'Periode: ' + period + '\n\n' +
    'Data Transaksi:\n' +
    transactions.map(function(t) {
      return '- ' + t.date + ': ' + t.description + ' = Rp ' + t.amount;
    }).join('\n') + '\n\n' +
    'Format sesuai Standar Akuntansi Pemerintahan (SAP).\n' +
    'Sertakan:\n' +
    '- Judul laporan\n' +
    '- Periode\n' +
    '- Tabel dengan kolom yang sesuai\n' +
    '- Total dan subtotal\n' +
    '- Tanggal dan tanda tangan';
  
  try {
    var response = GroqService.chat(prompt, 'llama-3.1-70b-versatile');
    return response;
  } catch (e) {
    Logger.log('Report generation error: ' + e.toString());
    throw e;
  }
}

/**
 * Generate Berita Acara Penutupan Kas (BAPK)
 */
function generateBAPK(cashData) {
  var prompt = 
    'Buatkan Berita Acara Penutupan Kas (BAPK) dengan data:\n\n' +
    'Saldo Awal: Rp ' + cashData.saldoAwal + '\n' +
    'Total Penerimaan: Rp ' + cashData.totalPenerimaan + '\n' +
    'Total Pengeluaran: Rp ' + cashData.totalPengeluaran + '\n' +
    'Saldo Akhir: Rp ' + cashData.saldoAkhir + '\n' +
    'Saldo Fisik: Rp ' + cashData.saldoFisik + '\n\n' +
    'Format resmi sesuai standar ARKAS/SIPAH.';
  
  return GroqService.chat(prompt);
}
```

#### 3.4 Anomaly Detection

```javascript
/**
 * Deteksi transaksi anomali/tidak wajar
 */
function detectAnomalies(transactions) {
  var prompt = 
    'Analisis transaksi berikut dan deteksi anomali:\n\n' +
    transactions.map(function(t) {
      return '- ' + t.date + ': ' + t.description + ' = Rp ' + t.amount + ' (Vendor: ' + t.vendor + ')';
    }).join('\n') + '\n\n' +
    'Deteksi:\n' +
    '- Harga di atas rata-rata pasar\n' +
    '- Transaksi berulang ke vendor sama\n' +
    '- Pola tidak wajar\n' +
    '- Pembelian di atas threshold\n\n' +
    'Format jawaban (JSON array):\n' +
    '[\n' +
    '  {\n' +
    '    "transactionId": "TRX-001",\n' +
    '    "anomaly": "Harga di atas rata-rata pasar 25%",\n' +
    '    "severity": "medium",\n' +
    '    "recommendation": "Verifikasi harga pasar"\n' +
    '  }\n' +
    ']';
  
  try {
    var response = GroqService.chat(prompt);
    var jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (e) {
    Logger.log('Anomaly detection error: ' + e.toString());
    return [];
  }
}
```

---

### **FASE 4: Production Deployment (Week 3-4)**

#### 4.1 Rate Limiting & Quota Management

```javascript
/**
 * Rate limiter untuk menghindari API quota exceeded
 */
var RateLimiter = (function() {
  
  var CACHE_KEY = 'ai_rate_limit_cache';
  
  function getCache() {
    var cache = PropertiesService.getUserProperties().getProperty(CACHE_KEY);
    return cache ? JSON.parse(cache) : { count: 0, resetTime: 0 };
  }
  
  function saveCache(cache) {
    PropertiesService.getUserProperties().setProperty(CACHE_KEY, JSON.stringify(cache));
  }
  
  /**
   * Check if request is allowed
   */
  function isAllowed(requestsPerMinute) {
    var cache = getCache();
    var now = new Date().getTime();
    
    // Reset counter if minute passed
    if (now > cache.resetTime) {
      cache = { count: 0, resetTime: now + 60000 };
    }
    
    if (cache.count >= requestsPerMinute) {
      return false;
    }
    
    cache.count++;
    saveCache(cache);
    return true;
  }
  
  /**
   * Wait until rate limit allows
   */
  function waitForLimit(requestsPerMinute) {
    var waitTime = 0;
    while (!isAllowed(requestsPerMinute)) {
      Utilities.sleep(1000);
      waitTime += 1000;
      if (waitTime > 60000) {
        throw new Error('Rate limit exceeded, please try again later');
      }
    }
  }
  
  return {
    isAllowed: isAllowed,
    waitForLimit: waitForLimit
  };
  
})();

// Usage wrapper
function safeChat(prompt) {
  RateLimiter.waitForLimit(30); // Groq free tier: 30 RPM
  return GroqService.chat(prompt);
}
```

#### 4.2 Caching untuk Optimisasi

```javascript
/**
 * Cache service untuk mengurangi API calls
 */
var AICache = (function() {
  
  var CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  
  function getCacheKey(prompt) {
    return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, prompt);
  }
  
  function get(prompt) {
    var cache = CacheService.getUserCache();
    var key = 'ai_' + getCacheKey(prompt);
    var cached = cache.get(key);
    
    if (cached) {
      Logger.log('Cache hit!');
      return cached;
    }
    
    Logger.log('Cache miss');
    return null;
  }
  
  function put(prompt, response) {
    var cache = CacheService.getUserCache();
    var key = 'ai_' + getCacheKey(prompt);
    cache.put(key, response, CACHE_DURATION / 1000);
  }
  
  return {
    get: get,
    put: put
  };
  
})();

// Usage with cache
function cachedChat(prompt) {
  // Try cache first
  var cached = AICache.get(prompt);
  if (cached) return cached;
  
  // Call API
  var response = safeChat(prompt);
  
  // Save to cache
  AICache.put(prompt, response);
  
  return response;
}
```

#### 4.3 Error Handling & Logging

```javascript
/**
 * Comprehensive error handling
 */
var AIErrorHandler = (function() {
  
  var LOG_SHEET = 'AI_Error_Log';
  
  function logError(functionName, error, prompt) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(LOG_SHEET);
    
    if (!sheet) {
      sheet = ss.insertSheet(LOG_SHEET);
      sheet.appendRow(['Timestamp', 'Function', 'Error', 'Prompt', 'User']);
    }
    
    sheet.appendRow([
      new Date(),
      functionName,
      error.toString(),
      prompt.substring(0, 500),
      Session.getActiveUser().getEmail()
    ]);
  }
  
  function handleError(functionName, error, prompt, fallback) {
    logError(functionName, error, prompt);
    
    // Try fallback if provided
    if (fallback) {
      try {
        return fallback();
      } catch (e) {
        Logger.log('Fallback also failed: ' + e.toString());
      }
    }
    
    throw error;
  }
  
  return {
    logError: logError,
    handleError: handleError
  };
  
})();

// Usage
function robustChat(prompt) {
  try {
    return cachedChat(prompt);
  } catch (e) {
    return AIErrorHandler.handleError('robustChat', e, prompt, function() {
      // Fallback to Gemini if Groq fails
      return GeminiService.generateContent(prompt);
    });
  }
}
```

---

### **FASE 5: UI Integration (Week 4)**

#### 5.1 Sidebar UI untuk AI Features

```html
<!-- form_ai_assistant.html -->
<div id="aiAssistant">
  <h3>🤖 AI Assistant</h3>
  
  <div class="form-group">
    <label>Pilih Fitur AI:</label>
    <select id="aiFeature">
      <option value="classify">Klasifikasi Transaksi</option>
      <option value="tax">Hitung Pajak</option>
      <option value="report">Generate Laporan</option>
      <option value="anomaly">Deteksi Anomali</option>
    </select>
  </div>
  
  <div id="aiInput">
    <!-- Dynamic input fields -->
  </div>
  
  <button onclick="runAIFeature()" class="btn-primary">
    🚀 Jalankan AI
  </button>
  
  <div id="aiResult" class="result-box"></div>
</div>

<script>
function runAIFeature() {
  var feature = document.getElementById('aiFeature').value;
  var resultDiv = document.getElementById('aiResult');
  
  resultDiv.innerHTML = '⏳ Memproses...';
  
  google.script.run
    .withSuccessHandler(function(result) {
      resultDiv.innerHTML = '<pre>' + JSON.stringify(result, null, 2) + '</pre>';
    })
    .withFailureHandler(function(error) {
      resultDiv.innerHTML = '❌ Error: ' + error.message;
    })
    .executeAIFeature(feature, getFormData());
}
</script>
```

#### 5.2 Backend Handler

```javascript
/**
 * Handler untuk AI features dari UI
 */
function executeAIFeature(feature, data) {
  switch (feature) {
    case 'classify':
      return classifyTransaction(data.description, data.amount, data.vendor);
    
    case 'tax':
      return calculateTax(data.description, data.amount, data.vendorType);
    
    case 'report':
      return generateFinancialReport(data.reportType, data.transactions, data.period);
    
    case 'anomaly':
      return detectAnomalies(data.transactions);
    
    default:
      throw new Error('Unknown feature: ' + feature);
  }
}
```

---

## 📊 ARSITEKTUR PRODUCTION

```
┌─────────────────────────────────────────────────────────────────────┐
│                    GOOGLE APPS SCRIPT (Client)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │   Groq      │  │   Gemini    │  │   Cache     │  │   Rate     │ │
│  │   Service   │  │   Service   │  │   Service   │  │  Limiter   │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────┬──────┘ │
│         │                │                │                │        │
│         └────────────────┴────────────────┴────────────────┘        │
│                              │                                       │
│                        ┌─────▼─────┐                                │
│                        │   AI      │                                │
│                        │  Router   │                                │
│                        └─────┬─────┘                                │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   External AI API   │
                    ├─────────────────────┤
                    │  • Groq Cloud       │
                    │  • Google Gemini    │
                    │  • Hugging Face     │
                    │  • Ollama (VPS)     │
                    └─────────────────────┘
```

---

## 🔒 KEAMANAN & BEST PRACTICES

### 1. **API Key Security**

```javascript
// ✅ BENAR - Simpan di Script Properties
PropertiesService.getScriptProperties().setProperty('API_KEY', key);

// ❌ SALAH - Hardcode di code
var API_KEY = 'sk-1234567890'; // JANGAN PERNAH!
```

### 2. **Data Privacy**

```javascript
// Anonymize sensitive data before sending to AI
function anonymizeData(data) {
  return {
    description: data.description,
    amount: data.amount,
    // Jangan kirim NIP, nama lengkap, dll
    vendorType: getVendorType(data.vendor)
  };
}
```

### 3. **Quota Management**

| Quota Type | Limit | Strategy |
|------------|-------|----------|
| UrlFetch/day | 20,000 | Cache responses |
| UrlFetch/minute | 60 | Rate limiting |
| Script runtime | 6 min/batch | Process in chunks |

---

## 💰 ESTIMASI BIAYA

### Skenario: Sekolah dengan 500 transaksi/bulan

| Provider | Free Tier | Usage | Overage Cost |
|----------|-----------|-------|--------------|
| **Groq** | 30 RPM | ~20 RPM | $0 |
| **Gemini** | 60 RPM | ~20 RPM | $0 |
| **Hugging Face** | 1000/hari | ~50/hari | $0 |

**Kesimpulan:** Untuk penggunaan sekolah, **FREE tier cukup** tanpa biaya tambahan.

---

## ✅ CHECKLIST DEPLOYMENT

### Pre-Deployment:
- [ ] API Key dibuat dan disimpan di Script Properties
- [ ] Service classes (Groq, Gemini) diimplementasi
- [ ] Rate limiter di-setup
- [ ] Cache service di-konfigurasi
- [ ] Error handling lengkap

### Testing:
- [ ] Unit test setiap function AI
- [ ] Test rate limiting
- [ ] Test error scenarios
- [ ] Test dengan data real

### Production:
- [ ] Deploy sebagai Library atau Add-on
- [ ] Setup monitoring (Error log sheet)
- [ ] Dokumentasi user
- [ ] Training user

---

## 🎯 REKOMENDASI UNTUK SPJ BOS

### Untuk Use Case SPJ BOS, direkomendasikan:

**Primary: Groq API**
- Model: `llama-3.1-8b-instant`
- Alasan: Cepat, gratis cukup, akurat untuk classification

**Fallback: Gemini**
- Model: `gemini-1.5-flash`
- Alasan: Backup jika Groq down, free tier besar

**Future: Self-hosted Ollama**
- Jika usage sudah melebihi free tier
- Deploy di VPS (~$10/bulan)
- Full control dan privacy

---

## 📚 REFERENSI

1. [Groq API Documentation](https://console.groq.com/docs)
2. [Google Gemini API](https://ai.google.dev/docs)
3. [Apps Script UrlFetchApp](https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app)
4. [Hugging Face Inference API](https://huggingface.co/docs/api-inference)
5. [Ollama Documentation](https://ollama.ai/docs)

---

*Dibuat: 2026-03-07*  
*Version: 1.0*  
*Status: Production Ready*
