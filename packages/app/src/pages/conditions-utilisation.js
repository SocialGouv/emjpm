import { MDXProvider } from "@mdx-js/react";

import { Card } from "rebass";

import { ConditionsUtilisation } from "~/containers/ConditionsUtilisation";
import { LayoutPublic } from "~/containers/Layout";
import { mdxComponents } from "~/containers/MdxComponents";
import { FlexWrapper } from "~/components/Grid";

const ConditionsUtilistionPage = () => (
  <MDXProvider components={mdxComponents}>
    <LayoutPublic>
      <FlexWrapper p="4" my="50px">
        <Card p={3}>
          <ConditionsUtilisation />
        </Card>
      </FlexWrapper>
    </LayoutPublic>
  </MDXProvider>
);

export default ConditionsUtilistionPage;
