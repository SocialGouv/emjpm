import React from "react";

function LinkWrap({ children, refAs, ...props }, ref) {
  if (refAs) {
    props[refAs] = ref;
  }
  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children, props)
        : null}
    </>
  );
}

export const LinkWrapper = React.forwardRef(LinkWrap);
