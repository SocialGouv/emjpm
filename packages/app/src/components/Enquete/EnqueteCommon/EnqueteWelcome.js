import { isIndividuel, isPrepose, isService, stdFormatter } from "@emjpm/biz";
import { useContext } from "react";
import { Box, Button, Flex, Text } from "rebass";

import { LinkButton } from "~/components/Commons";
import { HeadingTitle } from "~/components/HeadingTitle";
import { UserContext } from "~/components/UserContext";

import { EnqueteAlreadySubmitted } from "./EnqueteAlreadySubmitted";

const textStyle = {
  lineHeight: "30px",
  textAlign: "center",
};

const downloadStyle = { color: "blue", textDecoration: "underline" };

function getExcelName(type) {
  if (isService({ type })) {
    return "annexe_3-2019.xls";
  }
  if (isIndividuel({ type })) {
    return "annexe_5-2019.xls";
  }
  if (isPrepose({ type })) {
    return "annexe_7-2019.xls";
  }
}

export const EnqueteWelcome = ({
  goToFirstPage,
  enquete,
  enqueteReponse,
  pathPrefix,
}) => {
  const { id: enqueteId } = enquete;

  const { type } = useContext(UserContext);

  return enqueteReponse.status !== "draft" ? (
    <EnqueteAlreadySubmitted enquete={enquete} goToFirstPage={goToFirstPage} />
  ) : (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb="5">
        <HeadingTitle textAlign="center">Bienvenue</HeadingTitle>
        <Flex flexDirection="column" mt="4" mb="3" sx={textStyle}>
          <Text>Vous pouvez revenir à tout moment compléter le formulaire</Text>
          <Text sx={{ fontWeight: "700" }}>
            jusqu’au {stdFormatter.formatDateUI(enquete.date_fin)}.
          </Text>
          <Text>
            Vous pouvez appuyer sur la touche tab pour passer d’un champ à un
            autre.
          </Text>
        </Flex>
        <Button onClick={() => goToFirstPage()} mx="auto">
          Répondre
        </Button>
      </Flex>
      <Flex flexDirection="column">
        <Box mt="4" sx={textStyle}>
          <Text as="span">{"Vous avez déjà rempli le "}</Text>
          <Text as="span" sx={downloadStyle}>
            <a href={`/docs/enquetes/${getExcelName(type)}`}>
              {"fichier excel"}
            </a>
          </Text>

          <Text as="span">{" envoyé par votre direction départementale?"}</Text>
        </Box>

        <LinkButton
          mx="auto"
          pt={15}
          mt={4}
          to={`${pathPrefix}/${enqueteId}/import`}
          outline
        >
          Importez votre enquête
        </LinkButton>
      </Flex>
      <Flex flexDirection="column">
        <Box mt="4" sx={textStyle}>
          <Text as="span">
            {"Pour plus de détails, vous pouvez télécharger le "}
          </Text>
          <Text as="span" sx={downloadStyle}>
            <a
              href={
                "/docs/enquetes/DGCS_Mandoline_guide-de-remplissage-des-enquetes.pdf"
              }
            >
              {"guide de remplissage des enquêtes."}
            </a>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
