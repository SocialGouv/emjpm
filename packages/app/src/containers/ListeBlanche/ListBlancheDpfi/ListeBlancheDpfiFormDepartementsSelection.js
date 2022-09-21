import { isAdmin, isDirectionNationale } from "@emjpm/biz";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";
import { Box } from "rebass";

import { getRegionDepartementList } from "~/utils/geodata";
import useUser from "~/hooks/useUser";
import { AcessibleRadioGroup } from "~/components";

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

export function ListeBlancheDpfiFormDepartementsSelection(props) {
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
      <AcessibleRadioGroup
        RadioGroupAriaLabel="Liste des agréments"
        options={options}
        onValueChange={(value) => {
          setDepartementFinanceur(value);
        }}
        renderBesideRadio={(item) => {
          const { label, value } = item;
          if (!editMode || canModifyAgrement(user, value)) {
            return (
              <Box
                sx={{
                  ":hover": {
                    color: "#aa2d2d",
                  },
                  color: "#555555",
                  cursor: "pointer",
                }}
                role="status"
              >
                <button type="button" aria-label={`Supprimer ${label}`}>
                  <XCircle
                    size={24}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(value);
                    }}
                    role="img"
                    aria-hidden="true"
                  />
                </button>
              </Box>
            );
          }
          return null;
        }}
      />
    </>
  );
}

export default ListeBlancheDpfiFormDepartementsSelection;
