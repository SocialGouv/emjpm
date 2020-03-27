import { Button } from '@socialgouv/emjpm-ui-core';
import PropTypes from 'prop-types';
import React from 'react';

export const Link = (props) => {
  const { href, children } = props;
  return <Button href={href}>{children}</Button>;
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};
