import { format, addMonths } from "date-fns";

const isOlderThanOneMonth = date => {
  return (
    format(addMonths(new Date(date), 1), "MM/DD/YYYY") < format(new Date(Date.now()), "MM/DD/YYYY")
  );
};

export default isOlderThanOneMonth;
