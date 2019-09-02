import React from "react";
import { ResponsiveContainer } from "recharts";
import { Box } from "rebass";

const MandatairesCapacityChart = () => {
  return (
    <Box>
      <Box sx={{ position: "relative", width: "100%", height: 300 }}>
        <ResponsiveContainer />
      </Box>
    </Box>
  );
};

export { MandatairesCapacityChart };
