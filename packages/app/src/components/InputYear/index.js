import classNames from "classnames";

import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";
import "./style.scss";

import Label from "./Label";

export default function InputYear(props) {
  let {
    value,
    label,
    selected,
    className,
    onChange: onChangeProp,
    ...datePickerProps
  } = props;
  if (value) {
    selected = parse(value.toString(), "yyyy", new Date());
  }
  return (
    <>
      {label && (
        <Label
          aria-label={props.name}
          htmlFor={props.id}
          isActive={props.isActive}
          required={props.required}
          readOnly={props.readOnly}
        >
          {label}
        </Label>
      )}
      <DatePicker
        showYearPicker
        onChange={(date) => {
          return onChangeProp(format(date, "yyyy"));
        }}
        selected={selected}
        className={classNames("yearpicker", className)}
        {...datePickerProps}
      />
    </>
  );
}

InputYear.defaultProps = {
  dateFormat: "yyyy",
};
