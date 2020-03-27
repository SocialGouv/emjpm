import PropTypes from 'prop-types';
import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { Marianne } from './Marianne';
import { LogoStyle, logoTextStyle } from './style';

const Logo = (props) => {
  const { hasTitle, title } = props;

  return (
    <Flex>
      <Box sx={LogoStyle}>
        <Marianne />
      </Box>
      {hasTitle && (
        <Box>
          <Text sx={logoTextStyle}>{title}</Text>
        </Box>
      )}
    </Flex>
  );
};

Logo.propTypes = {
  hasTitle: PropTypes.bool,
  title: PropTypes.string
};

Logo.defaultProps = {
  hasTitle: true,
  title: "e-MJPM"
};

export { Logo };
