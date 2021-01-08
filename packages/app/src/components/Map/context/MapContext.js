import { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { children, longitude = 2.3488, latitude = 48.8534 } = props;

  // Use State to keep the values
  const [currentMarker, setCurrentMarker] = useState({
    id: null,
    isActive: false,
    latitude: latitude,
    longitude: longitude,
    type: null,
  });

  // Make the context object:
  const mapContext = {
    currentMarker,
    setCurrentMarker,
  };

  // pass the value in provider and return
  return <Context.Provider value={mapContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
