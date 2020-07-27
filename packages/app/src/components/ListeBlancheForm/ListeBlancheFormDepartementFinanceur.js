import { isAdmin, isDirectionNationale } from "@emjpm/core";
import { RadioGroup } from "@emjpm/ui";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";
import React, { Fragment, useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { UserContext } from "../../components/UserContext";

function canModifyAgrement(user, departementId) {
  if (isAdmin(user)) {
    return true;
  }
  if (isDirectionNationale(user)) {
    return true;
  }
  return user.agrements.includes(departementId);
}

export const ListeBlancheFormDepartementFinanceur = (props) => {
  const { departements, onRemove, editMode, setDepartementFinanceur } = props;
  const user = useContext(UserContext);

  const options = departements.map((d) => {
    return {
      label: d.nom,
      value: `${d.id}`,
      checked: d.departement_financeur === true,
      disabled: !canModifyAgrement(user, d.id),
    };
  });

  return (
    <Fragment>
      <Text mt={2} mb={1}>
        {`Sélectionner le département financeur:`}
      </Text>
      <RadioGroup
        value={null}
        onValueChange={(value) => {
          setDepartementFinanceur(Number(value));
        }}
        options={options}
        renderRadioLabel={(item) => {
          const { label, id } = item;
          return (
            <Flex
              sx={{
                width: "240px",
                flexBasis: "240px",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text lineHeight="20px">{label}</Text>
              {(!editMode || canModifyAgrement(user, id)) && (
                <Box
                  sx={{
                    cursor: "pointer",
                    color: "#777",
                    ":hover": {
                      color: "#aa2d2d",
                    },
                  }}
                >
                  <XCircle
                    size={24}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(Number(id));
                    }}
                  />
                </Box>
              )}
            </Flex>
          );
        }}
      />
    </Fragment>
  );
};
