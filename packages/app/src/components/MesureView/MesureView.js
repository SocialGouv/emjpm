import { isEnCours } from "@emjpm/core";
import { Card, Heading3 } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { MesureContext } from "../MesureContext";
import { MesureDetailView } from "./MesureDetailView";
import { MesureEtatViewList } from "./MesureEtatViewList";
import { MesureRessourceView } from "./MesureRessourceView";

export const MesureView = (props) => {
  const mesure = useContext(MesureContext);
  const { mesureRessources } = mesure;

  return (
    <Card p={4} {...props}>
      <MesureDetailView mesure={mesure} px="3" pt="1" />

      {isEnCours(mesure) && (
        <MesureEtatViewList mesure={mesure} px="3" pt="1" />
      )}

      {mesureRessources.length > 0 && (
        <Box px="3" pt="1">
          <Heading3>{`Ressources`}</Heading3>
          <Flex flexDirection="column">
            {mesureRessources.map((ressource) => (
              <MesureRessourceView
                key={ressource.id}
                mt={1}
                ressource={ressource}
              />
            ))}
          </Flex>
        </Box>
      )}
    </Card>
  );
};

export default MesureView;
