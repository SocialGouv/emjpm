const { format } = require("date-fns");

const stdFormatter = {
  formatDateTimeUI(date) {
    if (!date) {
      return "";
    }
    return format(new Date(date), "dd/MM/yyyy  hh:mm");
  },
  formatDateUI(date) {
    if (!date) {
      return "";
    }
    return format(new Date(date), "dd/MM/yyyy");
  },
};

module.exports = { stdFormatter };
