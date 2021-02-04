import { MDXProvider } from "@mdx-js/react";

import { Card } from "rebass";

import { LayoutPublic } from "~/containers/Layout";
import { mdxComponents } from "~/containers/MdxComponents";
import { PolitiqueConfidentialite } from "~/containers/PolitiqueConfidentialite";
import { FlexWrapper } from "~/components/Grid";

const PolitiqueConfidentialitePage = () => (
  <MDXProvider components={mdxComponents}>
    <LayoutPublic>
      <FlexWrapper p="4" my="50px">
        <Card p={3}>
          <PolitiqueConfidentialite />
          <iframe
            title="matomo optout"
            style={{ border: 0, width: "100%" }}
            src="https://matomo.fabrique.social.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=2f3b6c&fontSize=16px&fontFamily=sans-serif"
          />
        </Card>
      </FlexWrapper>
    </LayoutPublic>
  </MDXProvider>
);

export default PolitiqueConfidentialitePage;
