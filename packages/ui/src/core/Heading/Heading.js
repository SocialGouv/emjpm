import React from 'react';
import { Heading as RebassHeading } from 'rebass';

import { baseStyle } from './Style';

const Heading0 = (props) => {
  return <RebassHeading as="div" fontSize={7} sx={baseStyle} {...props} />;
};

const Heading1 = (props) => {
  return <RebassHeading as="div" fontSize={6} sx={baseStyle} {...props} />;
};

const Heading2 = (props) => {
  return <RebassHeading as="div" fontSize={5} sx={baseStyle} {...props} />;
};

const Heading3 = (props) => {
  return <RebassHeading as="div" fontSize={4} sx={baseStyle} {...props} />;
};

const Heading4 = (props) => {
  return <RebassHeading as="div" fontSize={3} sx={baseStyle} {...props} />;
};

const Heading5 = (props) => {
  return <RebassHeading as="div" fontSize={2} sx={baseStyle} {...props} />;
};

export { Heading0, Heading1, Heading2, Heading3, Heading4, Heading5 };
