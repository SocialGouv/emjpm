import { format, addMonths } from "date-fns";

const checkDate = date => {
  if (
    format(addMonths(new Date(date), 1), "MM/DD/YYYY") < format(new Date(Date.now()), "MM/DD/YYYY")
  ) {
    return false;
  } else {
    return true;
  }
};

export default checkDate;
