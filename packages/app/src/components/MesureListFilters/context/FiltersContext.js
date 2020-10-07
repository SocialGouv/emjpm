import React, { createContext, useState } from "react";

import { useDebounce } from "../../../lib/hooks";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { children, initialValues = {} } = props;

  // Use State to keep the values
  const [antenne, changeAntenne] = useState(false);
  const [natureMesure, changeNatureMesure] = useState(initialValues.natureMesure);
  const [mesureStatus, changeMesureStatus] = useState(initialValues.mesureStatus);
  const [searchText, changeSearchText] = useState("");

  const debouncedSearchText = useDebounce(searchText, 1000);

  // Make the context object:
  const filtersContext = {
    antenne,
    changeAntenne,
    changeMesureStatus,
    changeNatureMesure,
    changeSearchText,
    debouncedSearchText,
    mesureStatus,
    natureMesure,
    searchText,
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
