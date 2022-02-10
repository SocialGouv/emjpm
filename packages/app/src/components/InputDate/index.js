import React, { useRef } from "react";
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
  const inputRef = useRef(null);
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
  const labelFor = props?.id || props?.label;

  return (
    <>
      {label && (
        <Label
          aria-describedby={props.id}
          htmlFor={labelFor}
          isActive={props.isActive}
          aria-required={props.required}
          required={props.required}
          readOnly={props.readOnly}
          onClick={() => {
            inputRef?.current?.handleFocus?.();
          }}
        >
          {label}
          {props.required && !props.readOnly && <RequiredAsterisk />}
        </Label>
      )}
      <DatePicker
        ref={inputRef}
        onChange={onChange}
        selected={selected}
        className={classNames("datepicker", className)}
        {...datePickerProps}
        id={labelFor}
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
