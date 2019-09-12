import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [selectedRegionalValue, changeRegionalValue] = useState(false);
  const [selectedDepartementValue, changeDepartementValue] = useState(false);

  // Make the context object:
  const filtersContext = {
    selectedRegionalValue,
    changeRegionalValue,
    selectedDepartementValue,
    changeDepartementValue
  };

  console.log(filtersContext);

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
