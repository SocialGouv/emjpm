import React, { forwardRef } from "react";
import { Button } from "~/components";
import { CalendarAlt } from "@styled-icons/fa-regular/CalendarAlt";

const InputButton = forwardRef(({ value, onClick }, ref) => {
  return (
    <Button
      onClick={onClick}
      ref={ref}
      sx={{ padding: "0.5rem", margiLeft: "0.5rem" }}
      aria-label={`Sélectionnez une date${
        value ? ` la date sélectionnée est ${value}` : ""
      }`}
    >
      <CalendarAlt
        width="25"
        height="25"
        color="primary"
        aria-hidden="true"
        focusable="false"
        role="img"
      />
    </Button>
  );
});

export default InputButton;
