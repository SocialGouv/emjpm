import { RadioGroup } from "@emjpm/ui";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";
import React, { Fragment, useMemo, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { DepartementFormUtil } from "../../../util/departements";

export const ListeBlancheFormDepartementFinanceur = ({ lbDepartements, setLbDepartements }) => {
  const options = useMemo(() => {
    return DepartementFormUtil.departementToOptions(
      lbDepartements.map((lbDepartement) => lbDepartement.departement)
    );
  }, [lbDepartements]);

  const initialValue = useMemo(() => {
    const departement_financeur = lbDepartements.find((x) => x.departement_financeur);
    if (departement_financeur) {
      return departement_financeur.departement.code;
    }
  }, [lbDepartements]);

  const [selectedValue, setSelectedValue] = useState(initialValue);

  function selectDepartementFinanceur(codeFinanceur) {
    setSelectedValue(codeFinanceur);
    if (codeFinanceur) {
      setLbDepartements(
        lbDepartements.map((lbDepartement) => {
          const departement_financeur = codeFinanceur === lbDepartement.departement.code;
          return {
            ...lbDepartement,
            departement_financeur,
          };
        })
      );
    }
  }

  function onRemoveDepartement(option) {
    if (option && option.departement) {
      const index = lbDepartements.findIndex(
        (lbDepartement) => lbDepartement.departement.code === option.departement.code
      );
      if (index > -1) {
        setLbDepartements(removeFromArray(lbDepartements, index));
      }
    }
  }
  return options.length ? (
    <Fragment>
      <Text mt={2} mb={1}>
        {"Sélectionner le département financeur:"}
      </Text>
      <RadioGroup
        value={selectedValue}
        onValueChange={(value) => {
          if (value && (!selectedValue || value !== selectedValue)) {
            setTimeout(() => selectDepartementFinanceur(value));
          }
        }}
        options={options}
        renderRadioLabel={({ label, option }) => {
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
                    onRemoveDepartement(option);
                  }}
                />
              </Box>
            </Flex>
          );
        }}
      />
    </Fragment>
  ) : null;
};

function removeFromArray(array, index) {
  // https://stackoverflow.com/questions/40737482/immutable-change-elements-in-array-with-slice-no-splice#40737615
  return array.slice(0, index).concat(array.slice(index + 1));
}
