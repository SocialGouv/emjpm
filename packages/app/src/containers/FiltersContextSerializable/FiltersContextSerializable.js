import { createContext, useEffect, useState } from "react";
import isEqual from "lodash.isequal";

import { useDebounce } from "~/hooks";
import { getDepartementRegionCode } from "~/utils/geodata";

export const Context = createContext({});

const { localStorage } = window;

export function Provider(props) {
  const { children, useLocalStorage, initialFilters } = props;

  const [filters, setFilters] = useState({});

  const debounceFilters = useDebounce(filters, 300);

  useEffect(() => {
    let newFilters = {};

    if (useLocalStorage) {
      const storedItem = localStorage.getItem("filters");
      if (storedItem) {
        newFilters = JSON.parse(storedItem);
      }
    }

    if (initialFilters) {
      Object.keys(initialFilters).forEach((key) => {
        if (
          newFilters[key] === undefined &&
          initialFilters[key] !== undefined
        ) {
          newFilters[key] = initialFilters[key];
        }
      });
    }

    if (newFilters.departement) {
      newFilters.region = getDepartementRegionCode(newFilters.departement);
    }

    newFilters = { ...filters, ...newFilters };
    if (!isEqual(filters, newFilters)) {
      setFilters(newFilters);
    }
  }, [useLocalStorage, initialFilters, filters]);

  function onFilterChange(obj) {
    const newFilters = { ...filters, ...obj };
    setFilters(newFilters);
    if (useLocalStorage) {
      localStorage.setItem("filters", JSON.stringify(newFilters));
    }
  }

  const filtersContext = {
    debounceFilters,
    filters,
    onFilterChange,
  };

  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
}

export const { Consumer } = Context;
