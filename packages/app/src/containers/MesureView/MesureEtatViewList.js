import { useState } from "react";

import { MesureEtatCreateOrEdit } from "~/containers/MesureEtatCreateOrEdit";

import { Heading, Button, Text } from "~/components";
import { Flex, Box } from "rebass";
import { MesureEtatView } from "./MesureEtatView";

import useUser from "~/hooks/useUser";
import { SYNC_OCMI_DISABLED_MESSAGE } from "~/constants/mesures";

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

  const {
    mandataire: { sync_ocmi_enable },
  } = useUser();

  const mesureModificationDisabled = sync_ocmi_enable;
  const mesureModificationButtonProps = mesureModificationDisabled
    ? {
        disabled: true,
        title: SYNC_OCMI_DISABLED_MESSAGE,
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
              onClick={() => {
                if (mesureModificationDisabled) {
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
                cursor: mesureModificationDisabled ? "normal" : "pointer",
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
