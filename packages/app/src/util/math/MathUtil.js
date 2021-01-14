export function convertToPercentage(value, total) {
  if (!total || total === 0) {
    return;
  }
  return round((value / total) * 100);
}

function round(value) {
  return Math.round(value * 100) / 100;
}
