import { useQuery } from "@apollo/react-hooks";
import { MesureContextProvider, MesureList } from "@socialgouv/emjpm-ui-components";
import { Button } from "@socialgouv/emjpm-ui-core";
import React, { Fragment, useContext, useState } from "react";
import { Box, Flex } from "rebass";

import { FiltersContext } from "../MagistratFilters/context";
import { MagistratEditMesure } from "./MagistratEditMesure";
import { MagistratRemoveMesure } from "./MagistratRemoveMesure";
import { MESURES } from "./queries";
import { MagistratListStyle } from "./style";
import { formatMandatairesMesureList } from "./utils";

const RESULT_PER_PAGE = 20;

const MagistratMesures = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { mesureType, mesureStatus, debouncedSearchText } = useContext(FiltersContext);
  const { data, error, loading, fetchMore } = useQuery(MESURES, {
    fetchPolicy: "network-only",
    variables: {
      searchText:
        debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null,
      status: mesureStatus ? mesureStatus.value : null,
      type: mesureType ? mesureType.value : null
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { count } = data.mesures_aggregate.aggregate;
  const mesures = formatMandatairesMesureList(data.mesures);
  return (
    <MesureContextProvider>
      <Box sx={MagistratListStyle}>
        <Fragment>
          {mesures.length > 0 ? (
            <Fragment>
              <MesureList
                EditComponent={MagistratEditMesure}
                RemoveComponent={MagistratRemoveMesure}
                isMagistrat
                onPanelOpen={id => console.log(id)}
                mesures={mesures}
              />
              {count > RESULT_PER_PAGE && count > currentPage && (
                <Flex mt="5" alignItem="center">
                  <Button
                    onClick={() => {
                      fetchMore({
                        updateQuery: (prev, { fetchMoreResult }) => {
                          setCurrentPage(currentPage + RESULT_PER_PAGE);
                          return {
                            count: fetchMoreResult.count,
                            mesures: [...prev.mesures, ...fetchMoreResult.mesures]
                          };
                        },
                        variables: {
                          offset: currentPage + RESULT_PER_PAGE
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

export { MagistratMesures };
