import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts";
import { Box, Text, Flex } from "rebass";

const data = [
  {
    name: "Page A",
    "Disponibilité max": 590,
    "Disponibilité actuelle": 800,
    overcapacity: true
  },
  {
    name: "Page B",
    "Disponibilité max": 868,
    "Disponibilité actuelle": 967,
    overcapacity: true
  },
  {
    name: "Page C",
    "Disponibilité max": 1397,
    "Disponibilité actuelle": 1098,
    overcapacity: true
  },
  {
    name: "Page D",
    "Disponibilité max": 1480,
    "Disponibilité actuelle": 1200,
    overcapacity: false
  },
  {
    name: "Page E",
    "Disponibilité max": 1520,
    "Disponibilité actuelle": 1108,
    overcapacity: false
  },
  {
    name: "Page F",
    "Disponibilité max": 1400,
    "Disponibilité actuelle": 680,
    overcapacity: true
  },
  {
    name: "Page C",
    "Disponibilité max": 1397,
    "Disponibilité actuelle": 1098,
    overcapacity: false
  },
  {
    name: "Page D",
    "Disponibilité max": 1480,
    "Disponibilité actuelle": 1200,
    overcapacity: true
  },
  {
    name: "Page E",
    "Disponibilité max": 1520,
    "Disponibilité actuelle": 1108,
    overcapacity: false
  },
  {
    name: "Page F",
    "Disponibilité max": 1400,
    "Disponibilité actuelle": 680,
    overcapacity: true
  }
];

const MandatairesCapacityChart = () => {
  return (
    <Box>
      <Box sx={{ position: "relative", width: "100%", height: [300, 300, 400] }}>
        <ResponsiveContainer>
          <ComposedChart
            layout="vertical"
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 0,
              bottom: 20,
              left: 0
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
          ml: "6",
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"]
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
