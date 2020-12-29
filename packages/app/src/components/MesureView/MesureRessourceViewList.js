import React, { useState } from "react";

import { MesureRessourceCreateOrEdit } from "~/components/MesureRessourceCreateOrEdit";

const { Heading3, Button, Text } = require("~/ui");
const { Flex, Box } = require("rebass");
const { MesureRessourceView } = require("./MesureRessourceView");

const MesureRessourceViewList = ({ mesure, ...props }) => {
  const [creationMode, setCreationMode] = useState(false);
  const [selectedMesureRessource, setSelectedMesureRessource] = useState(false);

  const { mesureRessources } = mesure;

  const isSelectedMesureRessource = (ressource) => {
    if (!selectedMesureRessource) {
      return false;
    }
    return selectedMesureRessource.id === ressource.id;
  };

  return (
    <Box {...props}>
      <Heading3>{`Ressources de la mesure de protection`}</Heading3>
      <Text lineHeight="1.5" color="textSecondary">
        {`Vous pouvez ajouter, modifier et supprimer les ressources de la mesure de protection`}
      </Text>
      <Flex flexDirection="column" my={1}>
        {mesureRessources.length > 0 && (
          <Box px="3" pt="1">
            <Heading3>{`Ressources`}</Heading3>
            <Flex flexDirection="column">
              {mesureRessources.map((ressource) => (
                <MesureRessourceView
                  onClick={() => {
                    if (isSelectedMesureRessource(ressource)) {
                      setSelectedMesureRessource(null);
                    } else {
                      setSelectedMesureRessource(ressource);
                    }
                    setCreationMode(false);
                  }}
                  key={ressource.id}
                  mt={1}
                  ressource={ressource}
                />
              ))}
            </Flex>
          </Box>
        )}
      </Flex>
      {!creationMode && (
        <Flex justifyContent="center">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedMesureRessource(null);
              setCreationMode(true);
            }}
          >
            Ajouter une ressource
          </Button>
        </Flex>
      )}
      {creationMode && (
        <MesureRessourceCreateOrEdit
          mesure={mesure}
          mesureRessource={selectedMesureRessource}
          onSuccess={() => {
            setSelectedMesureRessource(null);
            setCreationMode(false);
          }}
          onCancel={() => {
            setSelectedMesureRessource(null);
            setCreationMode(false);
          }}
        />
      )}
    </Box>
  );
};

export { MesureRessourceViewList };
