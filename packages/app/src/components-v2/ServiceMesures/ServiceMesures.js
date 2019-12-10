import { useQuery } from "@apollo/react-hooks";
import { MesureContextProvider, MesureList } from "@socialgouv/emjpm-ui-components";
import React, { Fragment, useContext, useState } from "react";
import ReactPaginate from "react-paginate";
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
  const { isOnlyWaiting, user_antennes, service_admins } = props;
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
    type: mesureType ? mesureType.value : null
  };

  const { data, error, loading } = useQuery(MESURES, {
    variables: queryVariables
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
  const [service] = service_admins;
  return (
    <MesureContextProvider>
      <Box sx={MesureListStyle}>
        <Fragment>
          {mesures.length > 0 ? (
            <Fragment>
              <MesureList
                EditComponent={props => (
                  <ServiceEditMesure service={service} user_antennes={user_antennes} {...props} />
                )}
                CloseComponent={ServiceCloseMesure}
                RemoveComponent={props => (
                  <ServiceDeleteMesure queryVariables={queryVariables} {...props} />
                )}
                AcceptComponent={props => (
                  <ServiceAcceptMesure user_antennes={user_antennes} {...props} />
                )}
                ReactivateComponent={ServiceReactivateMesure}
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
