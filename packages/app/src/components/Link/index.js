import NextLink from "next/link";
import React from "react";

import { LinkWrapper } from "./LinkWrapper";

// https://github.com/vercel/next.js/issues/7915#issuecomment-747433561

function Link({ refAs, children, ...props }) {
  return (
    <NextLink {...props}>
      <LinkWrapper refAs={refAs}>{children}</LinkWrapper>
    </NextLink>
  );
}

export { Link };
