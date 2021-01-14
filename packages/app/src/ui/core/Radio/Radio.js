import PropTypes from "prop-types";

import { Box, Flex, Text } from "rebass";

import {
  InnerRadioStyle,
  RadioInputStyle,
  RadioStyle,
  RadioWrapperStyle,
} from "./style";

function BaseRadio(props) {
  return (
    <Box sx={RadioStyle(props)}>
      <Box sx={InnerRadioStyle(props)} />
    </Box>
  );
}

export function Radio(props) {
  const { label, id, name, checked, disabled, renderRadioLabel } = props;
  return (
    <Box sx={RadioWrapperStyle}>
      <Box htmlFor={id} as="label">
        <Box
          sx={RadioInputStyle()}
          as="input"
          name={name}
          id={id}
          checked={checked}
          type="Radio"
          {...props}
        />
        <Flex sx={{ opacity: disabled ? 0.5 : 1 }}>
          <BaseRadio disabled={disabled} checked={checked} />
          {renderRadioLabel ? (
            renderRadioLabel(props)
          ) : (
            <Text lineHeight="20px">{label}</Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  renderRadioLabel: PropTypes.func,
};

Radio.defaultProps = {
  disabled: false,
  renderRadioLabel: "null",
};
