import { useQuery } from "@apollo/react-hooks";
import { MesureContextProvider, MesureList } from "@socialgouv/emjpm-ui-components";
import React, { Fragment, useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { FiltersContext } from "../MandataireFilters/context";
import { UserContext } from "../UserContext";
import { MANDATAIRE_MESURES } from "./query";
import { formatMesureList } from "./utils";
const RESULT_PER_PAGE = 20;
import { MesureListStyle } from "./style";

const MandatairesMesures = props => {
  const { isOnlyWaiting } = props;
  const {
    mandataire: { id }
  } = useContext(UserContext);
  const [currentOffset, setCurrentOffset] = useState(0);
  const { mesureType, mesureStatus, debouncedSearchText } = useContext(FiltersContext);
  let currentMesureType = null;
  if (isOnlyWaiting) {
    currentMesureType = "Mesure en attente";
  } else {
    currentMesureType = mesureStatus ? mesureStatus.value : null;
  }

  const { data, error, loading, fetchMore } = useQuery(MANDATAIRE_MESURES, {
    variables: {
      limit: RESULT_PER_PAGE,
      mandataireId: id,
      offset: 0,
      searchText:
        debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null,
      status: currentMesureType,
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
  const totalPage = count / RESULT_PER_PAGE;
  const mesures = formatMesureList(data.mesures);

  return (
    <MesureContextProvider>
      <Box sx={MesureListStyle}>
        <Fragment>
          {mesures.length > 0 ? (
            <Fragment>
              <MesureList
                // EditComponent={props => (
                //   <ServiceEditMesure service={service} user_antennes={user_antennes} {...props} />
                // )}
                // CloseComponent={ServiceCloseMesure}
                // RemoveComponent={ServiceDeleteMesure}
                // AcceptComponent={props => (
                //   <ServiceAcceptMesure user_antennes={user_antennes} {...props} />
                // )}
                // ReactivateComponent={ServiceReactivateMesure}
                onPanelOpen={id => console.log(id)}
                mesures={mesures}
              />
            </Fragment>
          ) : (
            <div>Pas de donnée à afficher</div>
          )}
          {count > RESULT_PER_PAGE && (
            <Flex alignItems="center" justifyContent="center">
              <ReactPaginate
                previousLabel={"Précédent"}
                nextLabel={"Suivant"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPage}
                containerClassName={"react-paginate"}
                marginPagesDisplayed={2}
                forcePage={currentOffset / RESULT_PER_PAGE}
                pageRangeDisplayed={5}
                onPageChange={data => {
                  fetchMore({
                    updateQuery: (prev, { fetchMoreResult }) => {
                      return {
                        count: fetchMoreResult.count,
                        mesures: fetchMoreResult.mesures,
                        mesures_aggregate: fetchMoreResult.mesures_aggregate
                      };
                    },
                    variables: {
                      offset: data.selected * RESULT_PER_PAGE
                    }
                  });
                  setCurrentOffset(data.selected * RESULT_PER_PAGE);
                }}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </Flex>
          )}
        </Fragment>
      </Box>
    </MesureContextProvider>
  );
};

export { MandatairesMesures };
