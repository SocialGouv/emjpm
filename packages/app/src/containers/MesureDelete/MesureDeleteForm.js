import { Box, Flex, Text } from "rebass";

import { Button, Heading } from "~/components";

export function MesureDeleteForm(props) {
  const { handleSubmit, handleCancel, mesure } = props;

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        {!mesure.en_attente_reouverture && (
          <>
            <Heading size={5} mb="1">
              Supprimer la mesure
            </Heading>
            <Text mb="2" lineHeight="1.5">
              {
                "Vous êtes sur le point de supprimer définitivement une mesure de protection du système eMJPM. Toute suppression est irréversible, vous ne pourrez pas récupérer les données associées à cette mesure et celle-ci disparaîtra des statistiques d'activité produites par eMJPM à destination des magistrats et des agents de l'Etat."
              }
            </Text>
            <Text mb="2" lineHeight="1.5">
              {
                'NB : les mesures clôturées ne sont plus comptabilisées dans vos "mesures en cours", elles n\'apparaissent donc plus aupres des Magistrats.'
              }
            </Text>
            <Text lineHeight="1.5">
              {
                'Si vous souhaitez supprimer definitivement cette mesure, cliquez sur "Supprimer la mesure".'
              }
            </Text>
          </>
        )}
        {mesure.en_attente_reouverture && (
          <>
            <Heading size={5} mb="1">
              Supprimer la demande de réouverture
            </Heading>
            <Text mb="2" lineHeight="1.5">
              {
                "Vous êtes sur le point de supprimer définitivement une demande réouverture de mesure de protection du système eMJPM. Toute suppression est irréversible, vous ne pourrez pas récupérer les données associées à cette réouverture de mesure et celle-ci disparaîtra des statistiques d'activité produites par eMJPM à destination des magistrats et des agents de l'Etat."
              }
            </Text>
            <Text lineHeight="1.5">
              {
                'Si vous souhaitez supprimer definitivement cette demande de réouverture de mesure, cliquez sur "Supprimer la demande de réouverture de mesure".'
              }
            </Text>
          </>
        )}
        <Text lineHeight="1.5">
          {'Dans le cas contraire, cliquez sur "Annuler".'}
        </Text>
      </Box>
      <Box p="5" width={[1, 2 / 5]}>
        <Box mb="3">
          {!mesure.en_attente_reouverture && (
            <Heading size={3}>Supprimer la mesure</Heading>
          )}
          {mesure.en_attente_reouverture && (
            <Heading size={3}>
              Supprimer la demande de réouverture de la mesure
            </Heading>
          )}
        </Box>
        <Flex justifyContent="flex-end">
          <Box>
            <Button mr="2" variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
          </Box>
          <Box>
            {!mesure.en_attente_reouverture && (
              <Button onClick={handleSubmit}>Supprimer la mesure</Button>
            )}
            {mesure.en_attente_reouverture && (
              <Button onClick={handleSubmit}>Supprimer</Button>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
