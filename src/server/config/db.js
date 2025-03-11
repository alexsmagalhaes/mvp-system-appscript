const DB = {
  getData(sheetName) {
    const spreadsheet = SpreadsheetApp.openById(DB_CONNECTION);
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) return [];

    const rows = sheet.getDataRange().getValues();

    const headers = rows.shift();

    return rows.map((row) => {
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
  },

  writeRow(sheetName, rowIndex, data) {
    const sheet =
      SpreadsheetApp.openById(DB_CONNECTION).getSheetByName(sheetName);

    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];

    const targetRow = rowIndex + 2;

    sheet
      .getRange(targetRow, 1, 1, headers.length)
      .setValues([Object.values(data)]);
  },
};
