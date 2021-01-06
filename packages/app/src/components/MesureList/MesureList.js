import { useQuery } from "@apollo/client";
import { MESURE_PROTECTION_STATUS } from "@emjpm/biz";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";

import { FiltersContext } from "~/components/MesureListFilters/context";
import { UserContext } from "~/components/UserContext";
import { getUserBasePath } from "~/constants";
import { MesureListItem } from "~/ui";
import { formatMesureListItems } from "~/util/mesures";

import { MESURES_QUERY } from "./queries";
import { MesureListStyle } from "./style";

const RESULT_PER_PAGE = 20;

const MesureList = () => {
  const history = useHistory();
  const [currentOffset, setCurrentOffset] = useState(0);
  const {
    antenne,
    natureMesure,
    mesureStatus,
    debouncedSearchText,
    sortBy,
  } = useContext(FiltersContext);
  const { type } = useContext(UserContext);
  const userBasePath = getUserBasePath({ type });

  useEffect(() => {
    setCurrentOffset(0);
  }, [natureMesure, mesureStatus, debouncedSearchText, sortBy]);

  const currentMesureStatus = mesureStatus
    ? mesureStatus.value
    : MESURE_PROTECTION_STATUS.en_cours;

  let orderBy;
  switch (sortBy.value) {
    case "annee_naissance_asc":
      orderBy = { annee_naissance: "asc" };
      break;
    case "annee_naissance_desc":
      orderBy = { annee_naissance: "desc" };
      break;
    case "date_nomination_asc":
      orderBy = { date_nomination: "asc" };
      break;
    case "date_nomination_desc":
      orderBy = { date_nomination: "desc" };
      break;
    default:
      orderBy = { date_nomination: "desc_nulls_first" };
  }

  const queryVariables = {
    antenne: antenne ? antenne.value : null,
    limit: RESULT_PER_PAGE,
    natureMesure: natureMesure ? natureMesure.value : null,
    offset: currentOffset,
    orderBy,
    searchText:
      debouncedSearchText && debouncedSearchText !== ""
        ? `${debouncedSearchText}%`
        : null,
    status: currentMesureStatus,
  };

  const { data, error, loading } = useQuery(MESURES_QUERY, {
    variables: queryVariables,
  });

  const selectMesure = ({ id, userBasePath }) => {
    history.push(
      `${userBasePath}/mesures/[mesure_id]`,
      `${userBasePath}/mesures/${id}`,
      {
        shallow: true,
      }
    );
  };

  if (loading) {
    return <Box mt={3}>{"Chargement..."}</Box>;
  }

  if (error) {
    return (
      <Box mt={3}>
        {"Une erreur s'est produite. Veuillez réessayer ultérieurement."}
      </Box>
    );
  }

  const { count } = data.mesures_aggregate.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const mesures = formatMesureListItems(data.mesures);
  const awaitingMesures = formatMesureListItems(data.awaiting_mesures || []);

  const mesuresList = [];

  if (currentOffset === 0) {
    mesuresList.push(...awaitingMesures);
  }

  mesuresList.push(...mesures);

  return (
    <Box sx={MesureListStyle}>
      <Fragment>
        {mesuresList.length > 0 ? (
          <Fragment>
            {mesuresList.map((mesure) => {
              return (
                <MesureListItem
                  key={mesure.id}
                  mesure={mesure}
                  onClick={({ mesure }) =>
                    selectMesure({ id: mesure.id, userBasePath })
                  }
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

export { MesureList };
