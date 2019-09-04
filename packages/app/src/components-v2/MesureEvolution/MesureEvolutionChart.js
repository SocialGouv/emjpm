import { Select } from "@socialgouv/emjpm-ui-core";
import React, { Fragment, useState } from "react";
import { Box } from "rebass";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  getMesureCategoryTypeColor,
  getMesureCategoryTypeLabel,
  MESURE_CATEGORY_TYPE_KEYS
} from "../../util/mesures";
import { getEvolution } from "./getEvolution";

const MesureEvolutionChart = props => {
  const [selectedMesures, setMesures] = useState([]);
  const { data } = props;

  const { evolutionDatas, evolutionFilters } = getEvolution(data.mesureTypeCategoryEvolution);

  const selectMesures = selectedOptions => {
    if (selectedOptions) {
      const active = selectedOptions.map(option => {
        return option.value;
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
            {MESURE_CATEGORY_TYPE_KEYS.filter(key => {
              return selectedMesures.includes(key) || selectedMesures.length === 0;
            }).map((key, index) => (
              <Line
                key={index}
                type="monotone"
                dot={false}
                strokeWidth={2}
                dataKey={getMesureCategoryTypeLabel(key)}
                stroke={getMesureCategoryTypeColor(key)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Fragment>
  );
};

export { MesureEvolutionChart };
