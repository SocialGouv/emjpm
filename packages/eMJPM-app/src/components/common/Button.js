import styled from "styled-components";
import { lighten } from "@wessberg/color";

const variants = {
  default: {
    background: "#43b04a",
    backgroundHover: "#69a65d"
  },
  error: {
    background: "#da4747",
    backgroundHover: "#ff2e00"
  },
  black: {
    background: "#444444",
    backgroundHover: "#222222"
  }
};

const getColor = property => props =>
  (variants[(props.error && "error") || (props.black && "black")] || variants.default)[property];

export const Button = styled.button`
  background: ${props => getColor("background")(props)};
  border: 1px solid ${props => lighten(getColor("background")(props), 20)};
  height: 40px;
  width: auto;
  text-align: center;
  color: white;
  padding: 0 15px;
  border-radius: 3px;
  box-shadow: 2px 2px 1px #c0c0c0;
  font-size: 1.1em;
  margin: 5px;
  cursor: pointer;
  &:hover {
    border-color: ${props => lighten(getColor("background")(props), 30)};
    background: ${props => lighten(getColor("background")(props), 10)};
  }
`;

export default Button;
