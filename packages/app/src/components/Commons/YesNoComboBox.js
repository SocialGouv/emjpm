import { Label, Radio } from "@rebass/forms";
import React from "react";
import { Flex } from "rebass";

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
        Non
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
        Oui
      </Label>
    </Flex>
  );
};

export default YesNoComboBox;
