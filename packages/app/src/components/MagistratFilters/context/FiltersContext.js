import React, { createContext, useState } from "react";

import { useDebounce } from "../../../lib/hooks";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { children, initialValues = {} } = props;

  // Use State to keep the values
  const [natureMesure, changeNatureMesure] = useState(
    initialValues.natureMesure
  );
  const [searchText, changeSearchText] = useState(
    initialValues.searchText || ""
  );

  const debouncedSearchText = useDebounce(searchText, 1000);

  // Make the context object:
  const filtersContext = {
    changeNatureMesure,
    changeSearchText,
    debouncedSearchText,
    natureMesure,
    searchText,
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
