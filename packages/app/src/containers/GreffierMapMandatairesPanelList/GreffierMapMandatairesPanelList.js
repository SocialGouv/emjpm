import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { Scrollbar } from "react-scrollbars-custom";
import { Box, Flex } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { formatMandatairesList } from "~/containers/GreffierMandatairesList/utils";
import { MapContext } from "~/containers/Map/context";
import useUser from "~/hooks/useUser";
import MandataireListItem from "~/containers/MandataireListItem";

import { MESURES_GESTIONNAIRE } from "./queries";
import { GreffierMapMandataireListStyle } from "./style";

const RESULT_PER_PAGE = 20;

function GreffierMapMandatairesPanelList() {
  const {
    greffier: {
      ti: { id: tiId, departement_code: departementCode },
    },
  } = useUser();

  const [currentOffset, setCurrentOffset] = useState(0);
  const { setCurrentMarker } = useContext(MapContext);

  const { data, error, loading } = useQuery(
    MESURES_GESTIONNAIRE,
    {
      variables: {
        limit: RESULT_PER_PAGE,
        offset: currentOffset,
        tiId: tiId,
        departementCode,
      },
    },
    {
      fetchPolicy: "network-only",
    }
  );

  if (!useQueryReady(loading, error)) {
    return null;
  }

  function selectMarker({ id, discriminator, longitude, latitude }) {
    setCurrentMarker({
      id: id,
      isActive: true,
      latitude: latitude,
      longitude: longitude,
      type: discriminator,
    });
  }

  const { count } = data.count.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const gestionnaires = formatMandatairesList(
    data.mandatairesList.map((row) => {
      return { gestionnaire: row.gestionnaires[0] };
    })
  );
  return (
    <Box pt="2" px="2" sx={GreffierMapMandataireListStyle}>
      <Scrollbar style={{ height: "100%", width: "100%" }}>
        <Box mr="1" mb="4" id="greffier_mandataires_list" tabIndex="-1">
          {gestionnaires.map((gestionnaire) => {
            return (
              <MandataireListItem
                key={gestionnaire.id}
                isGreffierMap
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

export { GreffierMapMandatairesPanelList };
