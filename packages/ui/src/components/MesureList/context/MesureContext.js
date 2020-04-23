import React, { createContext, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  // Use State to keep the values
  const [currentMesure, setCurrentMesure] = useState(null);
  const [currentPanelType, setPanelType] = useState(null);

  // Make the context object:
  const mesureContext = {
    currentMesure,
    currentPanelType,
    setCurrentMesure,
    setPanelType,
  };

  // pass the value in provider and return
  return <Context.Provider value={mesureContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
