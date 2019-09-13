import { useQuery } from "@apollo/react-hooks";
import { MesureList } from "@socialgouv/emjpm-ui-components";
import React, { Fragment, useContext, useState } from "react";
import { Flex, Box } from "rebass";
import { Button } from "@socialgouv/emjpm-ui-core";

import { MesureListStyle } from "./style";
import { formatMesureList } from "./utils";
import { FiltersContext } from "../ServicesFilters/context";
import { MESURES } from "./queries";

const Link = props => {
  const { href, children } = props;
  return <a href={href}>{children}</a>;
};
const RESULT_PER_PAGE = 20;
const ServiceMesures = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { mesureType, mesureStatus, antenne } = useContext(FiltersContext);

  const { data, error, loading, fetchMore } = useQuery(MESURES, {
    variables: {
      offset: 0,
      limit: RESULT_PER_PAGE,
      antenne: antenne ? antenne.value : undefined,
      type: mesureType ? mesureType.value : undefined,
      status: mesureStatus ? mesureStatus.value : undefined
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { count } = data.mesures_aggregate.aggregate;
  const mesures = formatMesureList(data.mesures);
  return (
    <Box sx={MesureListStyle}>
      <Fragment>
        <MesureList
          LinkComponent={props => <Link {...props} />}
          validate={id => console.log(id)}
          mesures={mesures}
        />
        {count > RESULT_PER_PAGE && count > currentPage - RESULT_PER_PAGE && (
          <Flex mt="5" alignItem="center">
            <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: currentPage + RESULT_PER_PAGE
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    setCurrentPage(currentPage + RESULT_PER_PAGE);
                    return {
                      count: fetchMoreResult.count,
                      mesures: [...prev.mesures, ...fetchMoreResult.mesures]
                    };
                  }
                });
              }}
            >
              Afficher les mandataires suivants
            </Button>
          </Flex>
        )}
      </Fragment>
    </Box>
  );
};

export { ServiceMesures };
