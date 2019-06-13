import * as XLSX from "xlsx";
import memoize from "memoizee";
import Fuse from "fuse.js";
import { format } from "date-fns";

import references from "./references";

// read the first sheet and clean data
export const read = workbook => {
  const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });
  const sheetData = clean(data);
  return sheetData;
};

const cleanCivilite = civilite => {
  switch (civilite) {
    case "Femme":
      return "F";
    case "Homme":
      return "H";
    default:
      return civilite;
  }
};

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.9,
  tokenize: true,
  keys: ["value"]
};

// 20/12/2005, 5/6/15, 20-12-2005, 5-6-15
const DATE_FR_LONG = /^\s*(\d\d*)[-/](\d\d*)[-/]((?:\d\d)?\d\d)\s*$/;

const toJsMonth = month => (parseInt(month) === 0 ? 12 : parseInt(month) - 1);
const toJsYear = year => (parseInt(year) < 30 ? 2000 + parseInt(year) : parseInt(year));

// try to convert input date
export const readExcelDate = date => {
  if (!date) {
    return;
  }
  if (!isNaN(date)) {
    // excel leap year bug https://gist.github.com/christopherscott/2782634
    return new Date((date - (25567 + 2)) * 86400 * 1000);
  } else {
    let matches = date.match(DATE_FR_LONG);
    if (matches) {
      const [_all, day, month, year, ..._parts] = matches;
      return new Date(toJsYear(year), toJsMonth(month), day);
    }
    return date;
  }
};

// ensure some values are defined
const hasValues = obj => Object.values(obj).length > 0;

// memoize basic fuser for some data
const memoFuse = memoize(data => new Fuse(data, FUSE_OPTIONS));

// fuse some input with some data
const findBestMatch = (data, input) => {
  const fuse = memoFuse(data);
  const result = fuse.search(input);
  if (result.length) {
    return trim(result[0].value);
  }
};

// convert flat array to object for fuse.js
const getColumnFuseValues = columnName => {
  const columnsValues = references[columnName];
  if (columnsValues) {
    return columnsValues.map(value => ({ value }));
  }
};

// normalize columns names
export const cleanColNames = cols =>
  cols.map(
    c =>
      c &&
      c.toLowerCase &&
      c
        .toLowerCase()
        .replace(/_+/gi, " ")
        .replace(/\s\s+/gi, " ")
        .replace(/[-_]/gi, " ")
        .replace(/[éèê]/gi, "e")
        .replace(/d?['"]/gi, "")
        .trim()
        .replace(/[\s-]/gi, "_")
  );

const trim = str => (isNaN(str) && ("" + str).trim()) || str;

const cleanAnnee = str => {
  if (!isNaN(str)) {
    // if like an excel formatted date
    if (parseInt(str) > 10000) {
      return readExcelDate(str).getFullYear();
    }
  }

  return str || null;
};

// convert XLSX.utils.sheet_to_json data
// only include relevant columns and normalize the input
export const clean = inputData => {
  const cols = cleanColNames(inputData[0]);
  const isValidColumn = col => references.mandatoryColumns.includes(col);
  const getColumnIfValid = (columnIndex, value) => {
    const columnName = cols[columnIndex];
    if (isValidColumn(columnName)) {
      const matchValue = getMatchValue(columnName, value);
      return { [columnName]: matchValue };
    }
    return {};
  };
  // fuse the input
  const getMatchValue = (columnName, value) => {
    // Note: `return value` here to disable fusing
    const columnValues = getColumnFuseValues(columnName);
    if (columnValues) {
      return findBestMatch(columnValues, value) || trim(value);
    }
    return trim(value);
  };

  // convert Array of arrays into Array of Objects and filters only needed importable keys
  return (
    inputData
      // keep first row (columns) intact
      .filter((row, i) => i > 0)
      // convert rows to normalized object
      .map(row =>
        row.reduce(
          // only adds the value if its a valid column
          (values, current, index) => ({ ...values, ...getColumnIfValid(index, current) }),
          {}
        )
      )
      .filter(hasValues)
      // some post processing
      .map(row => ({
        ...row,
        annee: cleanAnnee(row.annee),
        date_ouverture: format(readExcelDate(row.date_ouverture), "YYYY-MM-DD"),
        civilite: cleanCivilite(row.civilite)
      }))
  );
};
