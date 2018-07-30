import styled from "styled-components";

const variants = {
  default: {
    background: "#43b04a",
    backgroundHover: "#69a65d"
  },
  error: {
    background: "#da4747",
    backgroundHover: "#ff2e00"
  }
};

const getColor = property => props =>
  (variants[props.error && "error"] || variants.default)[property];

export const Button = styled.button`
  background: ${getColor("background")};
  height: 40px;
  width: auto;
  text-align: center;
  color: white;
  padding: 0 15px;
  border: 1px solid;
  border-color: ${getColor("background")};
  border-radius: 3px;
  box-shadow: 2px 2px 1px #c0c0c0;
  font-size: 1.1em;
  margin: 5px;
  cursor: pointer;
  &:hover {
    border-color: ${getColor("backgroundHover")};
    background: ${getColor("backgroundHover")};
  }
`;

export default Button;
