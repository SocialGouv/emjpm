import React from "react";
import { Flex, Box } from "rebass";
import { Wrapper, List, ListItem, ListTitle, Link, Logo } from "../commons";

function Footer() {
  return (
    <Box mt="7" py="5" bg="cardPrimary">
      <Wrapper>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Box>
            <Logo />
          </Box>
          <List flexBasis="220px">
            <ListTitle>A propos de nous</ListTitle>
            <ListItem>
              <Link href="/">Qui sommes-nous ?</Link>
            </ListItem>
            <ListItem>
              <Link href="/">Mentions légales</Link>
            </ListItem>
          </List>
          <Box flexBasis="220px">
            <List>
              <ListTitle>Aide et ressources</ListTitle>
              <ListItem>
                <Link href="/">Guide d’utilisation</Link>
              </ListItem>
              <ListItem>
                <Link href="/">Code source</Link>
              </ListItem>
            </List>
          </Box>
          <Box flexBasis="220px">
            <List>
              <ListTitle>Contactez-nous</ListTitle>
              <ListItem>
                <Link href="/">Par email</Link>
              </ListItem>
              <ListItem>
                <Link href="/">Proposez une fonctionnalités</Link>
              </ListItem>
            </List>
          </Box>
        </Flex>
      </Wrapper>
    </Box>
  );
}

export { Footer };
