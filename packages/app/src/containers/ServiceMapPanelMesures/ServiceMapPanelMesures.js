import { useQuery } from "@apollo/client";
import { Fragment, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";
import { Box, Flex } from "rebass";

import MesureListItem from "~/containers/MesureListItem";
import { formatMesureListItems } from "~/formatters/mesures";

import { MESURES } from "./queries";
import { ServiceMapPanelMesuresStyle } from "./style";

const RESULT_PER_PAGE = 20;

function ServiceMapPanelMesures({ mesuresIds }) {
  const history = useHistory();
  const [currentOffset, setCurrentOffset] = useState(0);

  const queryVariables = {
    ids: mesuresIds,
    limit: RESULT_PER_PAGE,
    offset: currentOffset,
  };

  const { data, error, loading } = useQuery(MESURES, {
    fetchPolicy: "cache-and-network",
    variables: queryVariables,
  });

  const getHref = ({ mesure: { id } }) => `/services/mesures/${id}`;
  function selectMesure(props) {
    history.push(getHref(props));
  }

  const mesures = useMemo(
    () => (data ? formatMesureListItems(data.mesures) : []),
    [data]
  );
  const count = useMemo(
    () => (data ? data.mesures_aggregate.aggregate.count : 0),
    [data]
  );
  const totalPage = useMemo(() => Math.ceil(count / RESULT_PER_PAGE), [count]);

  if (loading) {
    return <Box p="2">Chargement</Box>;
  }

  if (error) {
    return <Box p="2">Erreur</Box>;
  }
  return (
    <Box sx={ServiceMapPanelMesuresStyle}>
      <Scrollbar style={{ height: "100%", width: "100%" }}>
        <Box p="2">
          {mesures.length > 0 ? (
            <>
              {mesures.map((mesure) => {
                return (
                  <MesureListItem
                    key={mesure.id}
                    mesure={mesure}
                    hasLocation={false}
                    hasTribunal={false}
                    hasFolderNumber={false}
                    onClick={selectMesure}
                    getHref={getHref}
                  />
                );
              })}
            </>
          ) : (
            <div>Pas de donnée à afficher</div>
          )}
          {count > RESULT_PER_PAGE && (
            <Flex mb="2" alignItems="center" justifyContent="center">
              <ReactPaginate
                previousLabel={"Précédent"}
                nextLabel={"Suivant"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPage}
                containerClassName={"react-paginate-top"}
                marginPagesDisplayed={1}
                forcePage={currentOffset / RESULT_PER_PAGE}
                pageRangeDisplayed={1}
                onPageChange={(data) => {
                  setCurrentOffset(data.selected * RESULT_PER_PAGE);
                }}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </Flex>
          )}
        </Box>
      </Scrollbar>
    </Box>
  );
}

export { ServiceMapPanelMesures };
