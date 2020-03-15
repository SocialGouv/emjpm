import { useQuery } from "@apollo/react-hooks";
import { MesureContextProvider, MesureListItem } from "@socialgouv/emjpm-ui-components";
import Router from "next/router";
import React, { Fragment, useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { FiltersContext } from "../MagistratFilters/context";
import { MESURES } from "./queries";
import { MagistratListStyle } from "./style";
import { formatMandatairesMesureList } from "./utils";

const RESULT_PER_PAGE = 20;

const MagistratMesures = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const { mesureType, mesureStatus, debouncedSearchText } = useContext(FiltersContext);

  const queryVariables = {
    offset: currentOffset,
    searchText:
      debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null,
    status: mesureStatus ? mesureStatus.value : null,
    type: mesureType ? mesureType.value : null
  };

  const { data, error, loading } = useQuery(MESURES, {
    fetchPolicy: "cache-and-network",
    variables: queryVariables
  });

  const selectMesure = ({ id }) => {
    Router.push("/magistrats/mesures/[mesure_id]", `/magistrats/mesures/${id}`, { shallow: true });
  };

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { count } = data.mesures_aggregate.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const mesures = formatMandatairesMesureList(data.mesures);

  return (
    <MesureContextProvider>
      <Box sx={MagistratListStyle}>
        <Fragment>
          {mesures.length > 0 ? (
            <Fragment>
              {mesures.map(mesure => {
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
                    onPageChange={data => {
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
    </MesureContextProvider>
  );
};

export { MagistratMesures };
