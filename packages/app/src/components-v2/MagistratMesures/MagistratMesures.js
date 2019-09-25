import { useQuery } from "@apollo/react-hooks";
import { MesureList, MesureContextProvider } from "@socialgouv/emjpm-ui-components";
import React, { useContext, Fragment, useState } from "react";
import { Flex, Box } from "rebass";
import { Button } from "@socialgouv/emjpm-ui-core";

import { formatMesureList } from "../ServiceMesures/utils";
import { FiltersContext } from "../MagistratFilters/context";
import { MESURES } from "./queries";
import { MagistratEditMesure } from "./MagistratEditMesure";
import { MagistratRemoveMesure } from "./MagistratRemoveMesure";
import { MagistratListStyle } from "./style";

const RESULT_PER_PAGE = 20;

const MagistratMesures = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { mesureType, mesureStatus } = useContext(FiltersContext);
  const { data, error, loading, fetchMore, refetch } = useQuery(MESURES, {
    variables: {
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

  // Sick hack trick for cache problem
  refetch();

  const { count } = data.mesures_aggregate.aggregate;
  const mesures = formatMesureList(data.mesures);

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

export { MagistratMesures };
