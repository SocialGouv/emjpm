import { useQuery } from "@apollo/react-hooks";
import { MesureListItem } from "@socialgouv/emjpm-ui-components";
import Router from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Scrollbar } from "react-scrollbars-custom";
import { Box, Flex } from "rebass";

import { formatMesureList } from "../ServiceMesures/utils";
import { MapContext } from "../ServicesMap/context";
import { MESURES } from "./queries";
import { ServiceMapPanelMesuresStyle } from "./style";
const RESULT_PER_PAGE = 50;

const ServiceMapPanelMesures = props => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const { setMesures } = useContext(MapContext);
  const queryVariables = {
    limit: RESULT_PER_PAGE,
    offset: currentOffset
  };

  const { data, error, loading } = useQuery(MESURES, {
    variables: queryVariables,
    fetchPolicy: "cache-first"
  });

  const selectMesure = ({ id }) => {
    Router.push(`/services/mesures/${id}`);
  };

  useEffect(() => {
    if (data && !loading && !error) {
      setMesures(data.mesures);
    }
  }, [data, error, loading, setMesures]);

  if (loading) {
    return <Box p="2">Chargement</Box>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const { count } = data.mesures_aggregate.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const mesures = formatMesureList(data.mesures);

  return (
    <Box sx={ServiceMapPanelMesuresStyle} {...props}>
      <Scrollbar style={{ width: "100%", height: "100%" }}>
        <Box p="2">
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
                onPageChange={data => {
                  setCurrentOffset(data.selected * RESULT_PER_PAGE);
                }}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </Flex>
          )}
          {mesures.length > 0 ? (
            <Fragment>
              {mesures.map(mesure => {
                return (
                  <MesureListItem
                    key={mesure.id}
                    mesure={mesure}
                    onItemClick={({ mesure }) => selectMesure(mesure)}
                  />
                );
              })}
            </Fragment>
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
                onPageChange={data => {
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
};

export { ServiceMapPanelMesures };
