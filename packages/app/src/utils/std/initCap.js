export default function initCap(value) {
  return value
    .toLowerCase()
    .replace(/(?:^|[^a-zØ-öø-ÿ])[a-zØ-öø-ÿ]/g, function (m) {
      return m.toUpperCase();
    });
}
