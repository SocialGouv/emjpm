import PropTypes from 'prop-types';
import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { CheckboxInputStyle, CheckboxStyle, CheckboxWrapperStyle, IconWrapperStyle } from './style';

export { Check } from '@styled-icons/fa-solid/Check';

const BaseCheckBox = (props) => {
  return (
    <Box sx={CheckboxStyle(props)}>
      <Box sx={IconWrapperStyle(props)}>
        <Check color="#FFFFFF" />
      </Box>
    </Box>
  );
};

const CheckBox = (props) => {
  const { label, name, isChecked, onChange } = props;
  return (
    <Box sx={CheckboxWrapperStyle}>
      <Box htmlFor={name} as="label">
        <Box
          sx={CheckboxInputStyle()}
          onChange={() => onChange()}
          as="input"
          name={name}
          id={name}
          checked={isChecked}
          type="checkbox"
        />
        <Flex>
          <BaseCheckBox checked={isChecked} />
          <Text lineHeight="20px">{label}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

CheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { CheckBox };
