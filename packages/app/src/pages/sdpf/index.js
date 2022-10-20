import { Flex, Box, Text, Link, Card } from "rebass";

import { LayoutSdpf } from "~/containers/Layout";

import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function ServiceBoardView() {
  return (
    <>
      <SkipToContent skipTo="vos_indicateurs" />
      <LayoutSdpf>
        <BoxWrapper mt={3} px="1">
          <Flex>
            <Card mb="1" role="alert" mr="2">
              <Text
                as="p"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: "normal",
                  lineHeight: "1.5",
                }}
              >
                Bonjour;
                <br />
                En tant que Service DPF, aucune fonctionnalité concernant votre
                profil n’est disponible sur eMJPM. L’inscription sur eMJPM vous
                permet uniquement d’être authentifiés sur eFSM. Vous pouvez y
                accéder directement en suivant{" "}
                <Link
                  title="accéder à eFSM"
                  ariaLabel="accéder à eFSM"
                  href="https://efsm.pjm.social.gouv.fr/"
                  target="_blank"
                  sx={{
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  {"ce lien vers eFSM."}
                </Link>
              </Text>
            </Card>
          </Flex>
        </BoxWrapper>
      </LayoutSdpf>
    </>
  );
}

export default ServiceBoardView;
