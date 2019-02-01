import styled from "styled-components";

export const FormInput = styled.input`
  margin-left: 5px;
  padding: 2px 5px;
  height: 40px;
  width: ${props => props.size}px;
  border: 1px solid;
  border-color: gray;
  border-radius: 3px;
  box-shadow: 0px;
`;

export default FormInput;
