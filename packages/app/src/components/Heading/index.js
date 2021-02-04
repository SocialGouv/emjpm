import { Heading as RebassHeading } from "rebass";

import { baseStyle } from "./style";

function Heading0(props) {
  return <RebassHeading as="div" fontSize={7} sx={baseStyle} {...props} />;
}

function Heading1(props) {
  return <RebassHeading as="div" fontSize={6} sx={baseStyle} {...props} />;
}

function Heading2(props) {
  return <RebassHeading as="div" fontSize={5} sx={baseStyle} {...props} />;
}

function Heading3(props) {
  return <RebassHeading as="div" fontSize={4} sx={baseStyle} {...props} />;
}

function Heading4(props) {
  return <RebassHeading as="div" fontSize={3} sx={baseStyle} {...props} />;
}

function Heading5(props) {
  return <RebassHeading as="div" fontSize={2} sx={baseStyle} {...props} />;
}

function getComponent(size) {
  switch (size) {
    case 0:
      return Heading0;
    case 1:
      return Heading1;
    case 2:
      return Heading2;
    case 3:
      return Heading3;
    case 4:
      return Heading4;
    case 5:
      return Heading5;
    default:
      throw new Error("unkown size for Heading component: " + size);
  }
}

export default function Heading({ size = 0, ...props }) {
  const HeadingComponent = getComponent(size);
  return <HeadingComponent {...props} />;
}
