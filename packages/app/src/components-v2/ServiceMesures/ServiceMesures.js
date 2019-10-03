import { useQuery } from "@apollo/react-hooks";
import { MesureContextProvider, MesureList } from "@socialgouv/emjpm-ui-components";
import { Button } from "@socialgouv/emjpm-ui-core";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Box, Flex } from "rebass";
import { FiltersContext } from "../ServicesFilters/context";
import { MESURES } from "./queries";
import { ServiceAcceptMesure } from "./ServiceAcceptMesure";
import { ServiceCloseMesure } from "./ServiceCloseMesure";
import { ServiceDeleteMesure } from "./ServiceDeleteMesure";
import { ServiceEditMesure } from "./ServiceEditMesure";
import { ServiceReactivateMesure } from "./ServiceReactivateMesure";
import { MesureListStyle } from "./style";
import { formatMesureList } from "./utils";

const RESULT_PER_PAGE = 20;

const ServiceMesures = props => {
  const { isOnlyWaiting, user_antennes } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const { mesureType, mesureStatus, antenne, debouncedSearchText } = useContext(FiltersContext);

  useEffect(() => setCurrentPage(RESULT_PER_PAGE), [mesureType, mesureStatus, antenne]);

  let currentMesureType = null;
  if (isOnlyWaiting) {
    currentMesureType = "Mesure en attente";
  } else {
    currentMesureType = mesureStatus ? mesureStatus.value : null;
  }
  const { data, error, loading, fetchMore } = useQuery(MESURES, {
    variables: {
      offset: 0,
      limit: RESULT_PER_PAGE,
      antenne: antenne ? antenne.value : null,
      type: mesureType ? mesureType.value : null,
      status: currentMesureType,
      searchText:
        debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null
    },
    fetchPolicy: "network-only"
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
                EditComponent={props => (
                  <ServiceEditMesure user_antennes={user_antennes} {...props} />
                )}
                CloseComponent={ServiceCloseMesure}
                RemoveComponent={ServiceDeleteMesure}
                AcceptComponent={props => (
                  <ServiceAcceptMesure user_antennes={user_antennes} {...props} />
                )}
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
