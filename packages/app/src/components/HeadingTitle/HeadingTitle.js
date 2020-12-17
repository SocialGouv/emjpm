import { Heading1 } from "@emjpm/ui";
import Head from "next/head";
import React from "react";

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
