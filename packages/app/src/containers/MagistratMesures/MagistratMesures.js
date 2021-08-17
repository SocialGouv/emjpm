import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";
import ReactTooltip from "react-tooltip";

import useQueryReady from "~/hooks/useQueryReady";
import { FiltersContext } from "~/containers/MagistratFilters/context";
import useUser from "~/hooks/useUser";
import MesureListItem from "~/containers/MesureListItem";
import { formatMesureListItems } from "~/formatters/mesures";

import { MAGISTRAT_MESURES_QUERY } from "./queries";
import { MagistratListStyle } from "./style";

const RESULT_PER_PAGE = 20;

function MagistratMesures() {
  const history = useHistory();
  const [currentOffset, setCurrentOffset] = useState(0);
  const { natureMesure, etatMesure, debouncedSearchText, debouncedCabinet } =
    useContext(FiltersContext);
  const {
    magistrat: { ti_id: tiId },
  } = useUser();

  useEffect(() => {
    setCurrentOffset(0);
  }, [natureMesure, debouncedSearchText]);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const queryVariables = {
    etatMesure: etatMesure ? etatMesure : null,
    natureMesure: natureMesure ? natureMesure.value : null,
    offset: currentOffset,
    cabinet: debouncedCabinet ? `%${debouncedCabinet}%` : null,
    searchText:
      debouncedSearchText && debouncedSearchText !== ""
        ? `%${debouncedSearchText}%`
        : null,
    tiId,
  };

  const { data, error, loading } = useQuery(MAGISTRAT_MESURES_QUERY, {
    variables: queryVariables,
    fetchPolicy: "network-only",
  });

  const getHref = ({ mesure: { id } }) => `/magistrats/mesures/${id}`;

  function selectMesure(props) {
    history.push(getHref(props));
  }

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { count } = data.mesures_aggregate.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const mesures = formatMesureListItems(data.mesures);

  return (
    <Box sx={MagistratListStyle}>
      <>
        {mesures.length > 0 ? (
          <>
            {mesures.map((mesure) => {
              return (
                <MesureListItem
                  key={mesure.id}
                  mesure={mesure}
                  hasFolderNumber={false}
                  hasLocation={false}
                  onClick={selectMesure}
                  getHref={getHref}
                />
              );
            })}
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
        ) : (
          <div>Pas de donnée à afficher</div>
        )}
      </>
    </Box>
  );
}

export { MagistratMesures };
