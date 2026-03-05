// ─── HELPER FUNCTION FOR MODULAR HTML INCLUDES ───────────
function include(filename) {
    return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
}

function doGet() {
    return HtmlService.createTemplateFromFile('login')
        .evaluate()
        .setTitle('Si-BOS | Login Portal')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getMainPageHtml() {
    // ═══════════════════════════════════════════════════════════════════
    // REKOMENDASI: Gunakan FrontEnd.html (ASLI) untuk production
    // FrontEnd_v2.html adalah versi modular untuk development/testing saja
    // ═══════════════════════════════════════════════════════════════════
    // return HtmlService.createTemplateFromFile('FrontEnd') // ← ORIGINAL
    return HtmlService.createTemplateFromFile('FrontEnd_v2') // ← MODULAR (TESTING ONLY)
        .evaluate()
        .setTitle('Si-BOS | Sistem Administrasi SPJ (v2)')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .getContent();
}

// Entry point dev (untuk tes FrontEnd_v2 secara terpisah jika perlu)
function doGetV2() {
    return HtmlService.createTemplateFromFile('FrontEnd_v2')
        .evaluate()
        .setTitle('Si-BOS v2 | DEV MODE')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function MINTA_IZIN_AKSES() {
    const file = DriveApp.createFile('Test', 'Izin', MimeType.PLAIN_TEXT);
    Drive.Files.remove(file.getId());
    Logger.log("Izin Berhasil Diberikan!");
}

function getBkuFilesFromDrive() {
    try {
        const files = [];
        // Mencari file Excel (.xlsx) atau Google Sheets yang mengandung kata "BKU" atau "ARKAS"
        const queries = [
            'mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" and title contains "BKU"',
            'mimeType = "application/vnd.google-apps.spreadsheet" and title contains "BKU"',
            'mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" and title contains "ARKAS"',
            'mimeType = "application/vnd.google-apps.spreadsheet" and title contains "ARKAS"',
            'mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" and title contains "bku"',
            'mimeType = "application/vnd.google-apps.spreadsheet" and title contains "bku"'
        ];

        queries.forEach(query => {
            try {
                const driveFiles = DriveApp.searchFiles(query);
                while (driveFiles.hasNext()) {
                    const file = driveFiles.next();
                    // Check if file already added (avoid duplicates)
                    const exists = files.some(f => f.id === file.getId());
                    if (!exists) {
                        files.push({
                            id: file.getId(),
                            name: file.getName(),
                            date: Utilities.formatDate(file.getDateCreated(), "GMT+7", "dd-MM-yyyy HH:mm")
                        });
                    }
                }
            } catch (e) {
                Logger.log('Query error: ' + e.toString());
            }
        });

        // Sort by date (newest first)
        files.sort((a, b) => new Date(b.date) - new Date(a.date));

        return { success: true, files: files };
    } catch (e) {
        Logger.log('getBkuFilesFromDrive error: ' + e.toString());
        return { success: false, error: e.toString() };
    }
}

function processExcelByFileId(fileId) {
    try {
        Logger.log('Processing file ID: ' + fileId);

        const file = DriveApp.getFileById(fileId);
        Logger.log('File name: ' + file.getName());
        Logger.log('File MIME type: ' + file.getMimeType());

        let spreadsheet;
        let tempFileId = null;

        try {
            // Jika file adalah Excel asli (.xlsx), konversi ke Google Sheets
            if (file.getMimeType() === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                Logger.log('Converting Excel to Google Sheets...');
                const blob = file.getBlob();
                const config = {
                    title: "temp_" + fileId + "_" + new Date().getTime(),
                    parents: [{ id: "root" }]
                };
                const tempFile = Drive.Files.insert(config, blob, { convert: true });
                tempFileId = tempFile.id;
                Logger.log('Temp file ID: ' + tempFileId);

                // Wait a moment for conversion
                Utilities.sleep(1000);

                spreadsheet = SpreadsheetApp.openById(tempFileId);
            } else if (file.getMimeType() === "application/vnd.google-apps.spreadsheet") {
                // File sudah Google Sheets
                Logger.log('Opening Google Sheets directly...');
                spreadsheet = SpreadsheetApp.openById(fileId);
            } else {
                throw new Error('File bukan Excel atau Google Sheets. MIME: ' + file.getMimeType());
            }
        } catch (e) {
            Logger.log('Error opening spreadsheet: ' + e.toString());
            throw new Error('Gagal membuka file: ' + e.toString());
        }

        const sheet = spreadsheet.getSheets()[0]; // Ambil sheet pertama
        Logger.log('Sheet name: ' + sheet.getName());

        const values = sheet.getDataRange().getValues();
        Logger.log('Total rows: ' + values.length);

        const transactionMap = {};

        // Loop mulai dari baris 2 (Indeks 1) untuk melewati Header
        for (let i = 1; i < values.length; i++) {
            const row = values[i];
            const noBukti = String(row[3] || "").trim(); // Kolom D (Indeks 3)

            Logger.log('Row ' + i + ': NoBukti=' + noBukti + ', Uraian=' + (row[4] || ''));

            // KRITERIA UTAMA: Hanya ambil yang ada No Bukti
            // EXCLUDE: Pajak (PPH, PPN, PPH21)
            const isTax = noBukti.toUpperCase().includes('PPH') || noBukti.toUpperCase().includes('PPN') || noBukti.toUpperCase().includes('PAJAK');

            if (noBukti && noBukti !== "" && noBukti !== "NO BUKTI" && !isTax) {
                const tanggalRaw = row[0]; // Kolom A
                let tanggal = "";

                if (tanggalRaw instanceof Date) {
                    tanggal = Utilities.formatDate(tanggalRaw, "GMT+7", "dd/MM/yyyy");
                } else {
                    tanggal = String(tanggalRaw);
                }

                const uraian = String(row[4] || "").trim(); // Kolom E

                // FIX: Parsing nominal
                let pengeluaran = 0;
                if (typeof row[6] === 'number') {
                    pengeluaran = row[6];
                } else {
                    let str = String(row[6] || "0").replace(/[^0-9,.-]/g, '');
                    if (str.indexOf(',') > -1) {
                        str = str.replace(/\./g, '').replace(',', '.');
                    } else if (str.indexOf('.') > -1) {
                        str = str.replace(/\./g, '');
                    }
                    pengeluaran = parseFloat(str) || 0;
                }

                if (pengeluaran > 0) {
                    let type = "nota";
                    let vendorStyle = "standard";
                    let penerima = uraian;
                    const uLow = uraian.toLowerCase();
                    const isKonsumsi = uLow.includes('makan') || uLow.includes('gas') || uLow.includes('konsumsi');

                    if (uLow.includes('honor') || uLow.includes('aisah') || uLow.includes('nur') || uLow.includes('susanto') || uLow.includes('herman')) {
                        type = "kwitansi";
                    } else if (isKonsumsi) {
                        vendorStyle = "rm-family";
                        penerima = "RM. Family";
                    }

                    const existingTx = transactionMap[noBukti];
                    const shouldMerge = isKonsumsi && existingTx && existingTx.isKonsumsi;

                    if (shouldMerge) {
                        // Jika ya, gabungkan nominal dan perbaiki uraian jika merupakan pasangan makan/snack
                        existingTx.pengeluaran += pengeluaran;

                        const existingUraian = existingTx.uraian.toLowerCase();
                        const newUraian = uraian.toLowerCase();
                        const isMakanSnackPair = (existingUraian.includes('makan') && newUraian.includes('snack')) ||
                            (existingUraian.includes('snack') && newUraian.includes('makan'));

                        if (isMakanSnackPair) {
                            const cleanActivityName = (existingTx.uraian + " " + uraian)
                                .replace(/belanja /ig, '')
                                .replace(/konsumsi /ig, '')
                                .replace(/\(makan & snack\)/ig, '')
                                .replace(/\(makan\)/ig, '')
                                .replace(/\(snack\)/ig, '')
                                .replace(/\s+/g, ' ')
                                .trim();

                            // Ambil nama unik dari uraian (menghilangkan duplikasi kata jika ada)
                            const words = cleanActivityName.split(' ');
                            const uniqueWords = [...new Set(words)];
                            existingTx.uraian = `Konsumsi (Makan & Snack) ${uniqueWords.join(' ')}`;
                        }
                    } else {
                        // Jika tidak, buat entri baru. Gunakan key unik jika noBukti sudah ada untuk item non-konsumsi.
                        const key = existingTx ? noBukti + "_" + i : noBukti;
                        transactionMap[key] = {
                            id: noBukti + "_" + i,
                            tanggal: tanggal,
                            noBukti: noBukti,
                            uraian: uraian,
                            pengeluaran: pengeluaran,
                            penerima: penerima,
                            type: type,
                            vendorStyle: vendorStyle,
                            isKonsumsi: isKonsumsi // Flag untuk pengecekan selanjutnya
                        };
                    }
                }
            }
        }

        // Konversi Map kembali menjadi Array untuk dikirim ke Frontend
        const transactions = Object.values(transactionMap);
        transactions.forEach(tx => delete tx.isKonsumsi); // Hapus flag sebelum kirim ke frontend

        Logger.log('Total transactions extracted: ' + transactions.length);

        // Cleanup temp file jika ada
        if (tempFileId) {
            try {
                Drive.Files.remove(tempFileId);
                Logger.log('Temp file cleaned up: ' + tempFileId);
            } catch (e) {
                Logger.log('Warning: Failed to cleanup temp file: ' + e.toString());
            }
        }

        return { success: true, data: transactions };
    } catch (e) {
        Logger.log('Final error: ' + e.toString());
        return { success: false, error: "Gagal membaca Excel: " + e.toString() };
    }
}

function getLogoKBB() {
    try {
        const folders = DriveApp.getFoldersByName("TEMPLATE");
        if (!folders.hasNext()) return null;
        const folder = folders.next();
        const files = folder.getFilesByName("logo-kbb.png");
        if (!files.hasNext()) return null;
        const file = files.next();
        const bytes = file.getBlob().getBytes();
        const base64 = Utilities.base64Encode(bytes);
        const mimeType = file.getMimeType();
        return `data:${mimeType};base64,${base64}`;
    } catch (e) {
        return null;
    }
}

function saveSchoolData(data) {
    const props = PropertiesService.getScriptProperties();
    props.setProperties(data);
    return "Data berhasil disimpan!";
}

function getSchoolData() {
    return PropertiesService.getScriptProperties().getProperties();
}

function getAppUrl() {
    try {
        return ScriptApp.getService().getUrl();
    } catch (e) {
        return null; // Fallback jika belum dideploy sebagai Web App
    }
}

// ════════════════════════════════════════════════════════════
// UPLOAD EXCEL DARI FILE LOKAL - RESEARCHED METHOD
// Berdasarkan: Google Apps Script Documentation & Stack Overflow
// ════════════════════════════════════════════════════════════
function processExcelFromBase64(base64Data, fileName) {
    try {
        Logger.log('Processing local file from Base64: ' + fileName);

        // Decode Base64 to blob
        const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fileName);

        // Create temp file in Drive AND convert to Google Sheets
        const tempFile = Drive.Files.insert({
            title: fileName,
            mimeType: 'application/vnd.google-apps.spreadsheet'
        }, blob, {
            convert: true
        });

        const tempFileId = tempFile.id;
        Logger.log('Temp file created & converted: ' + tempFileId);
        Logger.log('MIME type: ' + tempFile.mimeType);

        try {
            // Wait a moment for conversion to complete
            Utilities.sleep(1500);

            // Open as Google Sheets
            const spreadsheet = SpreadsheetApp.openById(tempFileId);
            const sheet = spreadsheet.getSheets()[0];
            const values = sheet.getDataRange().getValues();

            Logger.log('Sheet name: ' + sheet.getName());
            Logger.log('Total rows: ' + values.length);

            // Parse data using shared function
            const transactions = parseExcelData(values);

            // Delete temp file
            Drive.Files.remove(tempFileId);
            Logger.log('Temp file deleted');

            return { success: true, data: transactions };
        } catch (e) {
            Logger.log('Error during processing: ' + e.toString());
            // Cleanup on error
            try {
                Drive.Files.remove(tempFileId);
                Logger.log('Temp file cleaned up after error');
            } catch (cleanupError) {
                Logger.log('Cleanup failed: ' + cleanupError.toString());
            }
            throw e;
        }
    } catch (e) {
        Logger.log('Error processing Base64 file: ' + e.toString());
        return { success: false, error: "Gagal memproses file Excel: " + e.toString() };
    }
}

// Helper function to parse Excel data (shared between Drive upload & Local upload)
function parseExcelData(values) {
    const transactionMap = {};

    // Loop mulai dari baris 2 (Index 1) untuk melewati Header
    for (let i = 1; i < values.length; i++) {
        const row = values[i];
        const noBukti = String(row[3] || "").trim(); // Kolom D (Indeks 3)

        // KRITERIA UTAMA: Hanya ambil yang ada No Bukti
        // EXCLUDE: Pajak (PPH, PPN, PPH21)
        const isTax = noBukti.toUpperCase().includes('PPH') || noBukti.toUpperCase().includes('PPN') || noBukti.toUpperCase().includes('PAJAK');

        if (noBukti && noBukti !== "" && noBukti !== "NO BUKTI" && !isTax) {
            const tanggalRaw = row[0]; // Kolom A
            let tanggal = "";

            if (tanggalRaw instanceof Date) {
                tanggal = Utilities.formatDate(tanggalRaw, "GMT+7", "dd/MM/yyyy");
            } else {
                tanggal = String(tanggalRaw);
            }

            const uraian = String(row[4] || "").trim(); // Kolom E

            // FIX: Parsing nominal
            let pengeluaran = 0;
            if (typeof row[6] === 'number') {
                pengeluaran = row[6];
            } else {
                let str = String(row[6] || "0").replace(/[^0-9,.-]/g, '');
                if (str.indexOf(',') > -1) {
                    str = str.replace(/\./g, '').replace(',', '.');
                } else if (str.indexOf('.') > -1) {
                    str = str.replace(/\./g, '');
                }
                pengeluaran = parseFloat(str) || 0;
            }

            if (pengeluaran > 0) {
                let type = "nota";
                let vendorStyle = "standard";
                let penerima = uraian;
                const uLow = uraian.toLowerCase();
                const isKonsumsi = uLow.includes('makan') || uLow.includes('gas') || uLow.includes('konsumsi');

                if (uLow.includes('honor') || uLow.includes('aisah') || uLow.includes('nur') || uLow.includes('susanto') || uLow.includes('herman')) {
                    type = "kwitansi";
                } else if (isKonsumsi) {
                    vendorStyle = "rm-family";
                    penerima = "RM. Family";
                }

                const existingTx = transactionMap[noBukti];
                const shouldMerge = isKonsumsi && existingTx && existingTx.isKonsumsi;

                if (shouldMerge) {
                    existingTx.pengeluaran += pengeluaran;
                    if (!existingTx.uraian.toLowerCase().includes('makan & snack')) {
                        const cleanActivityName = existingTx.uraian
                            .replace(/^(Belanja )?Konsumsi \((Makan & Snack|Makan|Snack)\) /i, "")
                            .replace(/^Konsumsi \((Makan & Snack|Makan|Snack)\) /i, "")
                            .replace(/\(makan & snack\)/ig, '')
                            .replace(/\(makan\)/ig, '')
                            .replace(/\(snack\)/ig, '')
                            .replace(/\s+/g, ' ')
                            .trim();

                        const words = cleanActivityName.split(' ');
                        const uniqueWords = [...new Set(words)];
                        existingTx.uraian = `Konsumsi (Makan & Snack) ${uniqueWords.join(' ')}`;
                    }
                } else {
                    const key = existingTx ? noBukti + "_" + i : noBukti;
                    transactionMap[key] = {
                        id: noBukti + "_" + i,
                        tanggal: tanggal,
                        noBukti: noBukti,
                        uraian: uraian,
                        pengeluaran: pengeluaran,
                        penerima: penerima,
                        type: type,
                        vendorStyle: vendorStyle,
                        isKonsumsi: isKonsumsi
                    };
                }
            }
        }
    }

    const transactions = Object.values(transactionMap);
    transactions.forEach(tx => delete tx.isKonsumsi);

    Logger.log('Total transactions parsed: ' + transactions.length);
    return transactions;
}
