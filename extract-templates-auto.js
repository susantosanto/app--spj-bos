const fs = require('fs');
const path = require('path');

// Read FrontEnd.html
const frontendPath = path.join(__dirname, 'FrontEnd.html');
const frontendContent = fs.readFileSync(frontendPath, 'utf-8');

// Extract template functions (between updatePreview and end of script)
// Looking for the main updatePreview function and all getHtml_* functions

const lines = frontendContent.split('\n');
let startIndex = -1;
let endIndex = -1;

// Find start of updatePreview function
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('function updatePreview()')) {
        startIndex = i;
        break;
    }
}

// Find end of script tag after updatePreview
let scriptDepth = 0;
for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].includes('</script>')) {
        endIndex = i;
        break;
    }
}

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find template functions in FrontEnd.html');
    console.error('Start:', startIndex, 'End:', endIndex);
    process.exit(1);
}

// Extract the template functions
const templateFunctions = lines.slice(startIndex, endIndex).join('\n');

// Create js_templates.html content
const jsTemplatesContent = `<!-- js_templates.html - EXTRACTED FROM FrontEnd.html -->
<!-- This file contains ALL template functions exactly as in FrontEnd.html -->
<!-- Extracted on: ${new Date().toISOString()} -->
<script>
${templateFunctions}

// Export all functions globally
if (typeof updatePreview !== 'undefined') window.updatePreview = updatePreview;
if (typeof getHtml_kwitansi !== 'undefined') window.getHtml_kwitansi = getHtml_kwitansi;
if (typeof getHtml_nota !== 'undefined') window.getHtml_nota = getHtml_nota;
if (typeof getHtml_pesanan !== 'undefined') window.getHtml_pesanan = getHtml_pesanan;
if (typeof getHtml_beritaAcara !== 'undefined') window.getHtml_beritaAcara = getHtml_beritaAcara;
if (typeof getHtml_undangan !== 'undefined') window.getHtml_undangan = getHtml_undangan;
if (typeof getHtml_notulen !== 'undefined') window.getHtml_notulen = getHtml_notulen;
if (typeof getHtml_daftarHadir !== 'undefined') window.getHtml_daftarHadir = getHtml_daftarHadir;
if (typeof getHtml_dokumentasi !== 'undefined') window.getHtml_dokumentasi = getHtml_dokumentasi;
if (typeof getHtml_rencana !== 'undefined') window.getHtml_rencana = getHtml_rencana;
if (typeof getHtml_spk !== 'undefined') window.getHtml_spk = getHtml_spk;
if (typeof getHtml_spkGuru !== 'undefined') window.getHtml_spkGuru = getHtml_spkGuru;
if (typeof getHtml_spkTenaga !== 'undefined') window.getHtml_spkTenaga = getHtml_spkTenaga;
if (typeof getHtml_skTugas !== 'undefined') window.getHtml_skTugas = getHtml_skTugas;
if (typeof getHtml_daftarHonor !== 'undefined') window.getHtml_daftarHonor = getHtml_daftarHonor;
</script>
`;

// Write to js_templates.html
const outputPath = path.join(__dirname, 'js_templates.html');
fs.writeFileSync(outputPath, jsTemplatesContent, 'utf-8');

console.log('✅ Successfully extracted template functions!');
console.log(`📄 Source: FrontEnd.html (lines ${startIndex}-${endIndex})`);
console.log(`📄 Output: js_templates.html`);
console.log(`📊 Extracted ${endIndex - startIndex} lines`);
