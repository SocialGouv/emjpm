import { FlexWrapper } from "@emjpm/ui";
import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { Card } from "rebass";

import { ConditionsUtilisation } from "../src/components/ConditionsUtilisation";
import { LayoutPublic } from "../src/components/Layout";
import { mdxComponents } from "../src/components/MdxComponents";

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
