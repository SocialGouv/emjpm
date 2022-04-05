import { useState } from "react";

import { MesureEtatCreateOrEdit } from "~/containers/MesureEtatCreateOrEdit";

import { Heading, Button, Text } from "~/components";
import { Flex, Box } from "rebass";
import { MesureEtatView } from "./MesureEtatView";

import useMesuresLocked from "~/hooks/useMesuresLocked";

function MesureEtatViewList({ mesure, ...props }) {
  const [creationMode, setCreationMode] = useState(false);
  const [selectedMesureEtat, setSelectedMesureEtat] = useState(false);

  const { mesureEtats } = mesure;

  function isSelectedMesureEtat(etat) {
    if (!selectedMesureEtat) {
      return false;
    }
    return selectedMesureEtat.id === etat.id;
  }

  const { locked, message } = useMesuresLocked(mesure);
  const mesureModificationButtonProps = locked
    ? {
        disabled: true,
        title: message,
        "aria-label": message,
      }
    : {};

  return (
    <Box {...props}>
      <Heading size={3}>{"Etats de la mesure de protection"}</Heading>
      <Text lineHeight="1.5" color="textSecondary">
        {
          "Vous pouvez ajouter, modifier et supprimer les états de la mesure de protection"
        }
      </Text>
      <Flex flexDirection="column" my={1}>
        {mesureEtats.map((etat) => (
          <Box key={etat.id}>
            <MesureEtatView
              selectedMesureEtat={selectedMesureEtat}
              onClick={() => {
                if (locked) {
                  return;
                }
                if (isSelectedMesureEtat(etat)) {
                  setSelectedMesureEtat(null);
                } else {
                  setSelectedMesureEtat(etat);
                }
                setCreationMode(false);
              }}
              etat={etat}
              p={1}
              sx={{
                ":hover": {
                  borderLeft: "solid 3px gray",
                },
                bg: isSelectedMesureEtat(etat) ? "cardSecondary" : "",
                cursor: locked ? "normal" : "pointer",
              }}
            />
            {isSelectedMesureEtat(etat) && (
              <Box mx={5}>
                <MesureEtatCreateOrEdit
                  bg="cardSecondary"
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
            title="Ajouter un changement"
            aria-label="Ajouter un changement"
            {...mesureModificationButtonProps}
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
}

export { MesureEtatViewList };
