import React from "react";
import Select, { components } from "react-select";
import styled from "@emotion/styled";

import { ReactComponent as MultiValueClearSvg } from "./clearIndicator.svg";
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

const ClearIndicator = (props) => {
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
};

export default function AccessibleSelect(props) {
  const ClearIndicatorStyles = (base, state) => ({
    ...base,
    cursor: "pointer",
    color: state.isFocused ? "blue" : "black",
  });

  const multiValueRemoveStyle = (base, state) => ({
    ...base,
    cursor: "pointer",
  });

  const MultiValueRemove = (props) => {
    return (
      <components.MultiValueRemove
        {...props}
        innerProps={{
          ...props.innerProps,
          "aria-label": `Supprimer ${props.data.label}`,
          "aria-pressed": false,
        }}
        style={{ cursor: "pointer" }}
      >
        <MultiValueClearSvg
          aria-label={`Supprimer ${props.data.label}`}
          role="img"
          width="14"
        />
      </components.MultiValueRemove>
    );
  };
  return (
    <div>
      <Select
        options={props?.options || []}
        components={{ MultiValueRemove, ClearIndicator }}
        styles={{
          clearIndicator: ClearIndicatorStyles,
          multiValueRemove: multiValueRemoveStyle,
        }}
        {...props}
      />
    </div>
  );
}
