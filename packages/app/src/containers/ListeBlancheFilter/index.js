import { ChevronDown } from "@styled-icons/evil/ChevronDown";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Flex } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { Link } from "~/containers/Commons";
import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import useUser from "~/hooks/useUser";
import { Button, Card, CheckBox, Input, AccessibleSelect } from "~/components";
import { useDepartements } from "~/utils/departements/useDepartements.hook";
import { createDepartementOptions } from "~/utils/geodata";
import { findOption } from "~/utils/form";

import { BoxStyle, dropdownStyle, menuItemStyle } from "./style";

function ListeBlancheFilter() {
  const ref = useRef();
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const user = useUser();
  const { loading, error, filters, onFilterChange } = useContext(
    FiltersContextSerializable
  );
  const { departementFinanceur, search } = filters;

  const { departements } = useDepartements({ all: true });

  const buttonLinks = [
    {
      title: "Mandataire Individuel",
      to: `/${user.type}/liste-blanche/ajout-individuel`,
    },
    {
      title: "Mandataire Préposé",
      to: `/${user.type}/liste-blanche/ajout-prepose`,
    },
    {
      title: "Service",
      to: `/${user.type}/liste-blanche/ajout-service`,
    },
  ];

  useEffect(() => {
    function listener(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      setButtonsEnabled(false);
    }
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, setButtonsEnabled]);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const departmentOptions = createDepartementOptions(departements, {
    all: true,
    formatLabel: ({ nom }) => nom,
  });

  return (
    <>
      <Card sx={{ position: "relative" }} tabIndex="0" id="direction_filter">
        <Box
          ref={ref}
          sx={{ position: "absolute", right: 2, top: 2, zIndex: 99 }}
        >
          <>
            <Button onClick={() => setButtonsEnabled(true)}>
              Ajouter
              <ChevronDown size={20} />
            </Button>

            {buttonsEnabled && (
              <Box sx={dropdownStyle}>
                <Card p="0" variant="sideCard">
                  {buttonLinks.map((link) => {
                    return (
                      <Box sx={menuItemStyle} key={link.title}>
                        <Link to={link.to}>{link.title}</Link>
                      </Box>
                    );
                  })}
                </Card>
              </Box>
            )}
          </>
        </Box>

        <Flex flexDirection="column">
          <Flex>
            <Box sx={BoxStyle}>
              <AccessibleSelect
                instanceId={"filters-departement"}
                size="small"
                options={departmentOptions}
                placeholder={"Département"}
                value={
                  filters.departement
                    ? findOption(departmentOptions, filters.departement)
                    : undefined
                }
                onChange={(option) =>
                  onFilterChange({ departement: option.value })
                }
              />
            </Box>
            <Box sx={BoxStyle}>
              <Input
                name="search"
                value={search || ""}
                spellCheck="false"
                autoComplete="false"
                onChange={(event) =>
                  onFilterChange({ search: event.target.value })
                }
                size="small"
                label="Rechercher"
                placeholder="nom, prénom, email ou SIRET"
                aria-label="Rechercher"
              />
            </Box>
            <Box mr={1} pt={2} width="250px">
              <CheckBox
                instanceId={"filters-departement-financeur"}
                label="Financés par le département"
                name="departementFinanceur"
                isChecked={departementFinanceur || false}
                onChange={() =>
                  onFilterChange({
                    departementFinanceur: !departementFinanceur,
                  })
                }
              />
            </Box>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

export { ListeBlancheFilter };
