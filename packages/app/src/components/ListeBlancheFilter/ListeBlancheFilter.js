import { ChevronDown } from "@styled-icons/evil/ChevronDown";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Flex } from "rebass";

import { Link } from "~/components/Commons";
import { FiltersContextSerializable } from "~/components/FiltersContextSerializable";
import { UserContext } from "~/components/UserContext";
import { Button, Card, CheckBox, Input, Select } from "~/ui";
import { useDepartements } from "~/util/departements/useDepartements.hook";
import { departementToOptions, findOption } from "~/util/option/OptionUtil";

import { BoxStyle, dropdownStyle, menuItemStyle } from "./style";

const TYPE_OPTIONS = [
  { label: "Mandataire (individuel, préposé)", value: "mandataire" },
  { label: "Association tutélaire", value: "service" },
];

function ListeBlancheFilter() {
  const ref = useRef();
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const user = useContext(UserContext);
  const { loading, error, filters, onFilterChange } = useContext(
    FiltersContextSerializable
  );
  const {
    departementFinanceur,
    type = "mandataire",
    nom,
    nom_service,
    siret,
    email,
  } = filters;

  const { departements } = useDepartements({ all: true });

  const buttonLinks = [
    {
      title: "Mandataire individuel",
      to: `/${user.type}/liste-blanche/ajout-individuel`,
    },
    {
      title: "Mandataire préposé",
      to: `/${user.type}/liste-blanche/ajout-prepose`,
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

  if (loading) {
    return <div>{"Chargement..."}</div>;
  }

  if (error) {
    return (
      <div>
        {"Oups, une erreur s'est produite. Veuillez réessayer ultérieurement."}
      </div>
    );
  }

  const departmentOptions = departementToOptions(departements);

  return (
    <Fragment>
      <Card sx={{ position: "relative" }}>
        <Box
          ref={ref}
          sx={{ position: "absolute", right: 2, top: 2, zIndex: 99 }}
        >
          {type === "service" ? (
            <Box>
              <Link to={`/${user.type}/liste-blanche/ajout-service`}>
                <Button ml={4}>{"Ajouter un service"}</Button>
              </Link>
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
                          <Link to={link.to}>{link.title}</Link>
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
                size="small"
                instanceId={"filters-type"}
                options={TYPE_OPTIONS}
                placeholder={"Type d'utilisateur"}
                value={TYPE_OPTIONS.find(({ value }) => value === type)}
                onChange={(option) => onFilterChange({ type: option.value })}
              />
            </Box>
            <Box sx={BoxStyle}>
              <Select
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
          </Flex>
          <Flex mt={2}>
            <Box sx={BoxStyle}>
              <Input
                value={siret || ""}
                spellCheck="false"
                autoComplete="false"
                onChange={(event) =>
                  onFilterChange({ siret: event.target.value })
                }
                name="search_siret"
                size="small"
                placeholder="Siret"
              />
            </Box>
            {type === "service" && (
              <Box sx={BoxStyle}>
                <Input
                  value={nom_service || ""}
                  spellCheck="false"
                  autoComplete="false"
                  onChange={(event) =>
                    onFilterChange({ nom_service: event.target.value })
                  }
                  name="search_service"
                  size="small"
                  placeholder="Nom du service"
                />
              </Box>
            )}
            {type === "mandataire" && (
              <>
                <Box sx={BoxStyle}>
                  <Input
                    value={nom || ""}
                    spellCheck="false"
                    autoComplete="false"
                    onChange={(event) =>
                      onFilterChange({ nom: event.target.value })
                    }
                    name="search_mandataire"
                    size="small"
                    placeholder="Nom"
                  />
                </Box>
                <Box sx={BoxStyle}>
                  <Input
                    value={email || ""}
                    spellCheck="false"
                    autoComplete="false"
                    onChange={(event) =>
                      onFilterChange({ email: event.target.value })
                    }
                    name="email"
                    size="small"
                    placeholder="email"
                  />
                </Box>
                <Box mr={1} pt={2} width="100px">
                  <CheckBox
                    instanceId={"filters-departement-financeur"}
                    label="Financé"
                    name="departementFinanceur"
                    isChecked={departementFinanceur || false}
                    onChange={() =>
                      onFilterChange({
                        departementFinanceur: !departementFinanceur,
                      })
                    }
                  />
                </Box>
              </>
            )}
          </Flex>
        </Flex>
      </Card>
    </Fragment>
  );
}

export { ListeBlancheFilter };
