import React from "react";
import { BarChart, Bar, ResponsiveContainer, Cell, Tooltip, XAxis } from "recharts";
import { Box, Text, Flex } from "rebass";

import { textStyle } from "../MandatairesActivity/style";

const COLORS = ["#3174D6", "#D6317D", "#D29E10"];
const data = [
  {
    name: "SERVICES MANDATAIRES",
    "Disponibilité max": 4000,
    "Disponibilité actuelle": 4500
  },
  {
    name: "MANDATAIRES INDIVIDUELS",
    "Disponibilité max": 3000,
    "Disponibilité actuelle": 1398
  },
  {
    name: "PRÉPOSÉS D’ÉTABLISSEMENTS",
    "Disponibilité max": 2000,
    "Disponibilité actuelle": 2300
  }
];

const MandatairesDisponibilityChart = () => {
  return (
    <Box>
      <Box sx={{ position: "relative", width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 20
            }}
          >
            <XAxis hide="true" dataKey="name" />
            <Tooltip />
            <Bar dataKey="Disponibilité max" stackId="a" fill="#3174D6">
              {data.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={COLORS[index]} />;
              })}
            </Bar>
            <Bar dataKey="Disponibilité actuelle" stackId="b">
              {data.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry["Disponibilité actuelle"] > entry["Disponibilité max"]
                        ? "#D63C31"
                        : "#70D54F"
                    }
                  />
                );
              })}
            </Bar>
          </BarChart>
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
        </Box>
        <Box>
          <Text color={COLORS[1]} sx={textStyle}>
            MANDATAIRES INDIVIDUELS
          </Text>
        </Box>
        <Box>
          <Text color={COLORS[2]} sx={textStyle}>
            PRÉPOSÉS D’ÉTABLISSEMENTS
          </Text>
        </Box>
      </Box>
      <Box
        sx={{
          mt: "1",
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]
        }}
      >
        <Box>
          <Flex mt="6" mb="7px">
            <Box bg="#D63C31" flexBasis="30px" flexGrow="1" height="10px" />
            <Text ml="1" fontSize="10px">
              SURCAPACITÉ DES MANDATAIRES
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex mt="6" mb="7px">
            <Box bg="#70D54F" flexBasis="30px" flexGrow="1" height="10px" />
            <Text ml="1" fontSize="10px">
              DISPONIBILITÉ DES MANDATAIRES
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export { MandatairesDisponibilityChart };
