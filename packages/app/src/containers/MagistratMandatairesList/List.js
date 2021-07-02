import { useQuery } from "@apollo/client";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { Flex } from "rebass";

import useUser from "~/hooks/useUser";
import MandataireListItem from "~/containers/MagistratMandatairesList/MandataireListItem";

import useQueryReady from "~/hooks/useQueryReady";

import { GET_MANDATAIRES, GET_MANDATAIRES_BY_COORDS } from "./queries";
import { useMemo } from "react";

const RESULT_PER_PAGE = 20;
const distanceMaxKM = 300;
// const distanceMaxKM = null;

function getOrderByVariable(orderBy, departementFilterEnabled) {
  switch (orderBy) {
    case 0: // disponibilité
      if (departementFilterEnabled) {
        return [
          {
            gestionnaire: {
              service: {
                dispo_departements_aggregate: {
                  sum: { dispo: "desc_nulls_last" },
                },
              },
            },
          },
          {
            gestionnaire: {
              mandataire: {
                dispo_departements_aggregate: {
                  sum: { dispo: "desc_nulls_last" },
                },
              },
            },
          },
        ];
      } else {
        return { gestionnaire: { remaining_capacity: "desc_nulls_last" } };
      }
    case 1:
      return { gestionnaire: { remaining_capacity: "desc_nulls_last" } };
    case 2:
      return {
        nom: "asc",
      };
    case 3:
      return {
        nom: "desc",
      };
  }
}

function MagistratMandatairesListList(props) {
  const {
    orderBy,
    debouncedSearchText,
    setCurrentOffset,
    currentOffset,
    selectedType,
    prefer,
    habilitation,
    available,
    localisation,
    departement,
  } = props;
  const history = useHistory();
  const { magistrat } = useUser();

  const coords = useMemo(() => {
    if (typeof localisation !== "object" || !localisation) {
      return null;
    }
    const { lat, lon } = localisation.data;
    return { lon, lat };
  }, [localisation]);

  const variables = {
    user_type: selectedType ? selectedType.value : null,
    limit: RESULT_PER_PAGE,
    offset: currentOffset,
    prefer: prefer || null,
    habilitation: habilitation || null,
    available: available || null,
  };
  let query;
  if (coords) {
    query = GET_MANDATAIRES_BY_COORDS;
    Object.assign(variables, {
      lat: coords.lat,
      lon: coords.lon,
      distanceMaxKM,
      orderBy: { distance: "asc" },
    });
  } else {
    query = GET_MANDATAIRES;
    Object.assign(variables, {
      orderBy: getOrderByVariable(orderBy, !!departement),
      searchText: debouncedSearchText ? `%${debouncedSearchText}%` : null,
      tribunal: magistrat.ti_id,
      departementCode: magistrat.ti.departement_code,
      departementFilter: departement,
    });
  }

  const { data, error, loading } = useQuery(query, {
    variables,
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { count } = data.count.aggregate;
  const totalPage = count / RESULT_PER_PAGE;

  return (
    <>
      {data.mandatairesList.map((item) => {
        const { gestionnaire } = item;
        const to = `/magistrats/gestionnaires/${gestionnaire.id}`;
        const onItemClick = (e) => {
          if (e.ctrlKey) {
            return;
          }
          e.preventDefault();
          const selection = window.getSelection().toString();
          if (selection.length > 0) {
            return;
          }
          history.push(to);
        };
        return (
          <a
            key={gestionnaire.id}
            href={to}
            onClick={onItemClick}
            draggable="false"
          >
            <MandataireListItem item={item} departementFilter={departement} />
          </a>
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
