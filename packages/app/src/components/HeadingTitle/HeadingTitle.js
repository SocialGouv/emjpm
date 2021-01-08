import DocumentTitle from "react-document-title";

import { Heading1 } from "~/ui";

function HeadingTitle(props) {
  return (
    <>
      <DocumentTitle title={"e-MJPM - " + props.children} />
      <Heading1 {...props} />
    </>
  );
}

export { HeadingTitle };
