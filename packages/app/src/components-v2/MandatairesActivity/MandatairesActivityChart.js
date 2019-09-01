import React from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { Box, Text } from "rebass";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 }
];

const COLORS = ["#3174D6", "#D6317D", "#D29E10"];
import { textStyle, numberStyle, percentStyle, pieTextStyle, legendStyle } from "./style";

const MandatairesActivityChart = () => {
  return (
    <Box>
      <Box sx={{ position: "relative", width: "100%", height: 300 }}>
        <Text sx={pieTextStyle}>
          11304
          <Text sx={legendStyle}>mesures</Text>
        </Text>
        <ResponsiveContainer>
          <PieChart onMouseEnter={data => console.log(data)}>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          mt: "1",
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"]
        }}
      >
        <Box>
          <Text color={COLORS[0]} sx={textStyle}>
            SERVICES MANDATAIRES
          </Text>
          <Text sx={numberStyle}>6700</Text>
          <Text sx={percentStyle}>23,9 %</Text>
        </Box>
        <Box>
          <Text color={COLORS[1]} sx={textStyle}>
            MANDATAIRES INDIVIDUELS
          </Text>
          <Text sx={numberStyle}>5000</Text>
          <Text sx={percentStyle}>23,9 %</Text>
        </Box>
        <Box>
          <Text color={COLORS[2]} sx={textStyle}>
            PRÉPOSÉS D’ÉTABLISSEMENTS
          </Text>
          <Text sx={numberStyle}>4200</Text>
          <Text sx={percentStyle}>23,9 %</Text>
        </Box>
      </Box>
    </Box>
  );
};

export { MandatairesActivityChart };
