import React from "react";
import { Box } from "rebass";
import { Card, Heading2 } from "@socialgouv/emjpm-ui-core";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const MesureAllocationChart = props => {
  const { mesures } = props;
  return (
    <Card p="4">
      <Heading2>Répartition des mesures à date</Heading2>
      <Box sx={{ width: "100%", height: 453, mt: "2" }}>
        <ResponsiveContainer>
          <ComposedChart
            layout="vertical"
            data={mesures}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 25
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="nombre de mesures" barSize={24} fill="#0D31B2" />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export { MesureAllocationChart };
