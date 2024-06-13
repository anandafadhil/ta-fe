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
    // worksheet.row
    // worksheet.columns.width = 20;
    // worksheet.columns.width = 20;
    const columns = ["A", "B", "C"];
    columns.forEach((column) => {
      if (column == "A") {
        worksheet.getColumn("A").width = 15;
      } else {
        worksheet.getColumn(column).width = 25;
  
      }
    });

        const headerCell = worksheet.getCell('A1');
        headerCell.value = 'PDDIKTI Bulk Prediction';
        headerCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'C0504D' },
        };
        headerCell.font = {
            name: 'Times New Roman',
            color: { argb: 'FFFFFFFF' },
            size: 16,
            bold: true,
        };
        headerCell.alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.mergeCells('A1:C1');
    
        worksheet.addRow([]);

    const titleCell = worksheet.getCell('A3');
    titleCell.value = tableTitle;
    titleCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4F81BD' },
    };
    titleCell.font = {
        name: 'Times New Roman',
        color: { argb: 'FFFFFFFF' },
        size: 16,
        bold: true,
    };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('A3:C3');

    worksheet.addRow([]);

    const headers = title;
    headers.forEach((header, index) => {
        const cell = worksheet.getCell(`${String.fromCharCode(65 + index)}5`);
        cell.value = header;
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '95B3D7' },
        };
        cell.font = {
            name: 'Times New Roman',
            color: { argb: '00000000' },
            size: 14,
            bold: true,
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    let number = 1;
    data.forEach(item => {
        const rowData = params.map(param => {
            return item[param];
        });
        const row = worksheet.addRow([number, ...rowData]);
        row.height = 50;
        row.font = { name: 'Times New Roman', size: 14 };

        row.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' }; // Number centered
        row.getCell(2).alignment = { vertical: 'middle', horizontal: 'left' };   // Identifier left align
        row.getCell(3).alignment = { vertical: 'middle', horizontal: 'center' }; // Result centered

        if (rowData[1] === 'Tepat Waktu') {
            row.getCell(3).font = { color: { argb: 'FF008000' }, name: 'Times New Roman', size: 14 }; // Green text
        } else {
            row.getCell(3).font = { color: { argb: 'FFFF0000' }, name: 'Times New Roman', size: 14 }; // Red text
        }

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