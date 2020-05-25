const enqueteExcelParserUtil = {
  rawValue
};

module.exports = enqueteExcelParserUtil;

function rawValue(cell) {
  if (cell) {
    return cell.v;
  }
  return undefined;
}
