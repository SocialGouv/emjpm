import { BoxWrapper, Logo } from "@emjpm/ui";
import getConfig from "next/config";
import React from "react";
import { Box, Flex } from "rebass";

import { Link, List, ListItem, ListTitle } from "../Commons";
import { FooterFlexStyle, FooterItemStyle, FooterWrapperStyle } from "./style";

const { publicRuntimeConfig } = getConfig();

function Footer(props) {
  const { hasMarginTop = true } = props;
  return (
    <Box mt={hasMarginTop ? 7 : 0} sx={FooterWrapperStyle}>
      <BoxWrapper>
        <Flex sx={FooterFlexStyle}>
          <Box mb={[3, 0]} flexBasis={["100%", "13%"]}>
            <Logo hasTitle={false} />
          </Box>
          <List sx={FooterItemStyle}>
            <ListTitle>A propos de nous</ListTitle>
            <ListItem>
              <Link target="_blank" href="/mentions-legales">
                Mentions légales
              </Link>
            </ListItem>
            <ListItem>
              <Link target="_blank" href="/conditions-utilisation">
                {`Conditions d'utilisation`}
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
          </List>
          <List sx={FooterItemStyle}>
            <ListTitle>Aide et ressources</ListTitle>
            <ListItem>
              <Link target="_blank" href="https://github.com/SocialGouv/emjpm">
                Version {publicRuntimeConfig.PACKAGE_VERSION}
              </Link>
            </ListItem>
            <ListItem>
              <Link target="_blank" href="/stats">
                Statistique de connexion
              </Link>
            </ListItem>
          </List>
        </Flex>
      </BoxWrapper>
    </Box>
  );
}

export { Footer };
