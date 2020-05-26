const enqueteExcelParserUtil = {
  rawValue,
  number
};

module.exports = enqueteExcelParserUtil;

function number(cell) {
  if (cell) {
    const parsed = parseInt(cell.v, 10);
    return !isNaN(parsed) ? parsed : undefined;
  }
  return undefined;
}

function rawValue(cell) {
  if (cell) {
    return cell.v;
  }
  return undefined;
}
