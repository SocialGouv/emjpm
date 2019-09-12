import { useQuery } from "@apollo/react-hooks";
import { Card, Select } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import { MESURE_STATUS_LABEL_VALUE, MESURE_TYPE_LABEL_VALUE } from "../../constants/mesures";
import { FiltersContext } from "./context";
import { GET_CURRENT_USER } from "./queries";
import { TextStyle } from "./style";

const ServicesFilters = () => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  const {
    mesureType,
    changeMesureType,
    mesureStatus,
    changeMesureStatus,
    antenne,
    changeAntenne
  } = useContext(FiltersContext);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const antenneOptions = [
    {
      label: "Toutes les antennes",
      value: null
    }
  ];
  Array.prototype.push.apply(
    antenneOptions,
    data.currentUser.user_antennes.map(ua => ({
      label: ua.service_antenne.name,
      value: ua.service_antenne.id
    }))
  );

  const mesureTypeOptions = [
    {
      label: "Tous les types",
      value: null
    }
  ];
  Array.prototype.push.apply(mesureTypeOptions, MESURE_TYPE_LABEL_VALUE);

  const mesureStatusOptions = [
    {
      label: "Tous les états",
      value: null
    }
  ];
  Array.prototype.push.apply(mesureStatusOptions, MESURE_STATUS_LABEL_VALUE);

  return (
    <Card mt="3">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>AFFINER LES RÉSULTATS</Text>
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={antenneOptions}
                placeholder={"antenne"}
                value={antenne}
                onChange={option => changeAntenne(option)}
              />
            </Box>
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={mesureTypeOptions}
                placeholder={"type"}
                value={mesureType}
                onChange={option => changeMesureType(option)}
              />
            </Box>
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={mesureStatusOptions}
                placeholder={"état"}
                value={mesureStatus}
                onChange={option => changeMesureStatus(option)}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export { ServicesFilters };
