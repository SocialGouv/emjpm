import React, { useRef } from "react";
import classNames from "classnames";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { format, parse } from "date-fns";
import { Flex } from "rebass";

import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";

import { FormGroupInput } from "~/components/AppForm";
import InputButton from "./InputButton";
import DatePickerContainer from "./DatePickerContainer";
import DatePickerHeader from "./DatePickerHeader";

registerLocale("fr", fr);
setDefaultLocale("fr");

// track last active element before opening calendar
// to restore focus to the element on close
let previousElement = null;

export default function AccessibleInputDate(props) {
  const buttonRef = useRef();

  let {
    id,
    placeholder,
    dateFormatValue,
    dateFormat,
    onChange,
    value,
    selected,
    className,
    label,
    ariaLabel,
    formik,
    ...datePickerProps
  } = props;

  const { handleChange, handleBlur, values } = formik;

  if (value === undefined) {
    value = values[id];
  }

  function onCalendarOpen() {
    previousElement = document.activeElement || document.body;

    const pooperElement = document.querySelector(".datepicker-dialog");
    pooperElement.setAttribute("role", "dialog");
    pooperElement.setAttribute("aria-modal", true);
    pooperElement.setAttribute("aria-label", ariaLabel || "Choisir une date");
    // react-datepicker__day--selected
    // react-datepicker__day--keyboard-selected
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

  if (value && value.length === 10) {
    selected = parse(value, dateFormatValue, new Date());
  }

  function onDateChange(date) {
    console.log(date);
    let value;
    if (date) {
      value = format(date, dateFormatValue);
    }
    formik.setFieldValue(id, value);
  }

  function onInputChange(e) {
    const { value } = e.target;

    if (value.length <= 10) {
      formik.setFieldValue(id, value);
    }
    if (value.length === 10) {
      const userInputParsed = parse(value, dateFormat, new Date());
      onDateChange(userInputParsed);
    }
  }

  return (
    <Flex>
      <div style={{ flex: 1 }}>
        <FormGroupInput
          {...props}
          onChange={onInputChange}
          value={
            value && value.length === 10
              ? format(parse(value, dateFormatValue, new Date()), dateFormat)
              : value
          }
          placeholder={placeholder}
        />
      </div>
      <div>
        <DatePicker
          isClearable={false}
          popperClassName="datepicker-dialog"
          onCalendarOpen={onCalendarOpen}
          onCalendarClose={onCalendarClose}
          ariaDescribedBy={props?.ariaDescribedBy}
          selected={selected}
          className={classNames("datepicker", className)}
          customInput={<InputButton ref={buttonRef} />}
          popperPlacement="bottom-start"
          calendarContainer={DatePickerContainer}
          renderCustomHeader={(headerProps) => (
            <DatePickerHeader {...headerProps} />
          )}
          chooseDayAriaLabelPrefix="Choisir le"
          disabledDayAriaLabelPrefix="Jour désactivé"
          weekAriaLabelPrefix="Semaine"
          monthAriaLabelPrefix="Mois"
          {...datePickerProps}
          onChange={onDateChange}
          dateFormatValue={dateFormatValue}
          dateFormat={dateFormat}
        />
      </div>
    </Flex>
  );
}

AccessibleInputDate.defaultProps = {
  dateFormatValue: "yyyy-MM-dd",
  dateFormat: "dd/MM/yyyy",
  showYearDropdown: true,
  isClearable: true,
};
