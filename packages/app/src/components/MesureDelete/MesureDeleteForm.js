import React from "react";
import { Box, Flex, Text } from "rebass";

import { Button, Heading3, Heading5 } from "~/ui";

export const MesureDeleteForm = (props) => {
  const { handleSubmit, handleCancel } = props;

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <Heading5 mb="1">Supprimer la mesure</Heading5>
        <Text mb="2" lineHeight="1.5">
          {
            "Vous êtes sur le point de supprimer définitivement une mesure de protection du système eMJPM. Toute suppression est irréversible, vous ne pourrez pas récupérer les données associées à cette mesure et celle-ci disparaîtra des statistiques d'activité produites par eMJPM à destination des magistrats et des agents de l'Etat."
          }
        </Text>
        <Text mb="2" lineHeight="1.5">
          {
            'NB : les mesures éteintes ne sont plus comptabilisees dans vos "mesures en cours", elles n\'apparaissent donc plus aupres des Magistrats.'
          }
        </Text>
        <Text lineHeight="1.5">
          {
            'Si vous souhaitez supprimer definitivement cette mesure, cliquez sur "Supprimer la mesure".'
          }
        </Text>
        <Text lineHeight="1.5">
          {'Dans le cas contraire, cliquez sur "Annuler".'}
        </Text>
      </Box>
      <Box p="5" width={[1, 2 / 5]}>
        <Box mb="3">
          <Heading3>Supprimer la mesure</Heading3>
        </Box>
        <Flex justifyContent="flex-end">
          <Box>
            <Button mr="2" variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
          </Box>
          <Box>
            <Button onClick={handleSubmit}>Supprimer la mesure</Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
