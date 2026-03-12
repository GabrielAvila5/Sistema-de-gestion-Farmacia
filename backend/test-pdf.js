const pdfmake = require('pdfmake');
console.log('pdfmake type:', typeof pdfmake);
console.log('pdfmake keys:', Object.keys(pdfmake));

try {
    const printer = require('pdfmake/src/printer');
    console.log('src/printer type:', typeof printer);
} catch (e) {
    console.log('src/printer error:', e.message);
}

try {
    const printer2 = require('pdfmake/js/printer');
    console.log('js/printer type:', typeof printer2);
} catch (e) {
    console.log('js/printer error:', e.message);
}
