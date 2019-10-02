import React, { createContext, useState } from "react";
import { useDebounce } from "../../hooks";

export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [antenne, changeAntenne] = useState(false);
  const [mesureType, changeMesureType] = useState(false);
  const [mesureStatus, changeMesureStatus] = useState(false);
  const [searchText, changeSearchText] = useState("");

  // Now we call our hook, passing in the current searchTerm value.
  // The hook will only return the latest value (what we passed in) ...
  // ... if it's been more than 500ms since it was last called.
  // Otherwise, it will return the previous value of searchTerm.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchText = useDebounce(searchText, 1000);

  // Make the context object:
  const filtersContext = {
    antenne,
    changeAntenne,
    mesureType,
    changeMesureType,
    mesureStatus,
    changeMesureStatus,
    searchText,
    changeSearchText,
    debouncedSearchText
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
