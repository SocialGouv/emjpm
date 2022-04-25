import { Box, Flex, Text } from "rebass";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { textStyle } from "~/containers/DirectionMandatairesActivity/style";
import { SrOnly } from "~/components";

const COLORS = ["#0072ca", "#D6317D", "#946800"];

function MandatairesDisponibilityChart({ data }) {
  return (
    <Box>
      <Box
        sx={{ height: [300, 313, 300], position: "relative", width: "100%" }}
      >
        <SrOnly id="disponibilites_par_type">
          Graphique montrant les disponibilités des mandataires par type
        </SrOnly>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              bottom: 20,
              left: 0,
              right: 0,
              top: 20,
            }}
            role="img"
            aria-label="Disponibilités par type de mandataires. Voir le tableau ci-dessous pour les données."
            aria-describedby="disponibilites_par_type"
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
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.overcapacity ? "#D63C31" : "#2d7600"}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <SrOnly as="div">
        <table>
          <tr>
            <th scope="row">Type de mandataires</th>
            <th scope="col">Disponibilité actuelle</th>
            <th scope="col">Disponibilité max</th>
            <th scope="col">Surcapacité</th>
          </tr>
          {data.map((el) => (
            <tr key={el.name}>
              <th scope="row">{el.name}</th>
              <td>{el["Disponibilité actuelle"]}</td>
              <td>{el["Disponibilité max"]}</td>
              <td>{el.overcapacity ? "Oui" : "Non"}</td>
            </tr>
          ))}
        </table>
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
          gridTemplateColumns: [
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(3, 1fr)",
          ],
          mt: "1",
        }}
      >
        <Box>
          <Flex mt="5" mb="7px">
            <Box
              bg="#3174D6"
              flexBasis="30px"
              maxWidth="30px"
              flexGrow="1"
              height="10px"
            />
            <Text ml="1" fontSize="10px">
              CAPACITÉ DES MANDATAIRES
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex mt="5" mb="7px">
            <Box
              bg="#D63C31"
              flexBasis="30px"
              maxWidth="30px"
              flexGrow="1"
              height="10px"
            />
            <Text ml="1" fontSize="10px">
              MANDATAIRES EN SURCAPACITÉ
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex mt="5" mb="7px">
            <Box
              bg="#2d7600"
              flexBasis="30px"
              maxWidth="30px"
              flexGrow="1"
              height="10px"
            />
            <Text ml="1" fontSize="10px">
              MANDATAIRES DISPONIBILITE
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export { MandatairesDisponibilityChart };
