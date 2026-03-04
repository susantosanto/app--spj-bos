const fs = require('fs');
const path = require('path');

const targetDir = 'd:\\Programming\\app-script\\app-spj-bos';
const inputFile = path.join(targetDir, 'FrontEnd.html');
const lines = fs.readFileSync(inputFile, 'utf-8').split('\n');

const extractRows = (ranges, outFile) => {
    let content = [];
    if (typeof ranges[0] === 'number') ranges = [ranges]; // Make it array of ranges
    for (let range of ranges) {
        const start = range[0] - 1; // 1-based to 0-based
        const end = range[1]; // exclusive in slice
        // Special case: if it requires a script or style tag wrapper based on file name prefix, wait we'll just wrap style in <style> and js in <script>
        // Let's look at FrontEnd.html, the tags might be included or not.
        content.push(lines.slice(start, end).join('\n'));
    }

    let finalContent = content.join('\n');
    let r = `<script>\n${finalContent}\n</script>`;
    if (outFile.startsWith('css_')) {
        r = `<style>\n${finalContent}\n</style>`;
        // Note: FrontEnd.html might already have <style> tag at line 17 and </style> at 1962.
        // The numbers given in the plan seem to be INSIDE the <style> and <script> tags.
        // Let's verify line 18 in FrontEnd.html
    } else if (outFile.startsWith('js_')) {
        r = `<script>\n${finalContent}\n</script>`;
    } else {
        r = finalContent; // html views
    }

    fs.writeFileSync(path.join(targetDir, outFile), r);
    console.log(`Created ${outFile}`);
};

const MAPPING = {
    'css_global.html': [18, 55],
    'css_sidebar.html': [56, 156],
    'css_dashboard.html': [416, 838],
    'css_layout.html': [839, 953],
    'css_components.html': [954, 1247],
    'css_modal.html': [[1248, 1477], [1813, 1961]],
    'css_print.html': [1478, 1812],
    'css_toast.html': [151, 415],

    'view_sidebar.html': [1966, 2004],
    'view_topbar.html': [2009, 2023],
    'view_dashboard.html': [2025, 2121],
    'view_upload.html': [2123, 2155],
    'view_manage.html': [2157, 2197],
    'view_settings.html': [2263, 2348],
    'view_designer.html': [2199, 2261],

    'modal_toast.html': [3099, 3100],
    'modal_confirm.html': [3102, 3117],
    'modal_addtx.html': [3022, 3072],
    'modal_drive.html': [3074, 3096],

    'js_utils.html': [3409, 3460],
    'js_state.html': [3391, 3407],
    'js_core.html': [3119, 3196],
    'js_school_data.html': [3198, 3243],
    'js_custom_tpl.html': [3244, 3390],
    'js_form_rows.html': [3706, 3878],
    'js_doc_picker.html': [3546, 3704],
    'js_drive.html': [6040, 6143],
    'js_transactions.html': [5850, 6039]
};

for (const [file, ranges] of Object.entries(MAPPING)) {
    extractRows(ranges, file);
}

// FrontEnd_v2.html skeleton
const skeleton = `<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Si-BOS | Sistem Administrasi</title>

    <!-- Google Fonts: Outfit (UI) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Handwriting Fonts (untuk nota) -->
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@300;400;700&family=Nothing+You+Could+Do&family=Reenie+Beanie&family=Shadows+Into+Light&family=Patrick+Hand&family=Indie+Flower&family=Cedarville+Cursive&family=Zeyada&family=La+Belle+Aurore&family=Homemade+Apple&family=Just+Me+Again+Down+Here&display=swap" rel="stylesheet">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- ═══ CSS MODULES ════════════════════════════════ -->
    <?!= include('css_global') ?>
    <?!= include('css_sidebar') ?>
    <?!= include('css_dashboard') ?>
    <?!= include('css_layout') ?>
    <?!= include('css_components') ?>
    <?!= include('css_modal') ?>
    <?!= include('css_print') ?>
    <?!= include('css_toast') ?>
</head>

<body>

    <!-- ═══ SIDEBAR ════════════════════════════════════ -->
    <?!= include('view_sidebar') ?>

    <!-- ═══ MAIN CONTENT ══════════════════════════════ -->
    <div class="main-content">

        <!-- Top Bar -->
        <?!= include('view_topbar') ?>

        <!-- View Sections -->
        <?!= include('view_dashboard') ?>
        <?!= include('view_upload') ?>
        <?!= include('view_manage') ?>
        <?!= include('view_designer') ?>
        <?!= include('view_settings') ?>

        <!-- Modals -->
        <?!= include('modal_preview') ?>
        <?!= include('modal_addtx') ?>
        <?!= include('modal_drive') ?>
        <?!= include('modal_toast') ?>
        <?!= include('modal_confirm') ?>

    </div>

    <!-- ═══ JAVASCRIPT MODULES ════════════════════════ -->
    <!-- Urutan PENTING: utils → state → core → fitur → templates → preview -->
    <?!= include('js_utils') ?>
    <?!= include('js_state') ?>
    <?!= include('js_core') ?>
    <?!= include('js_school_data') ?>
    <?!= include('js_transactions') ?>
    <?!= include('js_drive') ?>
    <?!= include('js_form_rows') ?>
    <?!= include('js_doc_picker') ?>
    <?!= include('js_templates') ?>
    <?!= include('js_preview') ?>
    <?!= include('js_custom_tpl') ?>

</body>
</html>`;
fs.writeFileSync(path.join(targetDir, 'FrontEnd_v2.html'), skeleton);
console.log('Created FrontEnd_v2.html');
