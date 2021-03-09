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
    fontSize: "11px",
    position: "absolute",
    marginTop: "-6px",
    marginLeft: "4px",
    alignSelf: "flex-start",
    pt: "6px",
    px: "2",
    transition: "150ms ease-in-out all",
    width: "100%",
    zIndex: 1,
  };
}
