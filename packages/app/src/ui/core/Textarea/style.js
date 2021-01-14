const LINE_COUNT = 3;

function getColorFromProps(props, theme) {
  if (props.error) {
    return theme.colors.error;
  }

  if (props.isFocused) {
    return theme.colors.primary;
  }

  return theme.colors.text;
}

function getBorderColorFromProps(props, theme) {
  if (props.error) {
    return theme.colors.error;
  }

  if (props.isFocused) {
    return theme.colors.primary;
  }

  return theme.colors.border;
}

export const labelStyle = (props, theme) => ({
  color: getColorFromProps(props, theme),
  display: "block",
  fontSize: 12,
  mb: 8,
});

export const textareaStyle = (props, theme) => ({
  bg: "transparent",
  border: `1px solid ${getBorderColorFromProps(props, theme)}`,
  borderRadius: "default",
  boxShadow: "none",
  color: "text",
  fontSize: 1,
  fontWeight: "500",
  height: 32 * LINE_COUNT,
  outline: "none",
  pb: 1,
  position: "relative",
  px: 2,
  transition: "150ms ease-in-out all",
  width: "100%",
});
