import { Heading1, Heading2, Heading3, Text } from "@emjpm/ui";
import React from "react";
import { Link } from "rebass";

const A = (props) => <Link {...props} />;
const H1 = (props) => <Heading1 {...props} mb={3} />;
const H2 = (props) => <Heading2 {...props} mb={2} mt={2} />;
const H3 = (props) => <Heading3 {...props} mb={1} mt={1} />;
const ListItem = (props) => <li css={{ "list-style-type": "disc" }} {...props} />;
const Paragraph = (props) => <Text lineHeight="1.6" {...props} />;
const List = (props) => <ul css={{ "margin-left": "30px" }} {...props} />;

export { A, H1, H2, H3, ListItem, Paragraph, List };
