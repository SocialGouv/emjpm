import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [center, setCenter] = useState([2.3488, 48.8534]);
  const [mesures, setMesures] = useState([]);
  const [currentGestionnaire, setcurrentGestionnaire] = useState(false);
  // Make the context object:
  const filtersContext = {
    currentGestionnaire,
    setcurrentGestionnaire,
    center,
    setCenter,
    mesures,
    setMesures
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
