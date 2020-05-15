import React, { Fragment } from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { ThemeProvider } from 'theme-ui';
import { presetEmjpm } from '../src/preset';
import 'storybook-chromatic';
import { Global, css } from '@emotion/core';
import { GlobalStyle } from '../src/globalStyle';

const ThemeDecorator = (storyFn) => {
  return (
    <Fragment>
      <GlobalStyle />
      <Global
        styles={css`
          body,
          html,
          div#__next {
            font-family: 'Open Sans', sans-serif;
            background: #f2f5f9;
            -webkit-font-smoothing: antialiased;
          }
        `}
      />
      <ThemeProvider theme={presetEmjpm}>{storyFn()}</ThemeProvider>
    </Fragment>
  );
};

addDecorator(withA11y);
addDecorator(ThemeDecorator);

configure(require.context('../src', true, /\.stories\.(jsx|mdx)$/), module);
