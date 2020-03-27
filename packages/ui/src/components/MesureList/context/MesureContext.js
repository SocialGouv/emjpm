import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
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

Provider.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export const { Consumer } = Context;
