import { Box, Text } from "rebass";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  legendStyle,
  numberStyle,
  percentStyle,
  pieTextStyle,
  textStyle,
} from "./style";
import { SrOnly, Table } from "~/components";

const COLORS = ["#3174D6", "#D6317D", "#946800"];

function MandatairesActivityChart(props) {
  const total = props.data.total;

  const serviceSum = props.data.service.sum;
  const servicePercentage = props.data.service.percentage;

  const mandataireIndividuelSum = props.data.mandataireIndividuel.sum;
  const mandataireIndividuelPercentage =
    props.data.mandataireIndividuel.percentage;

  const mandatairePreposeSum = props.data.mandatairePrepose.sum;
  const mandatairePreposePercentage = props.data.mandatairePrepose.percentage;

  const pieChartData = [
    { name: "SERVICES MANDATAIRES", value: serviceSum },
    { name: "MANDATAIRES INDIVIDUELS", value: mandataireIndividuelSum },
    { name: "PRÉPOSÉS D’ÉTABLISSEMENTS", value: mandatairePreposeSum },
  ];

  const mandatairesByTypeLength = pieChartData.reduce((acc, val) => {
    return acc + val.value;
  }, 0);

  return (
    <Box>
      <SrOnly id="repartition_par_type">
        Graphique montrant la répartition de l’activité par type de mandataires
      </SrOnly>
      <Box
        sx={{ height: [300, 300, 300], position: "relative", width: "100%" }}
      >
        <Text sx={pieTextStyle}>
          {total}
          <Text sx={legendStyle}>mesures</Text>
        </Text>
        <ResponsiveContainer>
          <PieChart
            role="img"
            aria-label={`${mandatairesByTypeLength} mesures réparties par type de mandataire. Voir le tableau ci-dessous pour les données.`}
            aria-describedby="repartition_par_type"
          >
            <Pie
              data={pieChartData}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <SrOnly as="div">
        <Table
          columns={pieChartData.map((x) => x.name).length}
          tableData={[
            ...pieChartData.map((x) => x.name),
            ...pieChartData.map((x) => x.value),
          ]}
        />
      </SrOnly>

      <Box
        sx={{
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: [
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(3, 1fr)",
          ],
          mt: "1",
        }}
      >
        <Box>
          <Text color={COLORS[0]} sx={textStyle}>
            SERVICES MANDATAIRES
          </Text>
          <Text sx={numberStyle}>{serviceSum}</Text>
          <Text sx={percentStyle}>{servicePercentage} %</Text>
        </Box>
        <Box>
          <Text color={COLORS[1]} sx={textStyle}>
            MANDATAIRES INDIVIDUELS
          </Text>
          <Text sx={numberStyle}>{mandataireIndividuelSum}</Text>
          <Text sx={percentStyle}>{mandataireIndividuelPercentage} %</Text>
        </Box>
        <Box>
          <Text color={COLORS[2]} sx={textStyle}>
            PRÉPOSÉS D’ÉTABLISSEMENTS
          </Text>
          <Text sx={numberStyle}>{mandatairePreposeSum}</Text>
          <Text sx={percentStyle}>{mandatairePreposePercentage} %</Text>
        </Box>
      </Box>
    </Box>
  );
}

export { MandatairesActivityChart };
