import { BoxWrapper, Button, Card, Heading2, Text } from "@emjpm/ui";
import Router from "next/router";
import React from "react";
import { Box, Flex, Link } from "rebass";

import { LayoutPublic } from "~/components/Layout";

const backLogin = () => {
  Router.push("/login");
};

const cardStyle = { m: "1", mt: "5", p: "5" };

const CongratulationPage = () => {
  return (
    <LayoutPublic>
      <BoxWrapper mt={6} px="1" p={"150px"}>
        <Card sx={cardStyle}>
          <Heading2>{"Votre demande d'inscription est terminée"}</Heading2>
          <Text mb="1" lineHeight="2" pt={6}>
            {"Merci ! Votre demande a bien été prise en compte."}
          </Text>
          <Text mb="1" lineHeight="2">
            {
              "Notre équipe a été informée et vous recevrez une confirmation très prochainement."
            }
          </Text>
          <Flex mt={5}>
            <Box>
              <Button mr="2" variant="outline" onClick={() => backLogin()}>
                <Link>Se connecter</Link>
              </Button>
            </Box>
          </Flex>
        </Card>
      </BoxWrapper>
    </LayoutPublic>
  );
};

export default CongratulationPage;
