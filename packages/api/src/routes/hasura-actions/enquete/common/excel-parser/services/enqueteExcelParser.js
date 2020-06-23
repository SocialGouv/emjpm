const enqueteExcelParser = {
  raw,
  integer,
  float,
  select,
  boolean,
  string,
  integerAsBoolean,
};

module.exports = enqueteExcelParser;

function raw(cell) {
  if (cell) {
    return cell.v;
  }
  return undefined;
}

// options?: { min: number, max: number }
function integer(cell, options) {
  const value = raw(cell);
  if (isDefined(value)) {
    const parsed = parseInt(value, 10);
    const result = !isNaN(parsed) ? parsed : undefined;

    return _validateMinMax(result, options);
  }
  return undefined;
}

// options?: { min: number, max: number }
function float(cell, options) {
  const value = raw(cell);
  if (isDefined(value)) {
    const parsed = parseFloat(
      value.replace ? value.replace(/ /g, "").replace(",", ".") : value
    );
    const result = !isNaN(parsed) ? parsed : undefined;
    return _validateMinMax(result, options);
  }
  return undefined;
}

function select(cell, { map }) {
  if (!map) {
    throw new Error("Required 'map' parameter missing");
  }
  const value = raw(cell);
  if (isDefined(value)) {
    return map[value.trim ? value.trim() : value];
  }
  return undefined;
}

function boolean(cell) {
  const value = raw(cell);
  if (isDefined(value)) {
    return value === "Oui";
  }
  return undefined;
}

function integerAsBoolean(cell) {
  const value = raw(cell);
  if (isDefined(value)) {
    return value === 1;
  }
  return false;
}

function string(cell) {
  const value = raw(cell);
  if (isDefined(value)) {
    return `${value}`;
  }
  return undefined;
}

function _validateMinMax(value, options) {
  if (value === undefined) {
    return value;
  }
  const { min, max } = options ? options : { min: undefined, max: undefined };
  if (min !== undefined && value <= min) {
    return undefined;
  }
  if (max !== undefined && value >= max) {
    return undefined;
  }
  return value;
}

function isDefined(value) {
  return value !== undefined && value !== null;
}
