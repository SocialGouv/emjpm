function normalizeNumeroRG(str) {
  return (str || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .substr(0, 8)
    .padEnd(8, "0");
}

function validateNumeroRG(str) {
  return normalizeNumeroRG(str) === str;
}

module.exports = {
  normalizeNumeroRG,
  validateNumeroRG,
};
