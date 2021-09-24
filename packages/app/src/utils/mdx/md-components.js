export default {
  h2: function h2({ children, ...props }) {
    return (
      <h2 style={{ fontSize: "18px", marginTop: "8px" }} {...props}>
        {children}
      </h2>
    );
  },
  h3: function h3({ children, ...props }) {
    return (
      <h3 style={{ fontSize: "16px", marginTop: "5px" }} {...props}>
        {children}
      </h3>
    );
  },
  h4: function h4({ children, ...props }) {
    return (
      <h4 style={{ fontSize: "14px", marginTop: "4px" }} {...props}>
        {children}
      </h4>
    );
  },
};
