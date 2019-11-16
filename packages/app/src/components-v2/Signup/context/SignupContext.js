import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [user, setUser] = useState(false);
  const [mandataire, setMandataire] = useState(false);
  const [magistrat, setMagistrat] = useState(false);
  const [direction, setDirection] = useState(false);
  const [service, setService] = useState(false);
  const [isStepOneValidate, validateStepOne] = useState(false);

  // Make the context object:
  const filtersContext = {
    direction,
    isStepOneValidate,
    magistrat,
    mandataire,
    service,
    setDirection,
    setMagistrat,
    setMandataire,
    setService,
    setUser,
    user,
    validateStepOne
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
