import React from "react";

export default {
  h1: function h1({ children, ...props }) {
    return (
      <h1 className="mdx-h1" {...props}>
        {children}
      </h1>
    );
  },
  h2: function h2({ children, ...props }) {
    return (
      <h2 className="mdx-h2" {...props}>
        {children}
      </h2>
    );
  },
  h3: function h3({ children, ...props }) {
    return (
      <h3 className="mdx-h3" {...props}>
        {children}
      </h3>
    );
  },
  h4: function h4({ children, ...props }) {
    return (
      <h4 className="mdx-h4" {...props}>
        {children}
      </h4>
    );
  },
  h5: function h5({ children, ...props }) {
    return (
      <h5 className="mdx-h5" {...props}>
        {children}
      </h5>
    );
  },
  ul: function ul({ children, ...props }) {
    const childrenList = [];
    React.Children.forEach(children, (child) => {
      childrenList.push(<li className="mdx-li">{child.props.children}</li>);
    });
    return <ul className="mdx-ul">{childrenList}</ul>;
  },
  p: function p({ children, ...props }) {
    return (
      <p className="mdx-p" {...props}>
        {children}
      </p>
    );
  },
};
