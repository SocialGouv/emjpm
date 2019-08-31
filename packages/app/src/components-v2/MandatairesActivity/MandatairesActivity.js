import React from "react";
import { Card, Heading2 } from "@socialgouv/emjpm-ui-core";

import { MandatairesActivityChart } from "./MandatairesActivityChart";

const MandatairesActivity = props => {
  return (
    <Card p="4" {...props}>
      <Heading2>Répartition de l’activité par type de mandataires</Heading2>
      <MandatairesActivityChart />
    </Card>
  );
};

export { MandatairesActivity };
