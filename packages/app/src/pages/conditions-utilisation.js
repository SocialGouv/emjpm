import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { Card } from "rebass";

import { ConditionsUtilisation } from "~/components/ConditionsUtilisation";
import { LayoutPublic } from "~/components/Layout";
import { mdxComponents } from "~/components/MdxComponents";
import { FlexWrapper } from "~/ui";

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
