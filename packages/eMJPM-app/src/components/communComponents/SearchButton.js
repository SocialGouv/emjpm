import styled from "styled-components";

export const SearchButton = styled.button`
  background: #43b04a;
  height: 40px;
  width: auto;
  text-align: center;
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid;
  border-color: #43b04a;
  border-radius: 3px;
  box-shadow: 2px 2px 1px #c0c0c0;
  font-size: 17px;
  font-weight: Bold;
  margin: 5px;
  &:hover {
    border-color: #69a65d;
    background: #69a65d;
  }
`;

export default SearchButton;
