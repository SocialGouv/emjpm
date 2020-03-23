import PropTypes from 'prop-types';
import React from 'react';
import { Box, Flex } from 'rebass';

import { wrapperStyle } from './style';

const FlexWrapper = (props) => {
  const { children } = props;
  return (
    <Flex sx={wrapperStyle} {...props}>
      {children}
    </Flex>
  );
};

const BoxWrapper = (props) => {
  const { children } = props;
  return (
    <Box sx={wrapperStyle} {...props}>
      {children}
    </Box>
  );
};

BoxWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

FlexWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export { BoxWrapper, FlexWrapper };
