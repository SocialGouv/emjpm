import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Box, Flex } from 'rebass';

import { Radio } from '../Radio';

export const RadioGroup = (props) => {
  const { options, onChange, defaultValue } = props;
  const [currentRadio, toogleRadio] = useState(null);

  useEffect(() => {
    toogleRadio(defaultValue);
  }, []);

  return (
    <Box onChange={onChange(currentRadio)} width="100%">
      <Flex flexWrap="wrap">
        {options.map((option) => {
          return (
            <Box key={option.value} width={[1]} mb={1}>
              <Radio
                onChange={() => toogleRadio(option.value)}
                id={option.value}
                label={option.label}
                checked={option.checked || option.value === currentRadio}
                name={option.name}
              />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

RadioGroup.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

RadioGroup.defaultProps = {
  defaultValue: 'null',
};
