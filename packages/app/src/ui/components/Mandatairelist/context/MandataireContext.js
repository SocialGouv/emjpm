import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const Context = createContext({});

export function Provider(props) {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [currentMandataire, setCurrentMandataire] = useState(null);
  const [currentPanelType, setPanelType] = useState(null);

  // Make the context object:
  const mesureContext = {
    currentMandataire,
    currentPanelType,
    setCurrentMandataire,
    setPanelType,
  };

  // pass the value in provider and return
  return <Context.Provider value={mesureContext}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export const { Consumer } = Context;
