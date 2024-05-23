"use client"
import ExcelJS from 'exceljs';

const generateExcel = async (
    data,
    title,
    params,
    tableTitle,
    fileName
) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.getCell('A1').value = 'PDDIKTI Bulk Prediction';
    worksheet.mergeCells('A1:F1');

    worksheet.addRow([]);

    worksheet.getCell('A3').value = tableTitle;
    worksheet.mergeCells('A3:F3');

    worksheet.addRow([]);

    const headers = title;

    worksheet.addRow(headers);
    let number = 1;
    data.forEach(item => {
        const rowData = params.map(param => {
            return item[param];
        });
        console.log("row", rowData)
        worksheet.addRow([number, ...rowData]);
        number += 1;
    });

    const rowCount = worksheet.rowCount;
    const columnCount = headers.length;

    for (let i = 5; i <= rowCount; i++) {
        for (let j = 1; j <= columnCount; j++) {
            const cell = worksheet.getCell(`${String.fromCharCode(64 + j)}${i}`);
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    saveAsExcelFile(buffer, fileName);
};

const saveAsExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};

export default generateExcel;