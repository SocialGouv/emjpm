import { Card, Heading3, Text } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";
import { FileExcel } from "styled-icons/fa-regular/FileExcel";
import { FilePdf } from "styled-icons/fa-regular/FilePdf";
import { MandataireAddMesureImport } from "./MandataireAddMesureImport";

const DocumentLink = props => {
  const { children, document } = props;
  return (
    <a href={document}>
      <Flex
        maxWidth="200px"
        flexDirection="column"
        justifyContent="center"
        alignItem="center"
        pt={6}
        pb={6}
        pr={2}
        pl={2}
        m={2}
        sx={{
          border: "1px solid"
        }}
      >
        {children}
      </Flex>
    </a>
  );
};

const MandataireMesureImport = () => {
  return (
    <>
      <Card mb="5">
        <Flex flexDirection="column">
          <Box mb={2}>
            <Heading3 mb="2">{`Import de vos mesures avec un fichier excel`}</Heading3>
            <Text mb="1" lineHeight="2">
              {`Pour simplifier la première mise à jour de toutes vos mesures en cours, vous pouvez importer un fichier excel. Ce fichier excel doit être conforme au modèle que vous pourrez télécharger ci-dessous et devra contenir les informations suivantes :`}
            </Text>
            <Text ml={3} mb="1" lineHeight="1.2">
              {`- La date d’ouverture de la mesure`}
            </Text>
            <Text ml={3} mb="1" lineHeight="1.2">
              {`- Le type de mesure : Tutelle, curatelle, sauvegarde de justice, mesure ad hoc, MAJ`}
            </Text>
            <Text ml={3} mb="1" lineHeight="1.2">
              {`- Le code postal, la ville et le type de résidence du majeur à proteger`}
            </Text>
            <Text ml={3} mb="1" lineHeight="1.2">
              {`- la ville et le type de résidence du majeur à proteger`}
            </Text>
            <Text ml={3} mb="1" lineHeight="1.2">
              {`- Le genre du majeur à protéger : H ou F`}
            </Text>
            <Text ml={3} mb="1" lineHeight="1.2">
              {`- L’année de naissance du majeur à protéger`}
            </Text>
            <Text ml={3} mb="1" lineHeight="1.2">
              {`- Le numéro de dossier tel que vous avez l’habitude de le connaitre (facultatif)`}
            </Text>

            <Flex flexDirection="row" justifyContent="center" mt={2} mb={2}>
              <DocumentLink document="/static/docs/Notice_d_utilisation_de_l_import.pdf">
                <FilePdf size="86" width="100%" color="#FF0000" />
                <Box textAlign="center" mt={2} color="#0067EA">
                  Télécharger la note explicative (.pdf)
                </Box>
              </DocumentLink>
              <DocumentLink document="/static/docs/Template_Import-Excel_e-MJPM.xlsx">
                <FileExcel size="86" width="100%" color="#008000" />
                <Box textAlign="center" mt={2} color="#0067EA">
                  Télécharger le modèle de fichier excel (.xlsx)
                </Box>
              </DocumentLink>
            </Flex>
            <Text mb="1" lineHeight="2">
              {`Nous vous conseillons de réaliser l’importation de votre tableau Excel de mesures qu’une seule fois au début de votre utilisation de e-MJPM. Une fois le tableau importé une première fois, vous serez prêt.e à utiliser parfaitement e-MJPM. Vous pourrez alors faire toutes les modifications, les mises à jours et les ajoûts vous même.`}
            </Text>
          </Box>
          <Box mt={2}>
            <Heading3 mb="2">{`Import de vos mesures avec un fichier excel`}</Heading3>
            <Text mb="1" lineHeight="2">
              {`Utilisez le cadre ci-dessous pour nous transmettre votre tableau excel de mesures. Si vous eprouvez des difficultés, vous pouvez nous envoyer un mail avec votre tableau en pièce-jointe à contact@emjpm.beta.gouv.fr. Nous le vérifierons, le mettrons en page et nous vous le renverrons pour que vous puissiez l’importer.`}
            </Text>
            <MandataireAddMesureImport />
          </Box>
        </Flex>
      </Card>
    </>
  );
};

export { MandataireMesureImport };
