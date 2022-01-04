import { MDXProvider } from "@mdx-js/react";

import { Card } from "rebass";

import { ConditionsUtilisation } from "~/containers/ConditionsUtilisation";
import { LayoutPublic } from "~/containers/Layout";
import { mdxComponents } from "~/containers/MdxComponents";
import { FlexWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";

const ConditionsUtilistionPage = () => (
  <>
    <Helmet>
      <title>Conditions d’utilisation de la plateforme | e-MJPM </title>
    </Helmet>
    <MDXProvider components={mdxComponents}>
      <LayoutPublic>
        <FlexWrapper p="4" my="50px">
          <Card p={3}>
            <ConditionsUtilisation />
          </Card>
        </FlexWrapper>
      </LayoutPublic>
    </MDXProvider>
  </>
);

export default ConditionsUtilistionPage;
