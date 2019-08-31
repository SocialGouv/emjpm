import React from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { Box, Text } from "rebass";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 }
];
const COLORS = ["#3174D6", "#D6317D", "#D29E10"];

const textStyle = {
  fontFamily: "heading",
  fontWeight: "600",
  textAlign: "center"
};

const numberStyle = {
  pt: 2,
  fontSize: 5,
  fontFamily: "heading",
  fontWeight: "600",
  textAlign: "center"
};

const percentStyle = {
  pt: 1,
  fontSize: 3,
  fontFamily: "heading",
  fontWeight: "600",
  textAlign: "center"
};

const pieTextStyle = {
  fontSize: 4,
  fontWeight: "600",
  fontFamily: "heading",
  position: "absolute",
  width: "100px",
  textAlign: "center",
  left: "50%",
  top: "50%",
  ml: "-50px",
  mt: "-20px"
};

const legendStyle = {
  fontSize: 1
};

const MandatairesActivityChart = () => {
  return (
    <Box>
      <Box sx={{ position: "relative", width: "100%", height: 300, mt: "2" }}>
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
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)"]
        }}
      >
        <Box>
          <Text color="#3174D6" sx={textStyle}>
            SERVICES MANDATAIRES
          </Text>
          <Text sx={numberStyle}>6700</Text>
          <Text sx={percentStyle}>23,9 %</Text>
        </Box>
        <Box>
          <Text color="#D6317D" sx={textStyle}>
            MANDATAIRES INDIVIDUELS
          </Text>
          <Text sx={numberStyle}>5000</Text>
          <Text sx={percentStyle}>23,9 %</Text>
        </Box>
        <Box>
          <Text color="#D29E10" sx={textStyle}>
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
