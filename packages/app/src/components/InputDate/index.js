import React, { useRef } from "react";
import classNames from "classnames";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

import { RequiredAsterisk } from "~/components";
import {
  DatePickerHeader,
  DatePickerContainer,
} from "~/components/AccessibleInputDate";

import "./style.scss";
import Label from "./Label";

registerLocale("fr", fr);
setDefaultLocale("fr");

let previousElement = null;

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

  function onCalendarOpen() {
    previousElement = document.activeElement || document.body;

    const pooperElement = document.querySelector(".react-datepicker-popper");

    pooperElement.setAttribute("role", "dialog");
    pooperElement.setAttribute("aria-modal", true);
    pooperElement.setAttribute(
      "aria-label",
      props.ariaLabel || "Choisir une date"
    );
    document.querySelector(".react-datepicker__day--selected")?.focus();
    document
      .querySelector(".react-datepicker__day--keyboard-selected")
      ?.focus();

    const monthsBlock = document.querySelector(".react-datepicker__month");

    monthsBlock.setAttribute("role", "application");
    monthsBlock.setAttribute("aria-label", "Dates du calendrier");
  }

  function onCalendarClose() {
    previousElement?.focus();
  }

  return (
    <>
      {label && (
        <Label
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
        ariaDescribedBy={props?.ariaDescribedBy}
        ref={inputRef}
        onChange={onChange}
        selected={selected}
        className={classNames("datepicker", className)}
        {...datePickerProps}
        id={labelFor}
        onCalendarOpen={onCalendarOpen}
        renderCustomHeader={(headerProps) => (
          <DatePickerHeader {...headerProps} />
        )}
        calendarContainer={DatePickerContainer}
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
