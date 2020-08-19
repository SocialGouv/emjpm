import { useQuery } from "@apollo/react-hooks";
import { MesureListItem } from "@emjpm/ui";
import Router from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { formatMesureListItems } from "../../util/mesures";
import { FiltersContext } from "../MagistratFilters/context";
import { MESURES } from "./queries";
import { MagistratListStyle } from "./style";

const RESULT_PER_PAGE = 20;

const MagistratMesures = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const { natureMesure, mesureStatus, debouncedSearchText } = useContext(FiltersContext);

  useEffect(() => {
    setCurrentOffset(0);
  }, [natureMesure, mesureStatus, debouncedSearchText]);

  const queryVariables = {
    offset: currentOffset,
    searchText:
      debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null,
    status: mesureStatus ? mesureStatus.value : null,
    natureMesure: natureMesure ? natureMesure.value : null,
  };

  const { data, error, loading } = useQuery(MESURES, {
    fetchPolicy: "cache-and-network",
    variables: queryVariables,
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
};

export { MagistratMesures };
