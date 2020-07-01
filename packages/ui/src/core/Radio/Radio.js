
import PropTypes from 'prop-types';
import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { InnerRadioStyle, RadioInputStyle, RadioStyle, RadioWrapperStyle } from './style';

const BaseRadio = (props) => {
  return (
    <Box sx={RadioStyle(props)}>
      <Box sx={InnerRadioStyle(props)} />
    </Box>
  );
};

export const Radio = (props) => {
  const { label, id, name, checked, renderRadioLabel } = props;
  return (
    <Box sx={RadioWrapperStyle}>
      <Box htmlFor={id} as="label">
        <Box sx={RadioInputStyle()} as="input" name={name} id={id} checked={checked} type="Radio" {...props} />
        <Flex>
          <BaseRadio checked={checked} />
          {renderRadioLabel? renderRadioLabel(props): <Text lineHeight="20px">{label}</Text>}
          
        </Flex>
      </Box>
    </Box>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  renderRadioLabel: PropTypes.func,
};


Radio.defaultProps = {
  renderRadioLabel: 'null',
};
