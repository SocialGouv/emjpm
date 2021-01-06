function formatDate(date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const year = new Date().getFullYear();
const defaultStartDate = new Date(year, 0, 1);
const defaultEndDate = new Date();

export const startDate = formatDate(defaultStartDate);
export const endDate = formatDate(defaultEndDate);
