import React, { createContext, useState } from "react";

import { useDebounce } from "../../../lib/hooks";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [searchText, changeSearchText] = useState("");
  const [selectedType, selectType] = useState();
  const [selectedDepartementCode, selectDepartementCode] = useState();

  const debouncedSearchText = useDebounce(searchText, 1000);

  // Make the context object:
  const filtersContext = {
    changeSearchText,
    debouncedSearchText,
    searchText,
    selectedType,
    selectType,
    selectedDepartementCode,
    selectDepartementCode,
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
