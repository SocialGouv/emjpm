import React, { Fragment, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Select } from "@socialgouv/emjpm-ui-core";
import { Box } from "rebass";

const months = {
  0: "JAN",
  1: "FEV",
  2: "MAR",
  3: "AVR",
  4: "MAI",
  5: "JUI",
  6: "JUI",
  7: "AOU",
  8: "SEP",
  9: "OCT",
  10: "NOV",
  11: "DEC"
};

const getEvolution = data => {
  const evolutionDatas = [];
  const evolutionFilters = [];
  data.map((type, index) => {
    evolutionFilters[index] = {
      value: type.mesureTypeCategory,
      label: type.mesureTypeCategory
    };
    type.monthlyEvolutions.map((monthlyEvolution, index) => {
      evolutionDatas[index] = {
        ...evolutionDatas[index],
        [type.mesureTypeCategory]: monthlyEvolution.number,
        TOTAL: evolutionDatas[index]
          ? evolutionDatas[index].TOTAL + monthlyEvolution.number
          : monthlyEvolution.number,
        month: months[monthlyEvolution.month]
      };
    });
  });
  evolutionFilters.push({
    value: "TOTAL",
    label: "TOTAL"
  });
  return { evolutionDatas, evolutionFilters };
};

const MesureEvolutionChart = props => {
  const [selectedMesures, setMesures] = useState([]);
  const { data } = props;

  const { evolutionDatas, evolutionFilters } = getEvolution(data.mesureTypeCategoryEvolution);

  const selectMesures = selectedOptions => {
    if (selectedOptions) {
      const active = selectedOptions.map(option => {
        return option.label;
      });
      setMesures(active);
    } else {
      setMesures([]);
    }
  };

  return (
    <Fragment>
      <Box width={["100%", "50%"]} mt="4">
        <Select
          isMulti={true}
          options={evolutionFilters}
          placeholder={"Affiner par type de mesures"}
          onChange={selectedOptions => selectMesures(selectedOptions)}
        />
      </Box>
      <Box sx={{ width: "100%", height: 450 }}>
        <ResponsiveContainer>
          <LineChart data={evolutionDatas} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Legend />
            {(selectedMesures.includes("TOTAL") || selectedMesures.length === 0) && (
              <Line type="monotone" dot={false} strokeWidth={2} dataKey="TOTAL" stroke="red" />
            )}
            {(selectedMesures.includes("CURATELLE_RENFORCEE") || selectedMesures.length === 0) && (
              <Line type="monotone" dot={false} dataKey="CURATELLE_RENFORCEE" stroke="#00977B" />
            )}
            {(selectedMesures.includes("CURATELLE_SIMPLE") || selectedMesures.length === 0) && (
              <Line type="monotone" dot={false} dataKey="CURATELLE_SIMPLE" stroke="#E46137" />
            )}
            {(selectedMesures.includes("OTHER") || selectedMesures.length === 0) && (
              <Line type="monotone" dot={false} dataKey="OTHER" stroke="#CEA914" />
            )}
            {(selectedMesures.includes("SAUVEGARDE_JUSTICE") || selectedMesures.length === 0) && (
              <Line type="monotone" dot={false} dataKey="SAUVEGARDE_JUSTICE" stroke="#362983" />
            )}
            {(selectedMesures.includes("TUTELLE") || selectedMesures.length === 0) && (
              <Line type="monotone" dot={false} dataKey="TUTELLE" stroke="#9C0E68" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Fragment>
  );
};

export { MesureEvolutionChart };
