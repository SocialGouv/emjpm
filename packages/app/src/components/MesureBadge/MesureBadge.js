import React from "react";
import { Box } from "rebass";

const MesureBadge = ({ mesures_en_cours, dispo_max }) => {
  return (
    <Box
      sx={{
        color: "white",
        bg: mesures_en_cours > dispo_max ? "error" : "primary",
        px: 1,
        mb: 2,
        borderRadius: 9999,
      }}
    >
      {mesures_en_cours} / {dispo_max}
    </Box>
  );
};

export { MesureBadge };
