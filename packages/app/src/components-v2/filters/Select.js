import React from "react";
import ReactSelect from "react-select";
import { useThemeUI } from "theme-ui";

const getBorderColor = (state, colors) => {
  if (state.isDisabled) return colors.muted;
  if (state.isFocused) return colors.primary;
  return colors.border;
};

const selectStyles = () => {
  const context = useThemeUI();
  const { fontSizes, fonts, colors } = context.theme;

  return {
    control: (provided, state) => {
      const currentBorderColor = getBorderColor(state, colors);
      return {
        ...provided,
        fontFamily: fonts.body,
        minHeight: "44px",
        boxShadow: "0",
        fontSize: fontSizes[1],
        padding: "0 2px",
        borderColor: currentBorderColor,
        "&:hover": {
          borderColor: state.isFocused ? colors.primary : colors.border
        }
      };
    }
  };
};

export const Select = props => {
  return <ReactSelect {...props} styles={selectStyles()} />;
};
