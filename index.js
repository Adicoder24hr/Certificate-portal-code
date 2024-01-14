const generatePDF = async (Fname,Lname) => {
    const { PDFDocument, rgb, StandardFonts } = PDFLib;

    const exBytes = await fetch("./cert.pdf").then((res) => {
        return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(exBytes);

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const pages = pdfDoc.getPages();
    const firstpg = pages[0];
    const { width, height } = firstpg.getSize();
    const fontSize = 30;

    firstpg.drawText(Fname, {
        x: 300,
    y: height - 9 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
    });

    firstpg.drawText(Lname, {
        x: 400,
    y: height - 9 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
    });

    const uri = await pdfDoc.saveAsBase64({ dataUri: true });
    saveAs(uri, "GDSC Certificate.pdf", { autoBom: true});
    // document.querySelector("#mypdf").src = uri;
};

const submitBtn = document.querySelector(".frame-4");
const inputVal1 = document.querySelector("#FirstName");
const inputVal2 = document.querySelector("#LastName");
submitBtn.addEventListener('click',()=>{
    const val1 = inputVal1.value;
    const val2 = inputVal2.value;
    generatePDF(val1,val2);
})


