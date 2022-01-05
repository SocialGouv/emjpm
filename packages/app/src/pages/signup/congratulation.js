import { useHistory } from "react-router-dom";
import { Box, Flex, Link } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutPublic } from "~/containers/Layout";
import { Button, Card, Heading, Text } from "~/components";
import { BoxWrapper } from "~/components/Grid";

const cardStyle = { m: "1", mt: "5", p: "5" };

function CongratulationPage() {
  const history = useHistory();
  function backHome() {
    history.push("/");
  }
  return (
    <>
      <Helmet>
        <title>Demande d'inscription est terminée | e-MJPM</title>
      </Helmet>
      <LayoutPublic>
        <BoxWrapper mt={3} px="1" p={"150px"}>
          <Card sx={cardStyle}>
            <Heading size={2}>
              {"Votre demande d'inscription est terminée"}
            </Heading>
            <Text mb="1" lineHeight="2" pt={6}>
              {"Merci ! Votre demande a bien été prise en compte."}
            </Text>
            <Text mb="1" lineHeight="2">
              {
                "Notre équipe a été informée. Vous recevrez très prochainement une confirmation par email après vérification de votre demande et activation de votre compte."
              }
            </Text>
            <Flex mt={5}>
              <Box>
                <Button mr="2" variant="outline" onClick={() => backHome()}>
                  <Link>Retour à l'accueil</Link>
                </Button>
              </Box>
            </Flex>
          </Card>
        </BoxWrapper>
      </LayoutPublic>
    </>
  );
}

export default CongratulationPage;
