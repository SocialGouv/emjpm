export function formatDateType(d = new Date()) {
  return (
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    d.getDate().toString().padStart(2, "0")
  );
}

export function formatTimestampzType(d = new Date()) {
  return d.toISOString();
}

export function getDaysInterval(d = new Date(), interval) {
  const currentMonthEnd = formatDateType(d);
  d.setDate(d.getDate() - interval);
  const currentMonthStart = formatDateType(d);
  return [currentMonthStart, currentMonthEnd];
}

export function getDaysIntervalTimestampz(d = new Date(), interval) {
  const currentMonthEnd = formatTimestampzType(d);
  d.setDate(d.getDate() - interval);
  const currentMonthStart = formatTimestampzType(d);
  return [currentMonthStart, currentMonthEnd];
}

export function get30DaysInterval(d = new Date()) {
  return getDaysInterval(d, 30);
}

export function get30DaysIntervalTimestampz(d = new Date()) {
  return getDaysIntervalTimestampz(d, 30);
}

const year = new Date().getFullYear();
const defaultStartDate = new Date(year, 0, 1);
const defaultEndDate = new Date();

export const startDate = formatDateType(defaultStartDate);
export const endDate = formatDateType(defaultEndDate);
