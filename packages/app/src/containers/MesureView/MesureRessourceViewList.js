import { useState } from "react";

import { MesureRessourceCreateOrEdit } from "~/containers/MesureRessourceCreateOrEdit";

const { Heading, Button, Text } = require("~/components");
const { Flex, Box } = require("rebass");
const { MesureRessourceView } = require("./MesureRessourceView");

function MesureRessourceViewList({ mesure, ...props }) {
  const [creationMode, setCreationMode] = useState(false);
  const [selectedMesureRessource, setSelectedMesureRessource] = useState(false);

  const { mesureRessources } = mesure;

  function isSelectedMesureRessource(ressource) {
    if (!selectedMesureRessource) {
      return false;
    }
    return selectedMesureRessource.id === ressource.id;
  }

  return (
    <Box {...props}>
      <Heading size={3}>{"Ressources de la mesure de protection"}</Heading>
      <Text lineHeight="1.5" color="textSecondary">
        {
          "Vous pouvez ajouter, modifier et supprimer les ressources de la mesure de protection"
        }
      </Text>
      <Flex flexDirection="column" my={1}>
        {mesureRessources.length > 0 && (
          <Box px="3" pt="1">
            <Heading size={3}>{"Ressources"}</Heading>
            <Flex flexDirection="column">
              {mesureRessources.map((ressource) => (
                <Box key={ressource.id}>
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
                    p={1}
                    sx={{
                      ":hover": {
                        borderLeft: "solid 3px gray",
                      },
                      bg: isSelectedMesureRessource(ressource)
                        ? "cardSecondary"
                        : "",
                      cursor: "pointer",
                    }}
                    ressource={ressource}
                  />

                  {isSelectedMesureRessource(ressource) && (
                    <Box mx={5}>
                      <MesureRessourceCreateOrEdit
                        bg="cardSecondary"
                        mesure={mesure}
                        mesureRessource={ressource}
                        onSuccess={() => {
                          setSelectedMesureRessource(null);
                          setCreationMode(false);
                        }}
                        onCancel={() => {
                          setSelectedMesureRessource(null);
                          setCreationMode(false);
                        }}
                      />
                    </Box>
                  )}
                </Box>
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
}

export { MesureRessourceViewList };
