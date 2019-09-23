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
              <Link target="_blank" href="https://emjpm-blog.azurewebsites.net/category/news">
                Notre actualité
              </Link>
            </ListItem>
            <ListItem>
              <Link target="_blank" href="/mentions-legales-modalites-utilisation">
                Mentions légales
              </Link>
            </ListItem>
          </List>
          <List sx={FooterItemStyle}>
            <ListTitle>Aide et ressources</ListTitle>
            <ListItem>
              <Link target="_blank" href="https://emjpm-blog.azurewebsites.net/medias/ ">
                Guide d’utilisation
              </Link>
            </ListItem>
            <ListItem>
              <Link target="_blank" href="https://github.com/SocialGouv/emjpm">
                Code source
              </Link>
            </ListItem>
          </List>
          <List sx={FooterItemStyle}>
            <ListTitle>Contactez-nous</ListTitle>
            <ListItem>
              <Link target="_blank" href="mailto:support.emjpm@fabrique.social.gouv.fr">
                Par email
              </Link>
            </ListItem>
            <ListItem>
              <Link
                target="_blank"
                href="https://docs.google.com/forms/d/1W8f9ySchjaJfAoYMVsYxjsk1PUAGoCX51Aykb_CUNXA/prefill"
              >
                Proposez une fonctionnalité
              </Link>
            </ListItem>
          </List>
        </Flex>
      </BoxWrapper>
    </Box>
  );
}

export { Footer };
