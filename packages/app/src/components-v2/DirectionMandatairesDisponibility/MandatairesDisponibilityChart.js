import React from "react";
import { Box, Flex, Text } from "rebass";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { textStyle } from "../DirectionMandatairesActivity/style";

const COLORS = ["#3174D6", "#D6317D", "#D29E10"];

const MandatairesDisponibilityChart = ({ data }) => {
  return (
    <Box>
      <Box sx={{ height: [300, 313, 300], position: "relative", width: "100%" }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              bottom: 20,
              left: 0,
              right: 0,
              top: 20
            }}
          >
            <Tooltip cursor={{ fill: "#F1F5F9" }} />
            <XAxis dataKey="name" hide={true} />
            <Bar barSize={40} dataKey="Disponibilité max" stackId="a">
              {data.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill="#3174D6" />;
              })}
            </Bar>
            <Bar barSize={40} dataKey="Disponibilité actuelle" stackId="a">
              {data.map((entry, index) => {
                return (
                  <Cell key={`cell-${index}`} fill={entry.overcapacity ? "#D63C31" : "#70D54F"} />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"],
          mt: "1"
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
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"],
          mt: "1"
        }}
      >
        <Box>
          <Flex mt="5" mb="7px">
            <Box bg="#3174D6" flexBasis="30px" maxWidth="30px" flexGrow="1" height="10px" />
            <Text ml="1" fontSize="10px">
              CAPACITÉ DES MANDATAIRES
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex mt="5" mb="7px">
            <Box bg="#D63C31" flexBasis="30px" maxWidth="30px" flexGrow="1" height="10px" />
            <Text ml="1" fontSize="10px">
              MANDATAIRES EN SURCAPACITÉ
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex mt="5" mb="7px">
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

export { MandatairesDisponibilityChart };
