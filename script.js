document.addEventListener('DOMContentLoaded', () => {
    const pdfButton = document.getElementById('pdf');
    const wordButton = document.getElementById('word');

    pdfButton.addEventListener('click', () => {
        const element = document.querySelector('.container');
        const options = {
            margin: [5, 5],
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    });

    wordButton.addEventListener('click', () => {
        const header = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
                       'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
                       'xmlns="http://www.w3.org/TR/REC-html40">' +
                       '<head><meta charset="utf-8"><title>Resume</title></head><body>';
        const footer = '</body></html>';
        const sourceHTML = header + document.querySelector('.container').innerHTML + footer;
        const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.doc';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});



