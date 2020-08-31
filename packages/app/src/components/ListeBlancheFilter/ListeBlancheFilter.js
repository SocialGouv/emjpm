import { Button, Card, CheckBox, Input, Select } from "@emjpm/ui";
import { ChevronDown } from "@styled-icons/evil/ChevronDown";
import Link from "next/link";
import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Box, Flex } from "rebass";

import { departementToOptions } from "../../util/option/OptionUtil";
import { UserContext } from "../UserContext";
import { FiltersContextSerializable } from "./context";
import { BoxStyle, dropdownStyle, menuItemStyle } from "./style";

const TYPE_OPTIONS = [
  { label: "Mandataire", value: "mandataire" },
  { label: "Service", value: "service" },
];

const ListeBlancheFilter = () => {
  const ref = useRef();
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const user = useContext(UserContext);
  const { loading, error, filters, onFilterChange, departements = [] } = useContext(
    FiltersContextSerializable
  );
  const { departementFinanceur, type, nom, nom_service, siret } = filters;

  const buttonLinks = [
    { title: "Mandataire individuel", url: `/${user.type}/liste-blanche/ajout-individuel` },
    { title: "Mandataire préposé", url: `/${user.type}/liste-blanche/ajout-prepose` },
  ];

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      setButtonsEnabled(false);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, setButtonsEnabled]);

  if (loading) {
    return <div>{"Chargement..."}</div>;
  }

  if (error) {
    return <div>{"Oups, une erreur s'est produite. Veuillez réessayer ultérieurement."}</div>;
  }

  const departmentOptions = departementToOptions(departements);

  return (
    <Fragment>
      <Card sx={{ position: "relative" }}>
        <Box ref={ref} sx={{ zIndex: 99, position: "absolute", right: 2, top: 2 }}>
          {type === "service" ? (
            <Box>
              <Button ml={4}>
                <Link href={`/${user.type}/liste-blanche/ajout-service`}>
                  {"Ajouter un service"}
                </Link>
              </Button>
            </Box>
          ) : (
            <Fragment>
              <Button onClick={() => setButtonsEnabled(true)}>
                Ajouter un mandataire
                <ChevronDown size={20} />
              </Button>

              {buttonsEnabled && (
                <Box sx={dropdownStyle}>
                  <Card p="0" variant="sideCard">
                    {buttonLinks.map((link) => {
                      return (
                        <Box sx={menuItemStyle} key={link.title}>
                          <Box sx={menuItemLinkStyle}>
                            <Link href={link.url}>
                              <a>{link.title}</a>
                            </Link>
                          </Box>
                        </Box>
                      );
                    })}
                  </Card>
                </Box>
              )}
            </Fragment>
          )}
        </Box>

        <Flex flexDirection="column">
          <Flex>
            <Box sx={BoxStyle}>
              <Select
                instanceId={"filters-departement"}
                size="small"
                options={departmentOptions}
                placeholder={"Département"}
                value={
                  filters.departement
                    ? departmentOptions.find((d) => d.value === filters.departement)
                    : undefined
                }
                onChange={(option) => onFilterChange("departement", option.value)}
              />
            </Box>

            {type === "service" && (
              <Box sx={BoxStyle}>
                <Input
                  value={nom_service || ""}
                  spellCheck="false"
                  autoComplete="false"
                  onChange={(event) => onFilterChange("nom_service", event.target.value)}
                  name="search_service"
                  size="small"
                  placeholder="Nom du service"
                />
              </Box>
            )}

            {type === "mandataire" && (
              <Box sx={BoxStyle}>
                <Input
                  value={nom || ""}
                  spellCheck="false"
                  autoComplete="false"
                  onChange={(event) => onFilterChange("nom", event.target.value)}
                  name="search_mandataire"
                  size="small"
                  placeholder="Nom du mandataire"
                />
              </Box>
            )}

            <Box sx={BoxStyle}>
              <Input
                value={siret || ""}
                spellCheck="false"
                autoComplete="false"
                onChange={(event) => onFilterChange("siret", event.target.value)}
                name="search_siret"
                size="small"
                placeholder="Siret"
              />
            </Box>
          </Flex>
          <Flex mt={2}>
            <Box sx={BoxStyle}>
              <Select
                size="small"
                instanceId={"filters-type"}
                options={TYPE_OPTIONS}
                placeholder={"Type d'utilisateur"}
                value={TYPE_OPTIONS.find(({ value }) => value === type)}
                onChange={(option) => onFilterChange("type", option.value)}
              />
            </Box>
            {type === "mandataire" && (
              <Box mr={1} pt={2} width="100px">
                <CheckBox
                  instanceId={"filters-departement-financeur"}
                  label="Financé"
                  name="departementFinanceur"
                  isChecked={departementFinanceur || false}
                  onChange={() => onFilterChange("departementFinanceur", !departementFinanceur)}
                />
              </Box>
            )}
          </Flex>
        </Flex>
      </Card>
    </Fragment>
  );
};

export { ListeBlancheFilter };
