function doGet() {
    return HtmlService.createTemplateFromFile('login')
        .evaluate()
        .setTitle('Si-BOS | Login Portal')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getMainPageHtml() {
    return HtmlService.createTemplateFromFile('FrontEnd')
        .evaluate()
        .setTitle('Si-BOS | Sistem Administrasi SPJ')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .getContent();
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
            'mimeType = "application/vnd.google-apps.spreadsheet" and title contains "BKU"'
        ];

        queries.forEach(query => {
            const driveFiles = DriveApp.searchFiles(query);
            while (driveFiles.hasNext()) {
                const file = driveFiles.next();
                files.push({ id: file.getId(), name: file.getName(), date: Utilities.formatDate(file.getDateCreated(), "GMT+7", "dd-MM-yyyy HH:mm") });
            }
        });

        return { success: true, files: files };
    } catch (e) { return { success: false, error: e.toString() }; }
}

function processExcelByFileId(fileId) {
    try {
        const file = DriveApp.getFileById(fileId);
        let spreadsheet;

        // Jika file adalah Excel asli, konversi sementara ke Google Sheets untuk dibaca
        if (file.getMimeType() === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            const blob = file.getBlob();
            const config = { title: "temp_convert_" + fileId, parents: [{ id: "root" }] };
            const tempFile = Drive.Files.insert(config, blob, { convert: true });
            spreadsheet = SpreadsheetApp.openById(tempFile.id);
            // Hapus file sementara setelah dibuka (akan terhapus setelah script selesai run)
            Drive.Files.remove(tempFile.id);
        } else {
            spreadsheet = SpreadsheetApp.openById(fileId);
        }

        const sheet = spreadsheet.getSheets()[0]; // Ambil sheet pertama
        const values = sheet.getDataRange().getValues();
        const transactionMap = {};

        // Loop mulai dari baris 2 (Indeks 1) untuk melewati Header
        for (let i = 1; i < values.length; i++) {
            const row = values[i];
            const noBukti = String(row[3] || "").trim(); // Kolom D (Indeks 3)

            // KRITERIA UTAMA: Hanya ambil yang ada No Bukti
            // EXCLUDE: Pajak (PPH, PPN, PPH21) biasanya punya format No Bukti khusus atau terdeteksi di uraian
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

                // FIX: Parsing nominal yang lebih akurat (Support Number & String berformat)
                let pengeluaran = 0;
                if (typeof row[6] === 'number') {
                    pengeluaran = row[6];
                } else {
                    // Jika berupa string, bersihkan format (misal: "Rp 1.500.000,00")
                    let str = String(row[6] || "0").replace(/[^0-9,.-]/g, '');
                    // Handle format Indonesia: 1.000.000,00 -> 1000000.00
                    if (str.indexOf(',') > -1) {
                        str = str.replace(/\./g, '').replace(',', '.');
                    } else if (str.indexOf('.') > -1) {
                        // Asumsi titik sebagai ribuan jika tidak ada koma
                        str = str.replace(/\./g, '');
                    }
                    pengeluaran = parseFloat(str) || 0;
                }

                if (pengeluaran > 0) {
                    // Klasifikasi otomatis dan penandaan item konsumsi
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

                    // LOGIC MERGE BARU: Hanya gabungkan jika item saat ini & item yang sudah ada adalah "konsumsi"
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

        return { success: true, data: transactions };
    } catch (e) {
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
