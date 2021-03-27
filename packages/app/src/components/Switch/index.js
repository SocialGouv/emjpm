import PropTypes from "prop-types";

import { Box, Flex, Text } from "rebass";
import { Label, Switch as RebassSwitch } from "@rebass/forms";

import { SwitchInputStyle, SwitchWrapperStyle } from "./style";

function Switch(props) {
  const { label, name, isChecked, onChange } = props;
  return (
    <Box sx={SwitchWrapperStyle}>
      <Box htmlFor={name} as="label">
        <Box
          sx={SwitchInputStyle()}
          onChange={() => onChange()}
          as="input"
          name={name}
          id={name}
          checked={isChecked}
          type="checkbox"
        />
        <Flex>
          <Label>
            <RebassSwitch checked={isChecked} onClick={onChange} />
          </Label>
          <Text lineHeight="20px">{label}</Text>
        </Flex>
      </Box>
    </Box>
  );
}

Switch.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Switch;
