import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as ClearIndicatorSvg } from "./multiValueClear.svg";

const StyledClearIndicatorSvg = styled(ClearIndicatorSvg)`
  &:hover {
    fill: hsl(0, 0%, 60%);
  }
`;

const CustomClearText = () => (
  <button
    aria-label="Supprimer tous les éléments"
    style={{
      background: "none",
      color: "inherit",
      border: "none",
      padding: 0,
      font: "inherit",
      cursor: "pointer",
      outline: "inherit",
      color: "hsl(0, 0%, 80%)",
    }}
  >
    <StyledClearIndicatorSvg
      role="img"
      aria-label="Supprimer tous les éléments"
      width="20"
      height="20"
      fill="hsl(0, 0%, 80%)"
    />
  </button>
);

export default function ClearIndicator(props) {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles("clearIndicator", props)}
    >
      <div style={{ padding: "0px 5px" }}>{children}</div>
    </div>
  );
}
