import { Box, Button, Text } from "rebass";
import { HeadingTitle } from "~/containers/HeadingTitle";

const typeLabels = {
  individuel: "Mandataire individuel",
  prepose: "Mandataire préposé d'établissement",
  service: "Service",
};

const statusLabels = {
  draft: "En cours",
  submitted: "Réponse reçue",
  validated: "Réponse validée",
};

export default function EnqueteDirectionStatut({
  enquete,
  enqueteReponse,
  goToFirstPage,
}) {
  return (
    <Box py={"50px"}>
      <HeadingTitle textAlign="center">
        Statut de la réponse N°{enqueteReponse.id} à l'enquête {enquete.annee}
      </HeadingTitle>
      <Box sx={{ lineHeight: "30px", marginTop: 4, textAlign: "center" }}>
        <Text>
          Enquête de {enquete.annee} concernant l'année {enquete.annee - 1}
        </Text>
        <Text>Statut: {statusLabels[enqueteReponse.status]}</Text>
        <Text>Type de mandataire: {typeLabels[enqueteReponse.user_type]}</Text>
      </Box>
      <Box>
        <Box sx={{ lineHeight: "30px", marginTop: 4, textAlign: "center" }}>
          <Text>
            Pour visualiser ou modifier les réponses, cliquez sur le bouton
            suivant:
          </Text>
          <Button onClick={() => goToFirstPage()} mx="auto" mt={30}>
            Réviser
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
