import classNames from "classnames";

import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";
import "./style.scss";

import { RequiredAsterisk } from "~/components";

import Label from "./Label";
import isInt from "~/utils/std/isInt";

export default function InputYear(props) {
  let {
    value,
    label,
    title,
    selected,
    className,
    onChange: onChangeProp,
    ...datePickerProps
  } = props;

  if (!isInt(value)) {
    value = "";
  }
  if (value) {
    selected = parse(value.toString(), "yyyy", new Date());
  }

  if (!label && props.placeholderText) {
    label = props.placeholderText;
  }

  return (
    <>
      {label && (
        <Label
          htmlFor={props.id}
          isActive={props.isActive}
          required={props.required}
          aria-required={props.required}
          readOnly={props.readOnly}
          title={title}
        >
          {label}
          {props.required && !props.readOnly && <RequiredAsterisk />}
        </Label>
      )}
      <DatePicker
        showYearPicker
        onChange={(date) => {
          if (date) {
            date = format(date, "yyyy");
          }
          return onChangeProp(date);
        }}
        selected={selected}
        className={classNames("yearpicker", className)}
        {...datePickerProps}
        ariaDescribedBy={props?.ariaDescribedBy}
      />
    </>
  );
}

InputYear.defaultProps = {
  dateFormat: "yyyy",
};
