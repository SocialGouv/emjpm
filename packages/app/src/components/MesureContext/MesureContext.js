import { useQuery } from "@apollo/react-hooks";
import React, { createContext, Fragment } from "react";

import { formatMesure } from "./utils";

export const Context = createContext({});

import { MESURES } from "./queries";

export const Provider = (props) => {
  const { children, mesureId } = props;

  const { data } = useQuery(MESURES, {
    fetchPolicy: "cache-and-network",
    variables: {
      id: mesureId,
    },
  });

  if (!data) {
    return <Fragment>loading</Fragment>;
  }

  const [mesure] = data.mesures;
  const formatedMesure = formatMesure(mesure);
  return <Context.Provider value={formatedMesure}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
