/* eslint-disable jsx-a11y/no-autofocus */
import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { FocusScope } from "@react-aria/focus";

import { SrOnly } from "~/components";

/**
 * Component that implements aria-disclosure design pattern.
 */
export default function AccessbleDialog({
  dialogLabelText,
  onEscFunction,
  children,
}) {
  const escFunction = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onEscFunction();
      }
    },
    [onEscFunction]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <FocusScope contain autoFocus restoreFocus>
      <div role="dialog" aria-labelledby="dialogTitle" aria-modal="true">
        <SrOnly id="dialogTitle">{dialogLabelText}</SrOnly>
        {children}
      </div>
    </FocusScope>
  );
}

AccessbleDialog.propTypes = {
  children: PropTypes.node.isRequired,
  dialogLabelText: PropTypes.string.isRequired,
  onEscFunction: PropTypes.func.isRequired,
};
