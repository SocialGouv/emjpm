import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-apollo";

import { GET_DEPARTEMENTS } from "../queries";

export const Context = createContext({});

export const Provider = (props) => {
  const { children, useLocalStorage } = props;
  const [filters, setFilters] = useState({
    departements: [],
    type: "individuel",
  });

  useEffect(() => {
    if (useLocalStorage) {
      const storedItem = window.localStorage.getItem("filters");
      if (storedItem) {
        setFilters(JSON.parse(storedItem));
      }
    }
  }, [useLocalStorage]);

  const { data, loading, error } = useQuery(GET_DEPARTEMENTS);

  function onFilterChange(key, value) {
    const newFilters = { ...filters };
    newFilters[key] = value;

    setFilters(newFilters);
    if (useLocalStorage) {
      window.localStorage.setItem(
        "filters",
        JSON.stringify({
          ...newFilters,
          departements: [],
        })
      );
    }
  }

  const filtersContext = {
    loading,
    error,
    filters,
    departements: data ? data.departements : [],
    onFilterChange,
  };

  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
