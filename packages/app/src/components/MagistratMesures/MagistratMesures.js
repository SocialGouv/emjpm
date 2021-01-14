import { useQuery } from "@apollo/client";
import { Fragment, useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";

import { FiltersContext } from "~/components/MagistratFilters/context";
import { UserContext } from "~/components/UserContext";
import { MesureListItem } from "~/ui";
import { formatMesureListItems } from "~/util/mesures";

import { MAGISTRAT_MESURES_QUERY } from "./queries";
import { MagistratListStyle } from "./style";

const RESULT_PER_PAGE = 20;

function MagistratMesures() {
  const history = useHistory();
  const [currentOffset, setCurrentOffset] = useState(0);
  const { natureMesure, debouncedSearchText } = useContext(FiltersContext);
  const {
    magistrat: { ti_id: tiId },
  } = useContext(UserContext);

  useEffect(() => {
    setCurrentOffset(0);
  }, [natureMesure, debouncedSearchText]);

  const queryVariables = {
    natureMesure: natureMesure ? natureMesure.value : null,
    offset: currentOffset,
    searchText:
      debouncedSearchText && debouncedSearchText !== ""
        ? `${debouncedSearchText}%`
        : null,
    tiId,
  };

  const { data, error, loading } = useQuery(MAGISTRAT_MESURES_QUERY, {
    variables: queryVariables,
  });

  function selectMesure({ id }) {
    history.push(`/magistrats/mesures/${id}`);
  }

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { count } = data.mesures_aggregate.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const mesures = formatMesureListItems(data.mesures);

  return (
    <Box sx={MagistratListStyle}>
      <Fragment>
        {mesures.length > 0 ? (
          <Fragment>
            {mesures.map((mesure) => {
              return (
                <MesureListItem
                  key={mesure.id}
                  mesure={mesure}
                  hasFolderNumber={false}
                  hasLocation={false}
                  onClick={({ mesure }) => selectMesure(mesure)}
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
          </Fragment>
        ) : (
          <div>Pas de donnée à afficher</div>
        )}
      </Fragment>
    </Box>
  );
}

export { MagistratMesures };
