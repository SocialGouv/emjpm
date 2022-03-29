import React, { forwardRef } from "react";
import { Button } from "~/components";
import { CalendarAlt } from "@styled-icons/fa-regular/CalendarAlt";

const InputButton = forwardRef(({ value, onClick, readOnly }, ref) => {
  return (
    <Button
      variant={readOnly ? "outline" : "primary"}
      width="40px"
      onClick={onClick}
      ref={ref}
      sx={{
        padding: "0.5rem",
        margiLeft: "0.5rem",
        marginLeft: "-43px",
        marginBottom: "8px",
      }}
      aria-label={`Sélectionnez une date${
        value ? `. la date sélectionnée est ${value}` : ""
      }`}
      title={`Sélectionnez une date${
        value ? `. la date sélectionnée est ${value}` : ""
      }`}
    >
      <CalendarAlt
        width="25"
        height="25"
        color={readOnly ? "gray" : "primary"}
        aria-hidden="true"
        focusable="false"
        role="img"
      />
    </Button>
  );
});

export default InputButton;
