import classNames from "classnames";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

import { RequiredAsterisk } from "~/components";

import "./style.scss";
import Label from "./Label";

registerLocale("fr", fr);
setDefaultLocale("fr");

export default function InputDate(props) {
  let {
    dateFormatValue,
    onChange,
    value,
    selected,
    className,
    label,
    ...datePickerProps
  } = props;

  if (value) {
    selected = parse(value, dateFormatValue, new Date());
  }

  const onChangeProp = onChange;
  onChange = (date) => {
    let value;
    if (date) {
      value = format(date, dateFormatValue);
    }
    return onChangeProp(value);
  };

  if (!label && props.placeholderText) {
    label = props.placeholderText;
  }

  return (
    <>
      {label && (
        <Label
          aria-describedby={props.id}
          htmlFor={props.id}
          isActive={props.isActive}
          aria-required={props.required}
          required={props.required}
          readOnly={props.readOnly}
        >
          {label}
          {props.required && !props.readOnly && <RequiredAsterisk />}
        </Label>
      )}
      <DatePicker
        onChange={onChange}
        selected={selected}
        className={classNames("datepicker", className)}
        {...datePickerProps}
      />
    </>
  );
}

InputDate.defaultProps = {
  dateFormatValue: "yyyy-MM-dd",
  dateFormat: "dd/MM/yyyy",
  showYearDropdown: true,
  isClearable: true,
};
