import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [antenne, changeAntenne] = useState(false);
  const [mesureType, changeMesureType] = useState(false);
  const [mesureStatus, changeMesureStatus] = useState(false);

  // Make the context object:
  const filtersContext = {
    antenne,
    changeAntenne,
    mesureType,
    changeMesureType,
    mesureStatus,
    changeMesureStatus
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
