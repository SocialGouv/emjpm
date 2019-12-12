import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [currentGestionnaire, setcurrentGestionnaire] = useState({
    isActive: false,
    latitude: 48.8534,
    longitude: 2.3488,
    currentId: null,
    currentDiscriminator: null
  });

  // Make the context object:
  const filtersContext = {
    currentGestionnaire,
    setcurrentGestionnaire
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
