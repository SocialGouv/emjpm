import { Box } from "rebass";

const MesureBadge = ({ mesures_en_cours, dispo_max }) => {
  return (
    <Box
      sx={{
        bg: mesures_en_cours > dispo_max ? "error" : "primary",
        borderRadius: 9999,
        color: "white",
        mb: 2,
        px: 1,
      }}
    >
      {mesures_en_cours} / {dispo_max}
    </Box>
  );
};

export { MesureBadge };
