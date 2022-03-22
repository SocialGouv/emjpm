import { useQuery } from "@apollo/client";
import { MESURE_PROTECTION_STATUS } from "@emjpm/biz";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";
import ReactTooltip from "react-tooltip";

import useQueryReady from "~/hooks/useQueryReady";
import { FiltersContext } from "~/containers/MesureListFilters/context";
import useUser from "~/hooks/useUser";
import { getUserBasePath } from "~/constants";
import MesureListItem from "~/containers/MesureListItem";
import { formatMesureListItems } from "~/formatters/mesures";

import { MESURES_QUERY } from "./queries";
import { MesureListStyle } from "./style";
import { SrOnly } from "../../components";

const RESULT_PER_PAGE = 20;

function MesureList(props) {
  const history = useHistory();
  const [currentOffset, setCurrentOffset] = useState(0);
  const {
    antenne,
    natureMesure,
    mesureStatus,
    mesureDepartement,
    debouncedSearchText,
    sortBy,
  } = useContext(FiltersContext);
  const { type } = useUser();
  const userBasePath = getUserBasePath({ type });

  useEffect(() => {
    setCurrentOffset(0);
  }, [natureMesure, mesureStatus, debouncedSearchText, sortBy]);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const currentMesureStatus = mesureStatus
    ? mesureStatus.value
    : MESURE_PROTECTION_STATUS.en_cours;

  const orderBy = [];
  switch (sortBy.value) {
    case "annee_naissance_asc":
      orderBy.push({ annee_naissance: "asc" });
      break;
    case "annee_naissance_desc":
      orderBy.push({ annee_naissance: "desc" });
      break;
    case "date_nomination_asc":
      orderBy.push({ date_nomination: "asc" });
      break;
    case "date_nomination_desc":
      orderBy.push({ date_nomination: "desc" });
      break;
    default:
      if (!debouncedSearchText) {
        orderBy.push({ date_nomination: "desc_nulls_first" });
      }
  }

  const queryVariables = {
    antenne: antenne && antenne.value ? antenne.value : null,
    antenne_null: antenne && antenne.value === false ? true : null,
    limit: RESULT_PER_PAGE,
    natureMesure: natureMesure ? natureMesure.value : null,
    offset: currentOffset,
    orderBy,
    searchText:
      debouncedSearchText && debouncedSearchText !== ""
        ? `%${debouncedSearchText}%`
        : null,
    status: currentMesureStatus,
    departement: mesureDepartement?.value || null,
  };

  const { data, error, loading } = useQuery(MESURES_QUERY, {
    variables: queryVariables,
    fetchPolicy: "network-only",
  });

  const getHref = ({ mesure: { id } }) => `${userBasePath}/mesures/${id}`;

  function selectMesure(props) {
    history.push(getHref(props));
  }

  if (!useQueryReady(loading, error)) {
    return null;
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
    <>
      <SrOnly role="status">
        {data.awaiting_mesures.length + count > 0 && (
          <span>
            {data.awaiting_mesures.length + count}{" "}
            {data.awaiting_mesures.length + count > 1
              ? "résultat"
              : "résultats"}
          </span>
        )}
        {data.awaiting_mesures.length + count === 0 && (
          <span role="status">Pas de donnée à afficher</span>
        )}
      </SrOnly>
      <Text pb="1" color="#696363">
        Résultats de la séléction: {data.awaiting_mesures.length + count}
      </Text>

      <Box sx={MesureListStyle}>
        <>
          {mesuresList.length > 0 ? (
            <>
              {mesuresList.map((mesure) => {
                return (
                  <MesureListItem
                    key={mesure.id}
                    mesure={mesure}
                    getHref={getHref}
                    onClick={selectMesure}
                  />
                );
              })}
            </>
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
        </>
      </Box>
    </>
  );
}

export { MesureList };
