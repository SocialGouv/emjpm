import { Box, Flex } from "rebass";

import { Link, List, ListItem, ListTitle } from "~/containers/Commons";
import config from "~/config";
import { Logo } from "~/components";
import { BoxWrapper } from "~/components/Grid";

import {
  FooterItemStyle,
  FooterContainerStyle,
  FooterWrapperStyle,
} from "./style";
const { PACKAGE_VERSION } = config;

function Footer(props) {
  return (
    <Box sx={FooterWrapperStyle}>
      <Box sx={FooterContainerStyle}>
        <BoxWrapper>
          <Flex
            flexWrap="wrap"
            justifyContent="space-between"
            flexDirection={["column", "column", "row"]}
          >
            <Box mb={[3, 0]} flexBasis={["100%", "13%"]}>
              <Logo hasTitle={false} />
            </Box>
            <List sx={FooterItemStyle}>
              <ListTitle>eMJPM</ListTitle>
              <ListItem>
                <Link target="_blank" to="/mentions-legales">
                  Mentions légales
                </Link>
              </ListItem>
              <ListItem>
                <Link target="_blank" to="/politique-confidentialite">
                  {"Politique de confidentialité"}
                </Link>
              </ListItem>
              <ListItem>
                <Link target="_blank" to="/conditions-utilisation">
                  {"Conditions d'utilisation"}
                </Link>
              </ListItem>
              <ListItem>
                <Link target="_blank" to="/stats">
                  Statistique de connexion
                </Link>
              </ListItem>
            </List>
            <List sx={FooterItemStyle}>
              <ListTitle>Aidez-nous à améliorer cet outil</ListTitle>
              <ListItem>
                <Link
                  target="_blank"
                  to="mailto:support.emjpm@fabrique.social.gouv.fr"
                >
                  support.emjpm@fabrique.social.gouv.fr
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  target="_blank"
                  to={`https://github.com/SocialGouv/emjpm/tree/v${PACKAGE_VERSION}`}
                >
                  Contribuer sur GitHub
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  target="_blank"
                  to={`https://github.com/SocialGouv/emjpm/releases/tag/v${PACKAGE_VERSION}`}
                >
                  Journal des modifications
                </Link>
              </ListItem>
              <ListItem>
                <Link target="_blank" to={`/rgaa`}>
                  Accessibilité : non conforme
                </Link>
              </ListItem>
            </List>
            <List sx={FooterItemStyle}>
              <ListTitle>En collaboration avec</ListTitle>
              <ListItem>
                <Link
                  target="_blank"
                  to="https://solidarites-sante.gouv.fr/ministere/organisation/organisation-des-directions-et-services/article/organisation-de-la-direction-generale-de-la-cohesion-sociale-dgcs"
                >
                  {"La Direction Générale de la Cohésion Sociale"}
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  target="_blank"
                  to={"https://www.fabrique.social.gouv.fr/"}
                >
                  {"La fabrique numérique des ministères sociaux"}
                </Link>
              </ListItem>
            </List>
          </Flex>
        </BoxWrapper>
      </Box>
    </Box>
  );
}

export { Footer };
