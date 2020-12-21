import Head from "next/head";
import React from "react";

import { Heading1 } from "~/ui";

function HeadingTitle(props) {
  return (
    <>
      <Head>
        <title key="title">e-MJPM - {props.children}</title>
      </Head>
      <Heading1 {...props} />
    </>
  );
}

export { HeadingTitle };
