import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const getEvolution = data => {
  const array = [];
  data.map(type => {
    type.monthlyEvolutions.map((monthlyEvolution, index) => {
      array[index] = {
        ...array[index],
        ...monthlyEvolution,
        [type.mesureTypeCategory]: monthlyEvolution.number
      };
    });
  });
  return array;
};

const MesureEvolutionChart = props => {
  const { data } = props;

  const evolution = getEvolution(data.mesureTypeCategoryEvolution);

  return (
    <LineChart
      width={950}
      height={400}
      data={evolution}
      margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="month" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dot={false} dataKey="CURATELLE_RENFORCEE" stroke="#00977B" />
      <Line type="monotone" dot={false} dataKey="CURATELLE_SIMPLE" stroke="#E46137" />
      <Line type="monotone" dot={false} dataKey="OTHER" stroke="#CEA914" />
      <Line type="monotone" dot={false} dataKey="SAUVEGARDE_JUSTICE" stroke="#362983" />
      <Line type="monotone" dot={false} dataKey="TUTELLE" stroke="#9C0E68" />
    </LineChart>
  );
};

export { MesureEvolutionChart };
