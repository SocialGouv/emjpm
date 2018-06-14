import { compareAsc,format, addMonths, formatDistance, formatRelative, subDays } from "date-fns";

const checkDate = ({ date }) => {
    console.log("date",date)
    console.log("date1",(new Date(date), "MM/DD/YYYY"))
    console.log("datenow",format(new Date(Date.now()), "MM/DD/YYYY"))
    console.log("result",compareAsc(Date(date), "MM/DD/YYYY"), format(new Date(Date.now()), "MM/DD/YYYY"))
// ))


  console.log("de", format(addMonths(new Date(date), 1), "MM/DD/YYYY") < format(new Date(Date.now()), "MM/DD/YYYY"));
  if (format(addMonths(new Date(date), 1), "MM/DD/YYYY") < format(new Date(Date.now()), "MM/DD/YYYY")) {
    return false;
  }
};

export default checkDate;

// new Date( new Date(Date.now()).setMonth((new Date(Date.now()).getMonth())-2)).getMonth()

// compareAsc(
//     new Date(1987, 1, 11),
//     new Date(1989, 6, 10)
// )