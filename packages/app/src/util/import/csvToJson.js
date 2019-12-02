import * as XLSX from "xlsx";

export default csv => {
  const workbook = XLSX.read(csv, { raw: true, sep: ";", type: "string" });
  const [worksheetName] = workbook.SheetNames;
  const worksheet = workbook.Sheets[worksheetName];

  return XLSX.utils.sheet_to_json(worksheet, { dateNF: "dd/mm/yyyy" }).map(row => {
    return Object.keys(row).reduce((acc, key) => {
      acc[key] = row[key].toString().trim();

      return acc;
    }, {});
  });
};
