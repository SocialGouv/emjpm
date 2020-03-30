import React from 'react';

import { Spinner } from '.';

export default {
  component: Spinner,
  title: 'Core |Spinner',
};

export const SpinnerStory = () => <Spinner />;

export const SpinnerStoryLight = () => <Spinner variant="bgLight" />;

export const SpinnerStoryPrimary = () => <Spinner variant="bgDark" />;
