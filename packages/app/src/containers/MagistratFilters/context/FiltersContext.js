import { createContext, useState } from "react";

import { useDebounce } from "~/hooks";

export const Context = createContext({});

export function Provider(props) {
  // Initial values are obtained from the props
  const { children, initialValues = {} } = props;

  // Use State to keep the values
  const [natureMesure, changeNatureMesure] = useState(
    initialValues.natureMesure
  );
  const [etatMesure, changeEtatMesure] = useState(
    initialValues.etatMesure || null
  );
  const [searchText, changeSearchText] = useState(
    initialValues.searchText || ""
  );

  const debouncedSearchText = useDebounce(searchText, 300);

  // Make the context object:
  const filtersContext = {
    changeNatureMesure,
    changeEtatMesure,
    changeSearchText,
    debouncedSearchText,
    etatMesure,
    natureMesure,
    searchText,
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
}

export const { Consumer } = Context;
