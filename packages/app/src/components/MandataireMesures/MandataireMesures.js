import { useQuery } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/core";
import { MesureListItem } from "@emjpm/ui";
import Router from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { formatMesureListItems } from "../../util/mesures";
import { FiltersContext } from "../MandataireFilters/context";
import { MANDATAIRE_MESURES } from "./queries";
import { MesureListStyle } from "./style";

const RESULT_PER_PAGE = 20;

const MandataireMesures = (props) => {
  const { isOnlyWaiting } = props;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { natureMesure, mesureStatus, debouncedSearchText } = useContext(FiltersContext);

  useEffect(() => {
    setCurrentOffset(0);
  }, [natureMesure, mesureStatus, debouncedSearchText]);

  let currentMesureStatus = null;
  if (isOnlyWaiting) {
    currentMesureStatus = MESURE_PROTECTION_STATUS.en_attente;
  } else {
    currentMesureStatus = mesureStatus ? mesureStatus.value : null;
  }

  const queryVariables = {
    limit: RESULT_PER_PAGE,
    offset: currentOffset,
    searchText:
      debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null,
    status: currentMesureStatus,
    natureMesure: natureMesure ? natureMesure.value : null,
  };

  const { data, error, loading } = useQuery(MANDATAIRE_MESURES, {
    variables: queryVariables,
  });

  const selectMesure = ({ id }) => {
    Router.push("/mandataires/mesures/[mesure_id]", `/mandataires/mesures/${id}`, {
      shallow: true,
    });
  };

  if (loading) {
    return <Box mt={3}>{"Chargement..."}</Box>;
  }

  if (error) {
    return <Box mt={3}>{"Une erreur s'est produite. Veuillez réessayer ultérieurement."}</Box>;
  }

  const { count } = data.mesures_aggregate.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const mesures = formatMesureListItems(data.mesures);

  return (
    <Box sx={MesureListStyle}>
      <Fragment>
        {mesures.length > 0 ? (
          <Fragment>
            {mesures.map((mesure) => {
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
              onPageChange={(data) => {
                setCurrentOffset(data.selected * RESULT_PER_PAGE);
              }}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </Flex>
        )}
      </Fragment>
    </Box>
  );
};

export { MandataireMesures };
