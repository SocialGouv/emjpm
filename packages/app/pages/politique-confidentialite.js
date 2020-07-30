import { FlexWrapper } from "@emjpm/ui";
import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { Card } from "rebass";

import { LayoutPublic } from "../src/components/Layout";
import { mdxComponents } from "../src/components/MdxComponents";
import { PolitiqueConfidentialite } from "../src/components/PolitiqueConfidentialite";

const PolitiqueConfidentialitePage = () => (
  <MDXProvider components={mdxComponents}>
    <LayoutPublic>
      <FlexWrapper p="4" my="50px">
        <Card p={3}>
          <PolitiqueConfidentialite />
        </Card>
      </FlexWrapper>
    </LayoutPublic>
  </MDXProvider>
);

export default PolitiqueConfidentialitePage;
