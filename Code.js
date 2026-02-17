function doGet() {
    return HtmlService.createTemplateFromFile('FrontEnd')
        .evaluate()
        .setTitle('Si-BOS | Sistem Administrasi SPJ')
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
            if (noBukti && noBukti !== "" && noBukti !== "NO BUKTI") {
                const tanggalRaw = row[0]; // Kolom A
                let tanggal = "";

                if (tanggalRaw instanceof Date) {
                    tanggal = Utilities.formatDate(tanggalRaw, "GMT+7", "dd/MM/yyyy");
                } else {
                    tanggal = String(tanggalRaw);
                }

                const uraian = String(row[4] || "").trim(); // Kolom E
                const pengeluaran = parseFloat(String(row[6] || 0).replace(/[^\d]/g, '')) || 0; // Kolom G

                if (pengeluaran > 0) {
                    // Klasifikasi otomatis
                    let type = "nota";
                    let vendorStyle = "standard";
                    let penerima = uraian;
                    const uLow = uraian.toLowerCase();

                    if (uLow.includes('honor') || uLow.includes('aisah') || uLow.includes('nur') || uLow.includes('susanto') || uLow.includes('herman')) {
                        type = "kwitansi";
                    } else if (uLow.includes('makan') || uLow.includes('gas') || uLow.includes('konsumsi')) {
                        vendorStyle = "rm-family";
                        penerima = "RM. Family";
                    }

                    // LOGIC MERGE: Satukan transaksi jika No Bukti sama (Khususnya Makan & Snack)
                    if (transactionMap[noBukti]) {
                        // Jika No Bukti sudah ada, tambahkan nominalnya (Merge Amount)
                        transactionMap[noBukti].pengeluaran += pengeluaran;

                        // LOGIC BARU: Menggabungkan uraian "Makan" dan "Snack" menjadi format yang benar
                        const existingUraian = transactionMap[noBukti].uraian;
                        const uLowExisting = existingUraian.toLowerCase();

                        // Cek apakah ini adalah kasus penggabungan Konsumsi Makan dan Snack
                        const isMergeCandidate = (uLowExisting.includes('makan') && uLow.includes('snack')) ||
                            (uLowExisting.includes('snack') && uLow.includes('makan'));

                        if (isMergeCandidate && uLowExisting.includes('konsumsi') && uLow.includes('konsumsi')) {
                            // Ekstrak nama kegiatan dari uraian yang sudah ada dengan menghapus kata kunci.
                            const activityName = existingUraian
                                .replace(/belanja /i, '')
                                .replace(/konsumsi (makan|snack) /i, '')
                                .trim();

                            // Bentuk uraian baru sesuai format yang diinginkan: Konsumsi (Makan & Snack) nama kegiatan
                            transactionMap[noBukti].uraian = `Konsumsi (Makan & Snack) ${activityName}`;
                        }
                    } else {
                        transactionMap[noBukti] = {
                            id: noBukti + "_" + i,
                            tanggal: tanggal,
                            noBukti: noBukti,
                            uraian: uraian,
                            pengeluaran: pengeluaran,
                            penerima: penerima,
                            type: type,
                            vendorStyle: vendorStyle
                        };
                    }
                }
            }
        }

        // Konversi Map kembali menjadi Array untuk dikirim ke Frontend
        const transactions = Object.values(transactionMap);

        return { success: true, data: transactions };
    } catch (e) {
        return { success: false, error: "Gagal membaca Excel: " + e.toString() };
    }
}

function getGoogleDocContent(fileId) {
    try {
        const file = DriveApp.getFileById(fileId);
        let docIdToRead = fileId;
        let tempFileId = null;

        // Jika file adalah Word (.docx), konversi sementara ke Google Docs agar bisa diambil HTML-nya
        if (file.getMimeType() === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const blob = file.getBlob();
            const config = { title: "temp_convert_doc_" + fileId, parents: [{ id: "root" }] };
            const tempFile = Drive.Files.insert(config, blob, { convert: true });
            docIdToRead = tempFile.id;
            tempFileId = tempFile.id;
        }

        const htmlContent = DriveApp.getFileById(docIdToRead).getAs(MimeType.HTML).getDataAsString();

        if (tempFileId) {
            Drive.Files.remove(tempFileId);
        }

        return { success: true, html: htmlContent };
    } catch (e) {
        return { success: false, error: e.toString() };
    }
}

function getTemplatesFromFolder() {
    try {
        const folders = DriveApp.getFoldersByName("TEMPLATE");
        if (!folders.hasNext()) {
            return { success: false, error: "Folder 'TEMPLATE' tidak ditemukan." };
        }
        const folder = folders.next();
        const files = folder.getFiles();
        const templates = [];
        while (files.hasNext()) {
            const file = files.next();
            const mime = file.getMimeType();
            if (mime === MimeType.GOOGLE_DOCS || mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                templates.push({ name: file.getName(), id: file.getId() });
            }
        }
        return { success: true, templates: templates };
    } catch (e) {
        return { success: false, error: e.toString() };
    }
}
