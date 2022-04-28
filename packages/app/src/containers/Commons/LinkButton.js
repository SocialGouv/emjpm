import { withRouter } from "react-router-dom";
import { Link as RebassLink } from "rebass";

import { Link as RouterLink } from "~/components/Link";

function LinkButtonStyle(isActive, props) {
  const initialColor = props.color || "white";
  const initialBg = props.bg || "primary";

  const bg = props.outline ? initialColor : initialBg;
  const color = props.outline ? initialBg : initialColor;

  let properties = {
    ...props.sx,
    bg,
    border: props.outline ? "1px solid" : "",
    borderColor: props.outline ? color : "",
    borderRadius: "default",
    color,
    cursor: props.disabled || isActive ? "not-allowed" : "pointer",
    display: "inline-block",
    fontSize: 1,
    fontWeight: 500,
    lineHeight: "1.2",

    backgroundColor:
      !props.outline && (props.disabled || isActive) ? "#555555" : "",

    outline: "none",
    px: 3,
    py: 2,
    transition: "150ms ease-in-out opacity",
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 0 3px rgba(21, 156, 228, 0.4) ",
    },
    "&:active": {
      // color: "white",
      opacity: "0.6",
    },
    "&:hover": {
      // color: "white",
      opacity: "0.8",
      textDecoration: "none",
    },
  };

  if (!props.outline) {
    properties = {
      ...properties,
      ...(props.disabled
        ? {}
        : {
            "&:active": {
              color: "white",
              opacity: "0.6",
            },
            "&:hover": {
              color: "white",
              opacity: "0.8",
              textDecoration: "none",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0 3px rgba(21, 156, 228, 0.4) !important",
            },
          }),
    };
  }

  return properties;
}

function LinkButton({ location, ...props }) {
  const isActive = location && location.pathname === props.to;
  // eslint-disable-next-line no-unused-vars
  const { bg, color, ...attr } = props;

  return (
    <RouterLink
      to={props.disabled ? "" : props.to}
      component={({ navigate }) => (
        <RebassLink
          {...attr}
          href={props.disabled ? "" : props.to}
          sx={LinkButtonStyle(isActive, props)}
          onClick={(e) => {
            if (props.disabled) {
              return;
            }
            if (e.ctrlKey) {
              return;
            }
            e.preventDefault();
            navigate(props.to);
          }}
        >
          {props.children}
        </RebassLink>
      )}
    />
  );
}

export default withRouter(LinkButton);
