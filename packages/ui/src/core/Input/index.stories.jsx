import React from 'react';

import { Input } from '.';

export default {
  component: Input,
  title: 'Core |Input',
};

export const InputStory = () => <Input name="test" placeholder="Placeholder" />;

export const InputStoryValid = () => <Input name="test2" isValid placeholder="Placeholder" />;

export const InputStoryError = () => <Input name="test2" hasError placeholder="Placeholder" />;

export const InputStorySmall = () => <Input size="small" name="test2" placeholder="Placeholder" />;

export const InputStoryDate = () => <Input type="date" value="2019-01-01" name="test2" placeholder="Placeholder" />;
