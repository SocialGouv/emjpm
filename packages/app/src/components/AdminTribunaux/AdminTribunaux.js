import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Text } from "@emjpm/ui";
import { Lock } from "@styled-icons/boxicons-solid/Lock";
import React, { useContext, useState } from "react";
import { Box, Flex } from "rebass";

import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { AdminEditTribunal } from "./AdminEditTribunal";
import { AdminTribunalMagistrats } from "./AdminTribunalMagistrats";
import { TRIBUNAUX } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const RowItem = ({ item }) => {
  const {
    id,
    etablissement,
    code_postal,
    ville,
    siret,
    immutable,
    magistrats_aggregate: {
      aggregate: { count },
    },
    magistrats,
  } = item;
  const [editMode, setEditMode] = useState(false);

  const toogleEditMode = () => setEditMode(!editMode);

  return (
    <>
      <Card sx={cardStyle} width="100%">
        <Flex justifyContent="space-between">
          <Box>
            <Flex justifyContent="space-start">
              <Flex width="50px" flexDirection="column">
                <Text sx={labelStyle}>id</Text>
                <Text sx={descriptionStyle}>{id}</Text>
              </Flex>
              <Flex width="350px" flexDirection="column">
                <Text sx={labelStyle}>Nom</Text>
                <Flex>
                  {immutable && <Lock size="16" />}
                  <Text sx={descriptionStyle}>{etablissement}</Text>
                </Flex>
              </Flex>
              <Flex width="300px" flexDirection="column">
                <Text sx={labelStyle}>Ville</Text>
                <Text sx={descriptionStyle}>
                  {ville} ({code_postal})
                </Text>
              </Flex>
              <Flex width="200px" flexDirection="column">
                <Text sx={labelStyle}>SIRET</Text>
                <Text sx={descriptionStyle}>{siret}</Text>
              </Flex>
              <Flex width="100px" flexDirection="column">
                <Text sx={labelStyle}>Magistrats</Text>
                <Text sx={descriptionStyle}>{count}</Text>
              </Flex>
            </Flex>
          </Box>
          <Box mr="1" width="120px" textAlign="center">
            <Button width="120px" onClick={toogleEditMode} variant="outline">
              Voir
            </Button>
          </Box>
        </Flex>
      </Card>
      {editMode && (
        <Card>
          <AdminTribunalMagistrats magistrats={magistrats} />
          {!immutable && (
            <AdminEditTribunal tribunal={item} closePanel={toogleEditMode} />
          )}
        </Card>
      )}
    </>
  );
};

const AdminTribunaux = () => {
  const resultPerPage = 20;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { debouncedSearchText, selectedDepartementCode } = useContext(
    AdminFilterContext
  );

  const { data, error, loading } = useQuery(TRIBUNAUX, {
    fetchPolicy: "network-only",
    variables: {
      departementCode: selectedDepartementCode,
      limit: resultPerPage,
      offset: currentOffset,
      searchText:
        debouncedSearchText && debouncedSearchText !== ""
          ? `${debouncedSearchText}%`
          : null,
    },
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { count } = data.tis_aggregate.aggregate;
  const tis = data.tis;

  return (
    <PaginatedList
      entries={tis}
      RowItem={RowItem}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export { AdminTribunaux };
