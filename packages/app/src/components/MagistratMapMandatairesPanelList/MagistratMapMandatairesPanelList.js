import { useQuery } from "@apollo/react-hooks";
import { Mandatairelist } from "@socialgouv/emjpm-ui-components";
import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { Scrollbar } from "react-scrollbars-custom";
import { Box, Flex } from "rebass";

import { SERVICE } from "../../constants/discriminator";
import { formatMandatairesList } from "../MagistratMandatairesList/utils";
import { MapContext } from "../MagistratMapMandataires/context";
import { MESURES_GESTIONNAIRE } from "./queries";
import { MagistratMapMandataireListStyle } from "./style";

const RESULT_PER_PAGE = 20;

const MagistratMapMandatairesPanelList = props => {
  const { tiId } = props;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { setcurrentGestionnaire } = useContext(MapContext);

  const { data, error, loading } = useQuery(
    MESURES_GESTIONNAIRE,
    {
      variables: {
        tiId: tiId,
        offset: currentOffset,
        limit: RESULT_PER_PAGE
      }
    },
    {
      fetchPolicy: "network-only"
    }
  );

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const chooseMandataire = data => {
    const { discriminator, serviceId, mandataireId, latitude, longitude } = data;
    setcurrentGestionnaire({
      isActive: true,
      latitude: latitude,
      longitude: longitude,
      currentId: discriminator === SERVICE ? serviceId : mandataireId,
      currentDiscriminator: discriminator
    });
  };

  const { count } = data.count.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const list = formatMandatairesList(data.mandatairesList);
  return (
    <Box pt="2" px="2" sx={MagistratMapMandataireListStyle} {...props}>
      <Scrollbar style={{ width: "100%", height: "100%" }}>
        <Box mr="1" mb="4">
          <Mandatairelist
            isMagistratMap
            selectCurrentMandataire={data => chooseMandataire(data)}
            mandataires={list}
          />
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
        </Box>
      </Scrollbar>
    </Box>
  );
};

export { MagistratMapMandatairesPanelList };
