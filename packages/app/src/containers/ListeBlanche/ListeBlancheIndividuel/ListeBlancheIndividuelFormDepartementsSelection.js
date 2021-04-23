import { isAdmin, isDirectionNationale } from "@emjpm/biz";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";

import { Box, Flex, Text } from "rebass";

import { getRegionDepartementList } from "~/utils/geodata";
import useUser from "~/hooks/useUser";
import { RadioGroup } from "~/components";

function canModifyAgrement(user, departementCode) {
  if (isAdmin(user)) {
    return true;
  }
  if (isDirectionNationale(user)) {
    return true;
  }
  const agrements = user.directions.reduce((list, direction) => {
    if (direction.type === "regional") {
      for (const { code } of getRegionDepartementList(direction.region.id)) {
        list.push(code);
      }
    } else {
      list.push(direction.departement.id);
    }
    return list;
  }, []);
  return agrements.includes(departementCode);
}

export function ListeBlancheIndividuelFormDepartementsSelection(props) {
  const { departements, onRemove, editMode, setDepartementFinanceur } = props;
  const user = useUser();

  const options = departements.map((d) => {
    return {
      checked: d.departement_financeur === true,
      disabled: !canModifyAgrement(user, d.id),
      label: d.nom,
      value: `${d.id}`,
    };
  });

  return (
    <>
      <RadioGroup
        value={null}
        onValueChange={(value) => {
          setDepartementFinanceur(value);
        }}
        options={options}
        renderRadioLabel={(item) => {
          const { label, id } = item;
          return (
            <Flex
              sx={{
                flexBasis: "240px",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "240px",
              }}
            >
              <Text lineHeight="20px">{label}</Text>
              {(!editMode || canModifyAgrement(user, id)) && (
                <Box
                  sx={{
                    ":hover": {
                      color: "#aa2d2d",
                    },
                    color: "#777",
                    cursor: "pointer",
                  }}
                >
                  <XCircle
                    size={24}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(id);
                    }}
                  />
                </Box>
              )}
            </Flex>
          );
        }}
      />
    </>
  );
}

export default ListeBlancheIndividuelFormDepartementsSelection;
