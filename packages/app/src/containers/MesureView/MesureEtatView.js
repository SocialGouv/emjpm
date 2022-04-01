import { mesureFormatter } from "@emjpm/biz";

import { Box, Flex, Text } from "rebass";

import { content, subtitle } from "./style";

function MesureEtatView({ etat, selectedMesureEtat, ...props }) {
  const { formatNatureMesure, formatChampMesure, formatLieuVie, formatPays } =
    mesureFormatter;

  const isPressed =
    !!selectedMesureEtat &&
    selectedMesureEtat.id &&
    selectedMesureEtat.id === etat.id;

  return (
    <Flex
      justifyContent="flex-start"
      {...props}
      my={1}
      as="button"
      aria-pressed={isPressed}
      title={
        isPressed ? "Modifier l'état " : "Annuler la modification de l'état"
      }
      aria-label={
        isPressed
          ? "Modifier l'état de la mesure"
          : "Annuler la modification de l'état de la mesure"
      }
    >
      <Box width="150px">
        <Text sx={subtitle}>{"Changement d'état"}</Text>
        <Text sx={content}>{etat.dateChangementEtatFormatted}</Text>
      </Box>
      <Box width="250px">
        <Text sx={subtitle}>Mesure</Text>
        <Box sx={content}>
          <Text>{formatNatureMesure(etat.natureMesure)}</Text>
          <Text>{formatChampMesure(etat.champMesure)}</Text>
        </Box>
      </Box>
      <Box width="150px">
        <Text sx={subtitle}>Lieu de vie</Text>
        <Text sx={content}>{formatLieuVie(etat.lieuVie)}</Text>
      </Box>

      <Box width="250px">
        <Text sx={subtitle}>Commune</Text>
        <Text sx={content}>
          {etat.codePostal} {etat.ville} ({formatPays(etat.pays)})
        </Text>
      </Box>
      <Box width="250px">
        <Text sx={subtitle}>Etablissement</Text>
        <Text sx={content}>
          {mesureFormatter.formatTypeEtablissement(etat.typeEtablissement)}
        </Text>
      </Box>
    </Flex>
  );
}

export { MesureEtatView };
