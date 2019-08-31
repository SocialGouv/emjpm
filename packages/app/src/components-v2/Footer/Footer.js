import React from "react";
import { Flex, Box } from "rebass";
import { BoxWrapper, Logo } from "@socialgouv/emjpm-ui-core";
import { List, ListItem, ListTitle, Link } from "../commons";

function Footer() {
  return (
    <Box mt="7" py="5" bg="cardPrimary">
      <BoxWrapper>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Box mb={[3, 0]} flexBasis={["100%", "13%"]}>
            <Logo hasTitle={false} />
          </Box>
          <List flexBasis={["100%", "27%"]}>
            <ListTitle>A propos de nous</ListTitle>
            <ListItem>
              <Link href="/">Qui sommes-nous ?</Link>
            </ListItem>
            <ListItem>
              <Link href="/">Mentions légales</Link>
            </ListItem>
          </List>
          <List flexBasis={["100%", "27%"]}>
            <ListTitle>Aide et ressources</ListTitle>
            <ListItem>
              <Link href="/">Guide d’utilisation</Link>
            </ListItem>
            <ListItem>
              <Link href="/">Code source</Link>
            </ListItem>
          </List>
          <List flexBasis={["100%", "27%"]}>
            <ListTitle>Contactez-nous</ListTitle>
            <ListItem>
              <Link href="/">Par email</Link>
            </ListItem>
            <ListItem>
              <Link href="/">Proposez une fonctionnalités</Link>
            </ListItem>
          </List>
        </Flex>
      </BoxWrapper>
    </Box>
  );
}

export { Footer };
