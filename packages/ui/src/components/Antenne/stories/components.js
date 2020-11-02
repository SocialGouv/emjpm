import PropTypes from "prop-types";
import React from "react";

import { Button } from "../../../core";

export const Link = (props) => {
  const { href, children } = props;
  return <Button href={href}>{children}</Button>;
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};
