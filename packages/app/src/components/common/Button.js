import { lighten } from "polished";
import styled from "styled-components";

const variants = {
  black: {
    background: "#444444",
    backgroundHover: "#222222"
  },
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
  (variants[(props.error && "error") || (props.black && "black")] || variants.default)[property];

export const Button = styled.button`
  background: ${props => getColor("background")(props)};
  border: 1px solid ${props => lighten(0.2, getColor("background")(props))};
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
  svg {
    vertical-align: middle;
  }
  &:hover {
    border-color: ${props => lighten(0.3, getColor("background")(props))};
    background: ${props => lighten(0.1, getColor("background")(props))};
  }
`;

export default Button;
