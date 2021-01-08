import { Label, Radio } from "@rebass/forms";

import { Box, Flex } from "rebass";

const FieldValue = ({ isChecked, readOnly }) => ({
  color: readOnly && !isChecked ? "#999" : "inherit",
});

export const YesNoComboBox = (props) => {
  const { onChange = () => {}, name = "", value, readOnly } = props;
  return (
    <Flex width={1 / 2}>
      <Label alignItems="center" width={[1 / 2]} p={2}>
        <Radio
          id={name}
          name={name}
          value="false"
          readOnly={readOnly}
          disabled={readOnly}
          checked={value === false}
          onChange={() => {
            if (!readOnly) {
              onChange(false);
            }
          }}
        />
        <Box sx={FieldValue({ isChecked: value === false, readOnly })}>Non</Box>
      </Label>
      <Label alignItems="center" width={[1 / 2]} p={2}>
        <Radio
          id={name}
          name={name}
          value="true"
          readOnly={readOnly}
          disabled={readOnly}
          checked={value === true}
          onChange={() => {
            if (!readOnly) {
              onChange(true);
            }
          }}
        />
        <Box sx={FieldValue({ isChecked: value === true, readOnly })}>Oui</Box>
      </Label>
    </Flex>
  );
};

export default YesNoComboBox;
