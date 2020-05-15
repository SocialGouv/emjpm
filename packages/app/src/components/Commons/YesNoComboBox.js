import { Label, Radio } from "@rebass/forms";
import React from "react";
import { Flex } from "rebass";

// TODO: create a generic component and move it into ui folder

export const YesNoComboBox = props => {
  const { onChange = () => {}, name = "", defaultValue = false } = props;
  return (
    <Flex width={1 / 2}>
      <Label alignItems="center" width={[1 / 2]} p={2}>
        <Radio
          id={name}
          name={name}
          value="false"
          defaultChecked={defaultValue === false}
          onChange={() => onChange(false)}
        />
        Non
      </Label>
      <Label alignItems="center" width={[1 / 2]} p={2}>
        <Radio
          id={name}
          name={name}
          value="true"
          defaultChecked={defaultValue === true}
          onChange={() => onChange(true)}
        />
        Oui
      </Label>
    </Flex>
  );
};

export default YesNoComboBox;
