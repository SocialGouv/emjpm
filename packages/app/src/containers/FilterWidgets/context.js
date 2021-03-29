import { createContext, useReducer, useCallback } from "react";

import { useDebounce } from "~/hooks";

export const Context = createContext({});

const initialState = { filters: {}, debouncedFilters: {} };
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "set":
      const { key, value } = payload;
      return { ...state, filters: { ...state.filters, [key]: value } };
    default:
      throw new Error("unexpected action type " + type);
  }
};

export function Provider(props) {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const setFilter = useCallback(
    (key, value) => {
      dispatch({ type: "set", payload: { key, value } });
    },
    [dispatch]
  );

  const { filters } = state;
  const debouncedFilters = useDebounce(filters, 500);

  const filtersContext = {
    filters,
    debouncedFilters,
    setFilter,
  };

  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
}

export const { Consumer } = Context;
