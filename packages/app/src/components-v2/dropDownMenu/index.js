import React from "react";

import { Card } from "@socialgouv/emjpm-ui-core";
import { Box } from "rebass";

import { Link } from "../commons/";

const menuItemStyle = {
  textAlign: "right",
  mb: "6px"
};

const menuStyle = {
  position: "absolute",
  right: 1,
  top: "45px",
  minWidth: "160px"
};

const DropDownMenu = props => {
  const { dropDownLinks } = props;
  return (
    <Box sx={menuStyle}>
      <Card pt="2" variant="sideCard">
        {dropDownLinks.map(link => {
          return (
            <Box sx={menuItemStyle} key={link.title}>
              <Link href={link.url}>{link.title}</Link>
            </Box>
          );
        })}
      </Card>
    </Box>
  );
};

export { DropDownMenu };
