import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Informations } from "./Informations";
import { MAGISTRAT } from "./queries";

const MagistratInformations = props => {
  const { id } = props;
  const { data, error, loading } = useQuery(MAGISTRAT, {
    variables: { userId: id }
  });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  return <Informations {...props} userInformations={data} />;
};

export { MagistratInformations };
