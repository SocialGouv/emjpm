import React, { useState, useRef } from "react";
import classNames from "classnames";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { Flex } from "rebass";

import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";

import InputButton from "./InputButton";
import DatePickerContainer from "./DatePickerContainer";
import DatePickerHeader from "./DatePickerHeader";

registerLocale("fr", fr);
setDefaultLocale("fr");

// track last active element before opening calendar
// to restore focus to the element on close
let previousElement = null;

export default function AccessibleInputDate(props) {
  const [startDate, setStartDate] = useState(new Date());
  const buttonRef = useRef();

  let {
    placeholder,
    dateFormatValue,
    onChange,
    value,
    selected,
    className,
    label,
    ariaLabel,
    ...datePickerProps
  } = props;

  function onCalendarOpen() {
    previousElement = document.activeElement || document.body;

    const pooperElement = document.querySelector(".datepicker-dialog");
    pooperElement.setAttribute("role", "dialog");
    pooperElement.setAttribute("aria-modal", true);
    pooperElement.setAttribute("aria-label", ariaLabel || "Choisir une date");
    document.querySelector(".react-datepicker__day--selected").focus();
  }
  function onCalendarClose() {
    previousElement?.focus();
  }

  return (
    <Flex>
      <input value={startDate} />
      <DatePicker
        popperClassName="datepicker-dialog"
        onCalendarOpen={onCalendarOpen}
        onCalendarClose={onCalendarClose}
        ariaDescribedBy={props?.ariaDescribedBy}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className={classNames("datepicker", className)}
        customInput={<InputButton ref={buttonRef} />}
        popperPlacement="bottom-start"
        calendarContainer={DatePickerContainer}
        renderCustomHeader={(headerProps) => (
          <DatePickerHeader {...headerProps} />
        )}
      />
    </Flex>
  );
}
