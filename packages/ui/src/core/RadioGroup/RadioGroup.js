import PropTypes from 'prop-types';
import React from 'react';
import { Box, Flex } from 'rebass';

import { Radio } from '../Radio';

export const RadioGroup = (props) => {
  const { options, onValueChange, value, renderRadioLabel } = props;

  return (
    <Box width="100%">
      <Flex flexWrap="wrap">
        {options.map((option) => {
          return (
            <Box key={option.value} width={[1]} mb={1}>
              <Radio
                onChange={() => {
                  if (!option.disabled) {
                    onValueChange(option.value);
                  }
                }}
                id={option.value}
                label={option.label}
                checked={option.checked || option.value === value}
                disabled={option.disabled}
                name={option.name ? option.name : ''}
                option={option}
                renderRadioLabel={renderRadioLabel}
              />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

RadioGroup.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.boolean,
      label: PropTypes.string.isRequired,
      name: PropTypes.string,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  renderRadioLabel: PropTypes.func,
  value: PropTypes.string,
};

RadioGroup.defaultProps = {
  renderRadioLabel: 'null',
  value: 'null',
};
