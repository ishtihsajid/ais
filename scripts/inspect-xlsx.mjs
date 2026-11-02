import ExcelJS from 'exceljs'

async function inspectXlsxRows() {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile('Fresh-Ceramics-Assets/data/Showroom Address .xlsx')
  for (const ws of wb.worksheets) {
    console.log(`=== Sheet: ${ws.name} (rows: ${ws.rowCount}) ===`)
    for (let r = 1; r <= ws.rowCount; r++) {
      const vals = ws.getRow(r).values
      if (Array.isArray(vals) && vals.length > 1) {
        // filter out completely empty rows
        const hasContent = vals.some(v => v !== undefined && v !== null && v !== '')
        if (hasContent) {
          console.log(`R${r}:`, JSON.stringify(vals.slice(1, 7)))
        }
      }
    }
  }
}

inspectXlsxRows()
