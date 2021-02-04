import DocumentTitle from "react-document-title";

import { Heading } from "~/components";

function HeadingTitle(props) {
  return (
    <>
      <DocumentTitle title={"e-MJPM - " + props.children} />
      <Heading size={1} {...props} />
    </>
  );
}

export { HeadingTitle };
