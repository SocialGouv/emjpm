import { FlexWrapper } from "@emjpm/ui";
import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { Card } from "rebass";

import { LayoutPublic } from "~/components/Layout";
import { mdxComponents } from "~/components/MdxComponents";
import { MentionsLegales } from "~/components/MentionsLegales";

const MentionsLegalesPage = () => (
  <MDXProvider components={mdxComponents}>
    <LayoutPublic>
      <FlexWrapper p="4" my="50px">
        <Card p={3}>
          <MentionsLegales />
        </Card>
      </FlexWrapper>
    </LayoutPublic>
  </MDXProvider>
);

export default MentionsLegalesPage;
