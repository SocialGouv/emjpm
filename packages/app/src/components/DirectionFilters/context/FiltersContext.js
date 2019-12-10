import React, { createContext, useState } from "react";

import { endDate, startDate } from "../../../util/dates";
export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [selectedRegionalValue, changeRegionalValue] = useState(false);
  const [selectedDepartementValue, changeDepartementValue] = useState(false);
  const [startDateValue, changeStartDate] = useState(startDate);
  const [endDateValue, changeEndDate] = useState(endDate);

  // Make the context object:
  const filtersContext = {
    changeDepartementValue,
    changeEndDate,
    changeRegionalValue,
    changeStartDate,
    endDateValue,
    selectedDepartementValue,
    selectedRegionalValue,
    startDateValue
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
