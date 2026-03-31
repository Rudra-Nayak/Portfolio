const fs = require('fs');
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync("cv_content.txt", pdfParser.getRawTextContent());
    console.log("Success");
});

pdfParser.loadPDF("public/Rudra Narayan Nayak 12306470.pdf");
