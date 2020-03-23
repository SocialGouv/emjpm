import React, { useState } from 'react';

import { CheckBox } from '.';

export default {
  component: CheckBox,
  title: 'Core |Checkbox',
};

export const TextStory = () => {
  const [isToogleChecked, toogleCheck] = useState(true);
  return (
    <CheckBox
      label="label"
      isChecked={isToogleChecked}
      onChange={() => {
        toogleCheck(!isToogleChecked);
      }}
      name="test"
    />
  );
};
