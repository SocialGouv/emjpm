import { useQuery } from "@apollo/client";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { Flex } from "rebass";

import useUser from "~/hooks/useUser";
import MandataireListItem from "~/containers/MandataireListItem";

import useQueryReady from "~/hooks/useQueryReady";

import { GET_MANDATAIRES } from "./queries";
import { formatMandatairesList } from "./utils";

const DEFAULT_VALUE = { label: "Tous les types", value: null };

const optionsType = [
  DEFAULT_VALUE,
  { label: "Préposé", value: "MANDATAIRE_PRE" },
  { label: "Individuel", value: "MANDATAIRE_IND" },
  { label: "Service", value: "SERVICE" },
];

const orderByOptions = [
  {
    label: "disponibilité",
    value: 0,
  },
  {
    label: "ordre alphabétique (A-Z)",
    value: 1,
  },
  {
    label: "ordre alphabétique (Z-A)",
    value: 2,
  },
];

const RESULT_PER_PAGE = 20;

function getOrderByVariable(orderBy) {
  switch (orderBy) {
    case 0:
      return { gestionnaire: { remaining_capacity: "desc_nulls_last" } };
    case 1:
      return {
        name: "asc",
      };
    case 2:
      return {
        name: "desc",
      };
  }
}

function MagistratMandatairesListList(props) {
  const { orderBy, debouncedSearchText, currentOffset, selectedType } = props;
  const history = useHistory();
  const {
    magistrat: { ti_id },
  } = useUser();

  const { data, error, loading } = useQuery(GET_MANDATAIRES, {
    variables: {
      discriminator: selectedType ? selectedType.value : null,
      limit: RESULT_PER_PAGE,
      offset: currentOffset,
      orderBy: getOrderByVariable(orderBy),
      searchText: debouncedSearchText ? `%${debouncedSearchText}%` : null,
      tribunal: ti_id,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { count } = data.count.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const gestionnaires = formatMandatairesList(data.mandatairesList);

  return (
    <>
      {gestionnaires.map((gestionnaire) => {
        return (
          <MandataireListItem
            key={gestionnaire.id}
            onClick={() =>
              history.push(`/magistrats/gestionnaires/${gestionnaire.id}`)
            }
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
    </>
  );
}

export { MagistratMandatairesListList };
