import { MDXProvider } from "@mdx-js/react";
import { Card } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutPublic } from "~/containers/Layout";
import { mdxComponents } from "~/containers/MdxComponents";
import { MentionsLegales } from "~/containers/MentionsLegales";
import { FlexWrapper } from "~/components/Grid";

const MentionsLegalesPage = () => (
  <>
    <Helmet>
      <title>Mentions légales | e-MJPM </title>
    </Helmet>
    <MDXProvider components={mdxComponents}>
      <LayoutPublic>
        <FlexWrapper p="4" my="50px">
          <Card p={3}>
            <MentionsLegales />
          </Card>
        </FlexWrapper>
      </LayoutPublic>
    </MDXProvider>
  </>
);

export default MentionsLegalesPage;
