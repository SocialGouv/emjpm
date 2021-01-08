import { Link } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { Heading2, Heading3, Text } from "~/ui";

const A = (props) => <Link {...props} />;
const H1 = (props) => <HeadingTitle {...props} mb={3} />;
const H2 = (props) => <Heading2 {...props} mb={2} mt={2} />;
const H3 = (props) => <Heading3 {...props} mb={1} mt={1} />;
const ListItem = (props) => (
  <li css={{ "list-style-type": "disc" }} {...props} />
);
const Paragraph = (props) => <Text lineHeight="1.6" {...props} mb={1} />;
const List = (props) => (
  <ul css={{ "margin-bottom": "10px", "margin-left": "30px" }} {...props} />
);

const mdxComponents = {
  a: A,
  h1: H1,
  h2: H2,
  h3: H3,
  li: ListItem,
  p: Paragraph,
  ul: List,
};

export { mdxComponents };
