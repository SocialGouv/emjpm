import { MDXProvider } from "@mdx-js/react";
import { Helmet } from "react-helmet";

import { Card } from "rebass";

import { LayoutPublic } from "~/containers/Layout";
import { mdxComponents } from "~/containers/MdxComponents";
import { PolitiqueConfidentialite } from "~/containers/PolitiqueConfidentialite";
import { FlexWrapper } from "~/components/Grid";
import { Heading } from "~/components";

const PolitiqueConfidentialitePage = () => (
  <>
    <Helmet>
      <title>Politique de confidentialité | e-MJPM </title>
    </Helmet>
    <MDXProvider components={mdxComponents}>
      <LayoutPublic>
        <FlexWrapper p="4" my="50px">
          <Card p={3}>
            <PolitiqueConfidentialite />
            <iframe
              title="suivi de votre navigation"
              style={{ border: 0, width: "100%" }}
              src="https://matomo.fabrique.social.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=2f3b6c&fontSize=16px&fontFamily=sans-serif"
            />
            <p>
              Pour aller plus loin, vous pouvez consulter les fiches proposées
              par la Commission Nationale de l’Informatique et des Libertés
              (CNIL) :
            </p>

            <p>
              <a
                href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi"
                target="_blank"
                className="mdx-a"
              >
                Cookies & traceurs : que dit la loi ?
              </a>
            </p>

            <p>
              <a
                href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
                target="_blank"
                className="mdx-a"
              >
                Cookies : les outils pour les maîtriser
              </a>
            </p>

            <Heading
              size={2}
              style={{ fontSize: "18px", marginTop: "8px", fontWeight: "bold" }}
            >
              Mise à jour
            </Heading>

            <p>
              Les termes de la présente politique de confidentialité peuvent
              être amendés à tout moment, sans préavis, en fonction des
              modifications apportées à la plateforme, de l’évolution de la
              législation ou pour tout autre motif jugé nécessaire.
            </p>
          </Card>
        </FlexWrapper>
      </LayoutPublic>
    </MDXProvider>
  </>
);

export default PolitiqueConfidentialitePage;
