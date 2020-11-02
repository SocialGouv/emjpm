import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-apollo";

import { useDebounce } from "../../lib/hooks";
import { endDate, startDate } from "../../util/dates";
import { GET_DEPARTEMENTS } from "./queries";

export const Context = createContext({});

export const Provider = (props) => {
  const { children, useLocalStorage, initialFilters } = props;

  const [filters, setFilters] = useState({
    departements: [],
    endDate,
    startDate,
  });

  const debounceFilters = useDebounce(filters, 2000);

  useEffect(() => {
    let newFilters = {};

    if (useLocalStorage) {
      const storedItem = window.localStorage.getItem("filters");
      if (storedItem) {
        newFilters = JSON.parse(storedItem);
      }
    }

    if (initialFilters) {
      Object.keys(initialFilters).forEach((key) => {
        if (!newFilters[key] && initialFilters[key]) {
          newFilters[key] = initialFilters[key];
        }
      });
    }

    setFilters((f) => ({ ...f, ...newFilters }));
  }, [useLocalStorage, initialFilters]);

  const { data, loading, error } = useQuery(GET_DEPARTEMENTS);

  function onFilterChange(obj) {
    const newFilters = { ...filters, ...obj };
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
    debounceFilters,
    departements: data ? data.departements : [],
    error,
    filters,
    loading,
    onFilterChange,
  };

  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
