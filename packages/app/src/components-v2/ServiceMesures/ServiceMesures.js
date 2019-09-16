import { useQuery } from "@apollo/react-hooks";
import { MesureList, MesureContextProvider } from "@socialgouv/emjpm-ui-components";
import React, { Fragment, useContext, useState, useEffect } from "react";
import { Flex, Box } from "rebass";
import { Button } from "@socialgouv/emjpm-ui-core";

import { MesureListStyle } from "./style";
import { formatMesureList } from "./utils";
import { FiltersContext } from "../ServicesFilters/context";
import { ServiceCloseMesure } from "./ServiceCloseMesure";
import { ServiceReactivateMesure } from "./ServiceReactivateMesure";
import { ServiceAcceptMesure } from "./ServiceAcceptMesure";

import { ServiceDeleteMesure } from "./ServiceDeleteMesure";

import { MESURES } from "./queries";

const RESULT_PER_PAGE = 20;

const ServiceMesures = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { mesureType, mesureStatus, antenne } = useContext(FiltersContext);

  useEffect(() => setCurrentPage(RESULT_PER_PAGE), [mesureType, mesureStatus, antenne]);
  const { data, error, loading, fetchMore } = useQuery(MESURES, {
    variables: {
      offset: 0,
      limit: RESULT_PER_PAGE,
      antenne: antenne ? antenne.value : undefined,
      type: mesureType ? mesureType.value : undefined,
      status: mesureStatus ? mesureStatus.value : undefined
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { count } = data.mesures_aggregate.aggregate;
  const mesures = formatMesureList(data.mesures);

  return (
    <MesureContextProvider>
      <Box sx={MesureListStyle}>
        <Fragment>
          {mesures.length > 0 ? (
            <Fragment>
              <MesureList
                CloseComponent={ServiceCloseMesure}
                RemoveComponent={ServiceDeleteMesure}
                AcceptComponent={ServiceAcceptMesure}
                ReactivateComponent={ServiceReactivateMesure}
                onPanelOpen={id => console.log(id)}
                mesures={mesures}
              />
              {count > RESULT_PER_PAGE && count > currentPage && (
                <Flex mt="5" alignItem="center">
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
                            mesures: [...prev.mesures, ...fetchMoreResult.mesures]
                          };
                        }
                      });
                    }}
                  >
                    Afficher les mandataires suivants
                  </Button>
                </Flex>
              )}
            </Fragment>
          ) : (
            <div>Pas de donnée à afficher</div>
          )}
        </Fragment>
      </Box>
    </MesureContextProvider>
  );
};

export { ServiceMesures };
