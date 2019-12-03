import * as XLSX from "xlsx";

export default buffer => {
  const workbook = XLSX.read(buffer, { type: "binary" });
  const [worksheetName] = workbook.SheetNames;
  const worksheet = workbook.Sheets[worksheetName];

  return XLSX.utils.sheet_to_json(worksheet, { dateNF: "dd/mm/yyyy", raw: true }).map(row => {
    return Object.keys(row).reduce((acc, key) => {
      acc[key] = row[key].toString().trim();

      return acc;
    }, {});
  });
};
