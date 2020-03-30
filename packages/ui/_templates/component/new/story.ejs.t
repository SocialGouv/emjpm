---
to: packages/<%=package%>/src/<%= h.inflection.camelize(name) %>/index.stories.jsx
---
import React from 'react';

import { <%= h.inflection.camelize(name) %> } from '.';

export default {
  component: <%= h.inflection.camelize(name) %>,
  title: '<%= h.inflection.camelize(package) %> | <%= h.inflection.camelize(name) %>',
};

export const <%= h.inflection.camelize(name) %>Story = () => <<%= h.inflection.camelize(name) %> />;
