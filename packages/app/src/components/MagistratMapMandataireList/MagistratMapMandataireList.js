import { useQuery } from "@apollo/react-hooks";
import { Mandatairelist } from "@socialgouv/emjpm-ui-components";
import { Button } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import { Box, Flex } from "rebass";

import { formatMandatairesList } from "../MandatairesList/utils";
import { MESURES_GESTIONNAIRE } from "./queries";
import { MagistratMapMandataireListStyle } from "./style";

const RESULT_PER_PAGE = 20;

const MagistratMapMandataireList = props => {
  const { tiId } = props;
  const [currentPage, setCurrentPage] = useState(0);

  // const [getMesures, { data: mesureData }] = useLazyQuery(MESURES_MANDATAIRE);

  const { data, error, loading, fetchMore } = useQuery(
    MESURES_GESTIONNAIRE,
    {
      variables: {
        tiId: tiId,
        offset: 0,
        limit: RESULT_PER_PAGE
      }
    },
    {
      fetchPolicy: "network-only"
    }
  );

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const chooseMandataire = data => {
    console.log(data);
    // setCenter(currentGestionnaire.coordinates);
    // setMesures(data.mesures);
  };

  const { count } = data.count.aggregate;
  const list = formatMandatairesList(data.mandatairesList);
  return (
    <Box pt="2" px="2" sx={MagistratMapMandataireListStyle} {...props}>
      <Scrollbar style={{ width: "100%", height: "100%" }}>
        <Box mr="1">
          <Mandatairelist
            isMagistratMap
            selectCurrentMandataire={data => chooseMandataire(data)}
            mandataires={list}
          />
          {count > RESULT_PER_PAGE && count > currentPage - RESULT_PER_PAGE && (
            <Flex mt="5" mb="5" alignItem="center">
              <Button
                onClick={() => {
                  fetchMore({
                    variables: {
                      offset: currentPage + RESULT_PER_PAGE
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      setCurrentPage(currentPage + RESULT_PER_PAGE);
                      return {
                        count: fetchMoreResult.count,
                        mandatairesList: [
                          ...prev.mandatairesList,
                          ...fetchMoreResult.mandatairesList
                        ]
                      };
                    }
                  });
                }}
              >
                Afficher les mandataires suivants
              </Button>
            </Flex>
          )}
        </Box>
      </Scrollbar>
    </Box>
  );
};

export { MagistratMapMandataireList };
