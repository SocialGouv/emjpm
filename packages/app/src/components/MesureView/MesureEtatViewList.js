import React, { useState } from "react";

import { MesureEtatCreateOrEdit } from "../MesureEtatCreateOrEdit";

const { Heading3, Button } = require("@emjpm/ui");
const { Flex, Box } = require("rebass");
const { MesureEtatView } = require("./MesureEtatView");

const MesureEtatViewList = ({ mesure, ...props }) => {
  const [creationMode, setCreationMode] = useState(false);
  const [selectedMesureEtat, setSelectedMesureEtat] = useState(false);

  const { mesureEtats } = mesure;

  const isSelectedMesureEtat = (etat) => {
    if (!selectedMesureEtat) {
      return false;
    }
    return selectedMesureEtat.id === etat.id;
  };

  return (
    <Box {...props}>
      <Heading3>{`Evolution de la protection`}</Heading3>
      <Flex flexDirection="column" my={1}>
        {mesureEtats.map((etat) => (
          <Box
            key={etat.id}
            onClick={() => {
              setSelectedMesureEtat(etat);
              setCreationMode(false);
            }}
          >
            <MesureEtatView
              etat={etat}
              p={1}
              sx={{
                "&:hover": {
                  bg: isSelectedMesureEtat(etat) ? "gray" : "cardSecondary",
                },
                bg: isSelectedMesureEtat(etat) ? "gray" : "",
                cursor: "pointer",
              }}
            />
            {isSelectedMesureEtat(etat) && (
              <Box mx={5}>
                <MesureEtatCreateOrEdit
                  mesure={mesure}
                  mesureEtat={etat}
                  onSuccess={() => {
                    setSelectedMesureEtat(null);
                    setCreationMode(false);
                  }}
                  onCancel={() => {
                    setSelectedMesureEtat(null);
                    setCreationMode(false);
                  }}
                />
              </Box>
            )}
          </Box>
        ))}
      </Flex>
      {!creationMode && (
        <Flex justifyContent="center">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedMesureEtat(null);
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
          mesureEtat={selectedMesureEtat}
          onSuccess={() => {
            setSelectedMesureEtat(null);
            setCreationMode(false);
          }}
          onCancel={() => {
            setSelectedMesureEtat(null);
            setCreationMode(false);
          }}
        />
      )}
    </Box>
  );
};

export { MesureEtatViewList };
