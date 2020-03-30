import { useQuery } from "@apollo/react-hooks";
import { MandataireListItem } from "@emjpm/ui";
import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { Scrollbar } from "react-scrollbars-custom";
import { Box, Flex } from "rebass";

import { formatMandatairesList } from "../MagistratMandatairesList/utils";
import { MapContext } from "../Map/context";
import { UserContext } from "../UserContext";
import { MESURES_GESTIONNAIRE } from "./queries";
import { MagistratMapMandataireListStyle } from "./style";

const RESULT_PER_PAGE = 20;

const MagistratMapMandatairesPanelList = () => {
  const {
    magistrat: { ti_id: tiId }
  } = useContext(UserContext);

  const [currentOffset, setCurrentOffset] = useState(0);
  const { setCurrentMarker } = useContext(MapContext);

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

  const selectMarker = ({ id, discriminator, longitude, latitude }) => {
    setCurrentMarker({
      isActive: true,
      id: id,
      type: discriminator,
      longitude: longitude,
      latitude: latitude
    });
  };

  const { count } = data.count.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const gestionnaires = formatMandatairesList(data.mandatairesList);
  return (
    <Box pt="2" px="2" sx={MagistratMapMandataireListStyle}>
      <Scrollbar style={{ width: "100%", height: "100%" }}>
        <Box mr="1" mb="4">
          {gestionnaires.map(gestionnaire => {
            return (
              <MandataireListItem
                key={gestionnaire.id}
                isMagistratMap
                onClick={() => selectMarker(gestionnaire)}
                gestionnaire={gestionnaire}
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
        </Box>
      </Scrollbar>
    </Box>
  );
};

export { MagistratMapMandatairesPanelList };
