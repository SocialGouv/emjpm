import React from 'react';

import { Logo } from '.';

export default {
  component: Logo,
  title: 'Core | Logo',
};

export const LogoStory = () => <Logo />;

export const LogoCustomStory = () => <Logo title="eMJPM Titre" />;
