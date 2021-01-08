import { withRouter } from "react-router-dom";
import { Link as RebassLink } from "rebass";

import { Link as RouterLink } from "~/components/Link";

const LinkButtonStyle = (isActive, props) => {
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
    cursor: "pointer",
    display: "inline-block",
    fontSize: 1,
    fontWeight: 500,
    lineHeight: "1.2",
    opacity: isActive ? (props.disabled ? 0.3 : 0.6) : 1,
    outline: "none",
    px: 3,
    py: 2,
    transition: "150ms ease-in-out opacity",
  };

  if (!props.outline) {
    properties = {
      ...properties,
      "&:active": {
        color: "white",
        opacity: "0.6",
      },
      "&:hover": {
        color: "white",
        opacity: "0.8",
        textDecoration: "none",
      },
    };
  }

  return properties;
};

const LinkButton = ({ location, ...props }) => {
  const isActive = location && location.pathname === props.to;
  // eslint-disable-next-line no-unused-vars
  const { bg, color, ...attr } = props;

  return (
    <RouterLink
      to={props.disabled ? "" : props.to}
      component={({ navigate }) => (
        <RebassLink
          {...attr}
          sx={LinkButtonStyle(isActive, props)}
          onClick={() => props.disabled || navigate(props.to)}
        >
          {props.children}
        </RebassLink>
      )}
    />
  );
};

export default withRouter(LinkButton);
