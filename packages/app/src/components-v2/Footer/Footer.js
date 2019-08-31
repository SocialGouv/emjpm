import React from "react";
import { Flex, Box } from "rebass";
import { BoxWrapper, Logo } from "@socialgouv/emjpm-ui-core";

import { List, ListItem, ListTitle, Link } from "../Commons";
import { FooterWrapperStyle, FooterFlexStyle, FooterItemStyle } from "./style";

function Footer() {
  return (
    <Box sx={FooterWrapperStyle}>
      <BoxWrapper>
        <Flex sx={FooterFlexStyle}>
          <Box mb={[3, 0]} flexBasis={["100%", "13%"]}>
            <Logo hasTitle={false} />
          </Box>
          <List sx={FooterItemStyle}>
            <ListTitle>A propos de nous</ListTitle>
            <ListItem>
              <Link href="/">Qui sommes-nous ?</Link>
            </ListItem>
            <ListItem>
              <Link href="/">Mentions légales</Link>
            </ListItem>
          </List>
          <List sx={FooterItemStyle}>
            <ListTitle>Aide et ressources</ListTitle>
            <ListItem>
              <Link href="/">Guide d’utilisation</Link>
            </ListItem>
            <ListItem>
              <Link href="/">Code source</Link>
            </ListItem>
          </List>
          <List sx={FooterItemStyle}>
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
