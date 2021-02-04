import { useThemeUI } from "theme-ui";

function getBorderColor(hasError, state, colors) {
  if (hasError) {
    return colors.error;
  }
  if (state.isDisabled) return colors.muted;
  if (state.isFocused) return colors.primary;
  return colors.border;
}

function getHoverBorderColor(hasError, state, colors) {
  if (hasError) {
    return colors.error;
  }
  return state.isFocused ? colors.primary : colors.border;
}

export function LabelStyle({ required, readOnly, size }) {
  return {
    "&:after":
      required && !readOnly
        ? {
            color: "#db4949",
            content: "'  *'",
          }
        : {},
    color: () => {
      return "primary";
    },
    fontSize: () => {
      return size === "small" ? "10px" : "0";
    },
    fontWeight: "600",
    position: "absolute",
    marginTop: "-6px",
    marginLeft: "2px",
    pt: "6px",
    px: "2",
    transition: "150ms ease-in-out all",
    width: "100%",
    zIndex: 1,
  };
}

export function getStyle(props) {
  const { size, hasError = false } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useThemeUI();
  const { fontSizes, fonts, colors } = context.theme;

  return {
    menuPortal: (provided, state) => {
      return {
        ...provided,
        zIndex: 99999,
      };
    },
    input: (provided, state) => {
      const { isMulti } = props;
      const style = {
        ...provided,
      };
      if (!isMulti) {
        Object.assign(style, {
          "& > div": {
            width: "100%",
          },
          "& > div > input": {
            width: "100% !important",
          },
          width: "100%",
        });
      }
      return style;
    },
    control: (provided, state) => {
      const currentBorderColor = getBorderColor(hasError, state, colors);
      return {
        ...provided,
        "&:hover": {
          borderColor: getHoverBorderColor(hasError, state, colors),
        },
        borderColor: currentBorderColor,
        boxShadow: "0",
        fontFamily: fonts.body,
        fontSize: fontSizes[1],
        minHeight: size === "small" ? "44px" : "54px",
        padding: "0 2px",
      };
    },
  };
}
