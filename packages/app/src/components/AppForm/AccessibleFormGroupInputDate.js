import React, { useRef } from "react";
import classNames from "classnames";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { format, parse } from "date-fns";
import { Flex, Box } from "rebass";

import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";

import { FormGroupInput } from "~/components/AppForm";
import {
  InputButton,
  DatePickerContainer,
  DatePickerHeader,
} from "../AccessibleInputDate";

registerLocale("fr", fr);
setDefaultLocale("fr");

// track last active element before opening calendar
// to restore focus to the element on close
let previousElement = null;

const userDateFormat = new RegExp(/[0-9]{1,2}(\/)[0-9]{1,2}(\/)[0-9]{4}/);

function AccessibleFormGroupInputDate(props) {
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
    readOnly,
    ...datePickerProps
  } = props;

  const { handleBlur, values } = formik;

  if (value === undefined) {
    value = values[id];
  }

  function onCalendarOpen() {
    previousElement = document.activeElement || document.body;

    const pooperElement = document.querySelector(".datepicker-dialog");
    pooperElement.setAttribute("role", "dialog");
    pooperElement.setAttribute("aria-modal", true);
    pooperElement.setAttribute("aria-label", ariaLabel || "Choisir une date");
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
    let value;
    if (date) {
      value = format(date, dateFormatValue);
    }
    formik.setFieldValue(id, value);
  }

  function onInputChange(e) {
    const { value } = e.target;
    if (value === "") {
      formik.setFieldValue(id, null);
    }
    if (value.length < 10 && value.length >= 1) {
      formik.setFieldValue(id, value);
    }
    if (value.length === 10 && userDateFormat.test(value)) {
      const userInputParsed = parse(value, dateFormat, new Date());
      onDateChange(userInputParsed);
    }
  }

  return (
    <Flex alignItems="center">
      <div style={{ flex: 1 }}>
        <FormGroupInput
          {...props}
          onChange={onInputChange}
          value={
            value && value.length === 10
              ? format(parse(value, dateFormatValue, new Date()), dateFormat)
              : value
          }
          placeholder={readOnly ? null : placeholder}
          onBlur={handleBlur}
        />
      </div>
      <Box>
        <DatePicker
          popperClassName="datepicker-dialog"
          onCalendarOpen={onCalendarOpen}
          onCalendarClose={onCalendarClose}
          ariaDescribedBy={props?.ariaDescribedBy}
          selected={selected}
          className={classNames("datepicker", className)}
          customInput={<InputButton ref={buttonRef} readOnly={readOnly} />}
          calendarContainer={DatePickerContainer}
          renderCustomHeader={(headerProps) => (
            <DatePickerHeader {...headerProps} />
          )}
          chooseDayAriaLabelPrefix="Choisir le"
          disabledDayAriaLabelPrefix="Jour désactivé"
          weekAriaLabelPrefix="Semaine"
          monthAriaLabelPrefix="Mois"
          onChange={onDateChange}
          dateFormatValue={dateFormatValue}
          dateFormat={dateFormat}
          popperPlacement="left"
          {...datePickerProps}
          readOnly={readOnly}
        />
      </Box>
    </Flex>
  );
}

AccessibleFormGroupInputDate.defaultProps = {
  dateFormatValue: "yyyy-MM-dd",
  dateFormat: "dd/MM/yyyy",
  showYearDropdown: true,
  isClearable: true,
};

export default AccessibleFormGroupInputDate;
