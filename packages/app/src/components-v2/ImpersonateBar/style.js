const ImpersonateBarStyle = impersonate => {
  if (!impersonate) {
    return {
      display: "none"
    };
  }
  return {
    bg: "warning"
  };
};

export { ImpersonateBarStyle };
