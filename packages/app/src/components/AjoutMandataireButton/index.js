import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";
import {
  Wrapper,
  Menu,
  MenuItem,
  Button as MenuButton,
} from "react-aria-menubutton";
import { ChevronDown } from "@styled-icons/evil/ChevronDown";
import { ChevronUp } from "@styled-icons/evil/ChevronUp";

import "./style.css";

function AjoutMandataireButton({ buttonLinks }) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  function handleSelection(value) {
    history.push(value);
  }

  return (
    <Box>
      <Wrapper
        onMenuToggle={({ isOpen }) => setIsOpen(isOpen)}
        tag="nav"
        aria-label="Mon compte eMJPM"
        className="MandataireButton-AriaMenuButton"
        onSelection={handleSelection}
        style={{
          position: "relative",
          boxSizing: "border-box",
          margin: "0px",
          minWidth: "0px",
          padding: "0px",
        }}
      >
        <MenuButton
          className="MandataireButton-AriaMenuButton-trigger"
          title="Ajouter un mandataire"
          aria-label="Ajouter un mandataire"
        >
          <Flex>
            <Box>
              <Text fontWeight="200" ml={1}>
                Ajouter
              </Text>
            </Box>
            <Box height="25px">
              {isOpen ? (
                <ChevronUp
                  size={25}
                  role="img"
                  alt="menu ouvert"
                  pointerEvents="none"
                />
              ) : (
                <ChevronDown size={25} alt="menu fermé" pointerEvents="none" />
              )}
            </Box>
          </Flex>
        </MenuButton>
        <Menu>
          <ul className="MandataireButton-AriaMenuButton-menu">
            {buttonLinks.map((link, i) => {
              return (
                <li key={i} role="none">
                  <MenuItem
                    tag="a"
                    value={link.to}
                    text={link.title}
                    className="MandataireButton-AriaMenuButton-menuItem"
                    href={link.to}
                    title={`Ajouter un ${link.title}`}
                    aria-label={`Ajouter un ${link.title}`}
                  >
                    {link.title}
                  </MenuItem>
                </li>
              );
            })}
          </ul>
        </Menu>
      </Wrapper>
    </Box>
  );
}

export default AjoutMandataireButton;
