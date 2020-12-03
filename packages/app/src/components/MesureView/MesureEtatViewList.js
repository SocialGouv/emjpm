import React, { useState } from "react";

import { MesureEtatCreateOrEdit } from "../MesureEtatCreateOrEdit";

const { Heading3, Button } = require("@emjpm/ui");
const { Flex, Box } = require("rebass");
const { MesureEtatView } = require("./MesureEtatView");

const MesureEtatViewList = ({ mesure, ...props }) => {
  const [creationMode, setCreationMode] = useState(false);

  const { mesureEtats } = mesure;

  return (
    <Box {...props}>
      <Heading3>{`Evolution de la protection`}</Heading3>
      <Flex flexDirection="column" my={1}>
        {mesureEtats.map((etat) => (
          <MesureEtatView etat={etat} mb={1} key={etat.id} />
        ))}
      </Flex>
      {!creationMode && (
        <Flex justifyContent="center">
          <Button
            variant="outline"
            onClick={() => {
              setCreationMode(true);
            }}
          >
            Ajouter un changement
          </Button>
        </Flex>
      )}
      {creationMode && (
        <MesureEtatCreateOrEdit
          mesure={mesure}
          onSuccess={() => {
            setCreationMode(false);
          }}
        />
      )}
    </Box>
  );
};

export { MesureEtatViewList };
