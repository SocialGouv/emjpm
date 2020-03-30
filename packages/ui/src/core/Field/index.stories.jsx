import React from 'react';
import { Box } from "rebass";

import { Input } from '../Input';
import { Select } from '../Select';
import { Field } from '.';

const options = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Vanilla', value: 'vanilla' },
];

export default {
  component: Field,
  title: 'Core | Field',
};

export const FieldStory = () => (
  <Box p={4}>
    <Field>
      <Select
        options={options}
        // value={}
        // onChange={(selectedOption) => changeValue(selectedOption)}
      />
    </Field>
    <Field>
      <Input name="test2" placeholder="Placeholder 2" />
    </Field>
  </Box>
);
