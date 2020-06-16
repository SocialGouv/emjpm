import { presetEmjpm } from "@emjpm/ui";
import { render as rtlRender } from "@testing-library/react";
import PropTypes from "prop-types";
import React from "react";
import { ThemeProvider } from "theme-ui";

function render(ui, { ...options } = {}) {
  function Wrapper({ children }) {
    return <ThemeProvider theme={presetEmjpm}>{children}</ThemeProvider>;
  }
  Wrapper.propTypes = {
    children: PropTypes.node,
  };

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { render };
