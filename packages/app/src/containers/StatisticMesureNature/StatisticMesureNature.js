import { MESURE_PROTECTION } from "@emjpm/biz";
import { Box, Card, Flex, Link as RebassLink } from "rebass";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

import { Link } from "~/components/Link";
import useUser from "~/hooks/useUser";
import { Heading, Text } from "~/components";

const COLORS = [
  "#d14800",
  "#FFB399",
  "#d100d1",
  "#7b7b00",
  "#0080a6",
  "#957100",
  "#3366E6",
  "#7a7a1a",
  "#008a00",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

function StatisticMesureNature() {
  const user = useUser();
  const { statistics = {} } = user;
  const { natureStatistics = [] } = statistics;

  const data = natureStatistics.map(({ name, value }) => ({
    name: MESURE_PROTECTION.NATURE_MESURE.byKey[name],
    value: parseInt(value),
  }));

  const numberOfMesures = data.reduce((acc, val) => {
    return acc + Number(val.value);
  }, 0);

  return (
    <>
      <Card m={1} width="100%" tabIndex="0">
        <Box>
          <Heading size={4}>Répartition des mesures par nature</Heading>
        </Box>

        {data?.length === 0 && (
          <Flex pt={7}>
            <Text>{"Aucune donnée disponible. Merci de renseigner "}</Text>
            <Link
              to="mandataires/mesures"
              component={(props) => (
                <RebassLink onClick={() => props.navigate(props.href)} pl="4px">
                  vos mesures
                </RebassLink>
              )}
            ></Link>
          </Flex>
        )}
        <Flex>
          <PieChart
            width={300}
            height={300}
            role="img"
            id="chart"
            aria-label={`${numberOfMesures} mesures réparties par nature. ${data
              .map((el) => {
                return `${el.name} : ${el.value}. `;
              })
              ?.join("")}`}
          >
            <Pie
              data={data}
              cx={150}
              cy={150}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              aria-describedby="chart"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <Flex flexDirection="column" justifyContent="center">
            {data.map((stat, index) => {
              return (
                <Flex m={1} key={index}>
                  <Box bg={COLORS[index]} width="20px" height="20px" />
                  <Text fontWeight="bold" ml={1}>
                    {stat.value}
                  </Text>
                  <Text ml={1}>{stat.name}</Text>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

export { StatisticMesureNature };
