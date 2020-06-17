import React, { createContext, useState } from "react";

import { useDebounce } from "../../../lib/hooks";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [selectedDepartement, selectDepartement] = useState(false);
  const [selectedType, selectType] = useState(false);
  // Use State to keep the values
  const [searchNom, changeSearchNom] = useState();
  const [searchPrenom, changeSearchPrenom] = useState();
  const [searchSiret, changeSearchSiret] = useState();
  const [departementFinanceur, toogleDepartementFinanceur] = useState(false);

  const debouncedSearchNom = useDebounce(searchNom, 1000);
  const debouncedSearchPrenom = useDebounce(searchPrenom, 1000);
  const debouncedSearchSiret = useDebounce(searchSiret, 1000);

  // Make the context object:
  const filtersContext = {
    selectedDepartement,
    selectDepartement,
    selectedType,
    selectType,
    changeSearchNom,
    debouncedSearchNom,
    departementFinanceur,
    toogleDepartementFinanceur,
    searchSiret,
    changeSearchSiret,
    debouncedSearchSiret,
    searchPrenom,
    changeSearchPrenom,
    debouncedSearchPrenom
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
