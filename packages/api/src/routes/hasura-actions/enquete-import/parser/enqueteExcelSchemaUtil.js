const yup = require("yup");

function excelSelect(map) {
  return yup.mixed().transform(x => map[x]);
}

function excelBoolean() {
  return yup.boolean().transform(x => !!(x & (x === "Oui")));
}

function excelInteger() {
  return yup
    .number()
    .transform(x => (x && !isNaN(parseInt(x)) ? parseInt(x) : undefined));
}

function excelFloat() {
  return yup
    .number()
    .transform(x => (x && !isNaN(parseFloat(x)) ? parseFloat(x) : undefined));
}

const enqueteExcelSchemaUtil = {
  excelSelect,
  excelBoolean,
  excelInteger,
  excelFloat
};

module.exports = enqueteExcelSchemaUtil;
