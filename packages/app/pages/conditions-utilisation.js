import { FlexWrapper } from "@emjpm/ui";
import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { Card } from "rebass";

import { ConditionsUtilisation } from "../src/components/ConditionsUtilisation";
import { LayoutPublic } from "../src/components/Layout";
import { A, H1, H2, H3, List, ListItem, Paragraph } from "../src/components/MdxComponents";

const components = {
  a: A,
  h1: H1,
  h2: H2,
  h3: H3,
  li: ListItem,
  p: Paragraph,
  ul: List,
};

const ConditionsUtilistionPage = () => (
  <MDXProvider components={components}>
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
