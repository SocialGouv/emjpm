import { createContext, useState } from "react";

export const Context = createContext({});
Context.displayName = "SignupContext";

export function Provider(props) {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [user, setUser] = useState(false);
  const [mandataire, setMandataire] = useState(false);
  const [dpfi, setDpfi] = useState(false);
  const [magistrat, setMagistrat] = useState(false);
  const [greffier, setGreffier] = useState(false);
  const [direction, setDirection] = useState(false);
  const [service, setService] = useState(false);
  const [sdpf, setSdpf] = useState(false);
  const [department, setDepartment] = useState(null);
  const [region, setRegion] = useState(null);
  const [isStepOneValidate, validateStepOne] = useState(false);

  // Make the context object:
  const filtersContext = {
    department,
    direction,
    isStepOneValidate,
    magistrat,
    greffier,
    mandataire,
    dpfi,
    region,
    service,
    sdpf,
    setDepartment,
    setDirection,
    setMagistrat,
    setGreffier,
    setMandataire,
    setDpfi,
    setRegion,
    setService,
    setSdpf,
    setUser,
    user,
    validateStepOne,
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
}

export const { Consumer } = Context;
