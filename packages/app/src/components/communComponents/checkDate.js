import { addMonths, isBefore } from "date-fns";

// is given date more than 1 month before now
const isOlderThanOneMonth = date => isBefore(addMonths(new Date(date), 1), new Date());

export default isOlderThanOneMonth;
