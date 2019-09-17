import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Informations } from "./Informations";
import { MAGISTRAT } from "./queries";

const MagistratInformations = () => {
  const { data, error, loading } = useQuery(MAGISTRAT);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return <Informations userInformations={data} />;
};

export { MagistratInformations };
