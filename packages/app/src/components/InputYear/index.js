import classNames from "classnames";

import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";
import "./style.scss";

export default function InputYear(props) {
  let {
    value,
    selected,
    className,
    onChange: onChangeProp,
    ...datePickerProps
  } = props;
  if (value) {
    selected = parse(value.toString(), "yyyy", new Date());
  }
  return (
    <DatePicker
      showYearPicker
      onChange={(date) => {
        return onChangeProp(format(date, "yyyy"));
      }}
      selected={selected}
      className={classNames("yearpicker", className)}
      {...datePickerProps}
    />
  );
}

InputYear.defaultProps = {
  dateFormat: "yyyy",
};
