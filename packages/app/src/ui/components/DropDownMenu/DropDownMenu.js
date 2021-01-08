import PropTypes from "prop-types";

import { Box, Button } from "rebass";

import { Card } from "../../core";

const menuItemStyle = {
  "&:hover": {
    bg: "whiteGray",
  },
  color: "black",
  display: "block",
  fontSize: 1,
  px: 3,
  py: 2,
  textAlign: "right",
};

const menuStyle = {
  minWidth: "180px",
  position: "absolute",
  right: 1,
  top: "45px",
};

const buttonStyle = {
  "&:hover": {
    bg: "whiteGray",
  },
  background: "none",
  border: "none",
  borderRadius: 0,
  color: "black",
  display: "block",
  fontSize: 1,
  fontWeight: "body",
  outline: "none",
  p: 0,
  px: 3,
  py: 2,
  textAlign: "right",
  width: "100%",
};

const separatorStyle = {
  bg: "whiteGray",
  height: "1px",
  mb: "3px",
  mt: "3px",
  width: "100%",
};

const DropDownMenu = (props) => {
  const { dropDownLinks, Link, disconnect } = props;
  return (
    <Box sx={menuStyle}>
      <Card p="0" variant="sideCard">
        {dropDownLinks.map((link) => {
          return (
            <Box key={link.title}>
              <Link sx={menuItemStyle} to={link.to}>
                {link.title}
              </Link>
            </Box>
          );
        })}
        <Box sx={separatorStyle} />
        <Button sx={buttonStyle} onClick={disconnect}>
          Se déconnecter
        </Button>
      </Card>
    </Box>
  );
};

DropDownMenu.propTypes = {
  Link: PropTypes.elementType.isRequired,
  disconnect: PropTypes.func.isRequired,
  dropDownLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export { DropDownMenu };
