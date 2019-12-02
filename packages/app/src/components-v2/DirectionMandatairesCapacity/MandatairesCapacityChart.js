import React from "react";
import { Box, Flex, Text } from "rebass";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  {
    "Disponibilité actuelle": 800,
    "Disponibilité max": 590,
    name: "Page A",
    overcapacity: true
  },
  {
    "Disponibilité actuelle": 967,
    "Disponibilité max": 868,
    name: "Page B",
    overcapacity: true
  },
  {
    "Disponibilité actuelle": 1098,
    "Disponibilité max": 1397,
    name: "Page C",
    overcapacity: true
  },
  {
    "Disponibilité actuelle": 1200,
    "Disponibilité max": 1480,
    name: "Page D",
    overcapacity: false
  },
  {
    "Disponibilité actuelle": 1108,
    "Disponibilité max": 1520,
    name: "Page E",
    overcapacity: false
  },
  {
    "Disponibilité actuelle": 680,
    "Disponibilité max": 1400,
    name: "Page F",
    overcapacity: true
  },
  {
    "Disponibilité actuelle": 1098,
    "Disponibilité max": 1397,
    name: "Page C",
    overcapacity: false
  },
  {
    "Disponibilité actuelle": 1200,
    "Disponibilité max": 1480,
    name: "Page D",
    overcapacity: true
  },
  {
    "Disponibilité actuelle": 1108,
    "Disponibilité max": 1520,
    name: "Page E",
    overcapacity: false
  },
  {
    "Disponibilité actuelle": 680,
    "Disponibilité max": 1400,
    name: "Page F",
    overcapacity: true
  }
];

const MandatairesCapacityChart = () => {
  return (
    <Box>
      <Box sx={{ height: [300, 300, 400], position: "relative", width: "100%" }}>
        <ResponsiveContainer>
          <ComposedChart
            layout="vertical"
            width={500}
            height={400}
            data={data}
            margin={{
              bottom: 20,
              left: 0,
              right: 0,
              top: 20
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" hide={true} />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="Disponibilité max" stackId="a" barSize={10} fill="#3174D6" />
            <Bar dataKey="Disponibilité actuelle" stackId="a" barSize={10} fill="#D63C31">
              {data.map((entry, index) => {
                return (
                  <Cell key={`cell-${index}`} fill={entry.overcapacity ? "#D63C31" : "#70D54F"} />
                );
              })}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"],
          ml: "6"
        }}
      >
        <Box>
          <Flex mt="2" mb="7px">
            <Box bg="#3174D6" flexBasis="30px" maxWidth="30px" flexGrow="1" height="10px" />
            <Text ml="1" fontSize="10px">
              CAPACITÉ DES MANDATAIRES
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex mt="2" mb="7px">
            <Box bg="#D63C31" flexBasis="30px" maxWidth="30px" flexGrow="1" height="10px" />
            <Text ml="1" fontSize="10px">
              MANDATAIRES EN SURCAPACITÉ
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex mt="2" mb="7px">
            <Box bg="#70D54F" flexBasis="30px" maxWidth="30px" flexGrow="1" height="10px" />
            <Text ml="1" fontSize="10px">
              MANDATAIRES DISPONIBILITE
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export { MandatairesCapacityChart };
