import { useQuery } from "@apollo/react-hooks";
import { MesureContextProvider, MesureListItem } from "@socialgouv/emjpm-ui-components";
import Router from "next/router";
import React, { Fragment, useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { formatMesureList } from "../../util/services";
import { FiltersContext } from "../ServiceFilters/context";
import { MESURES } from "./queries";

const RESULT_PER_PAGE = 20;

const ServiceMesures = props => {
  const { isOnlyWaiting } = props;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { mesureType, mesureStatus, antenne, debouncedSearchText } = useContext(FiltersContext);

  let currentMesureType = null;
  if (isOnlyWaiting) {
    currentMesureType = "Mesure en attente";
  } else {
    currentMesureType = mesureStatus ? mesureStatus.value : null;
  }
  const queryVariables = {
    antenne: antenne ? antenne.value : null,
    limit: RESULT_PER_PAGE,
    offset: currentOffset,
    searchText:
      debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null,
    status: currentMesureType,
    excludeStatus: isOnlyWaiting ? "" : "Mesure en attente",
    type: mesureType ? mesureType.value : null
  };

  const { data, error, loading } = useQuery(MESURES, {
    variables: queryVariables,
    fetchPolicy: "cache-and-network"
  });

  const selectMesure = ({ id }) => {
    Router.push(`/services/mesures/${id}`);
  };

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
      <Box width={[1]}>
        <Fragment>
          {mesures.length > 0 ? (
            <Fragment>
              {mesures.map(mesure => {
                return (
                  <MesureListItem
                    key={mesure.id}
                    mesure={mesure}
                    onClick={({ mesure }) => selectMesure(mesure)}
                  />
                );
              })}
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

export { ServiceMesures };
