import { useQuery } from "@apollo/react-hooks";
import { MesureContextProvider, MesureList } from "@socialgouv/emjpm-ui-components";
import React, { Fragment, useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { FiltersContext } from "../MandataireFilters/context";
import { MANDATAIRE_MESURES } from "./queries";
import { formatMesureList } from "./utils";
const RESULT_PER_PAGE = 20;
import { MandatairesAcceptMesure } from "./MandatairesAcceptMesure";
import { MandatairesCloseMesure } from "./MandatairesCloseMesure";
import { MandatairesDeleteMesure } from "./MandatairesDeleteMesure";
import { MandatairesEditMesure } from "./MandatairesEditMesure";
import { MandatairesReactivateMesure } from "./MandatairesReactivateMesure";
import { MesureListStyle } from "./style";

const MandatairesMesures = props => {
  const { isOnlyWaiting } = props;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { mesureType, mesureStatus, debouncedSearchText } = useContext(FiltersContext);

  let currentMesureType = null;
  if (isOnlyWaiting) {
    currentMesureType = "Mesure en attente";
  } else {
    currentMesureType = mesureStatus ? mesureStatus.value : null;
  }

  const queryVariables = {
    limit: RESULT_PER_PAGE,
    offset: currentOffset,
    searchText:
      debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null,
    status: currentMesureType,
    type: mesureType ? mesureType.value : null
  };

  const { data, error, loading } = useQuery(MANDATAIRE_MESURES, {
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

  return (
    <MesureContextProvider>
      <Box sx={MesureListStyle}>
        <Fragment>
          {mesures.length > 0 ? (
            <Fragment>
              <MesureList
                EditComponent={MandatairesEditMesure}
                CloseComponent={MandatairesCloseMesure}
                RemoveComponent={props => (
                  <MandatairesDeleteMesure {...props} queryVariables={queryVariables} />
                )}
                AcceptComponent={MandatairesAcceptMesure}
                ReactivateComponent={MandatairesReactivateMesure}
                onPanelOpen={() => null}
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

export { MandatairesMesures };
