import * as XLSX from "xlsx";

export default buffer => {
  const workbook = XLSX.read(buffer, { dateNF: "dd/mm/yyyy", type: "binary" });
  const [worksheetName] = workbook.SheetNames;
  const worksheet = workbook.Sheets[worksheetName];

  return XLSX.utils.sheet_to_json(worksheet, { raw: false }).map(row => {
    return Object.keys(row).reduce((acc, key) => {
      acc[key] = row[key].toString().trim();

      return acc;
    }, {});
  });
};
