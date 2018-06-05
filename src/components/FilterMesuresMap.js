import styled from "styled-components";

import SearchButton from "./SearchButton";
import FormInput from "./FormInput";

const FilterMesuresMap = ({
  props,
  updateFilters,
  zoomCodePostal,
  getPostCodeCoordinates,
  updateValue,
  value
}) => {
  let input;
    return (
        <Presentation>
            <tr className="form-inline">
                {/*<td>*/}
                {/*<FormInput*/}
                {/*padd="10"*/}
                {/*size="90"*/}
                {/*id="code_postal"*/}
                {/*name="code_postal"*/}
                {/*placeholder="Code postal"*/}
                {/*onClick={e => zoomCodePostal(e.target.value)}*/}
                {/*/>*/}
                {/*</td>*/}
                <td>
                    <FormInput
                        innerRef={node => (input = node)}
                        padd="10"
                        size="200"
                        id="commune"
                        name="commune"
                        onChange={e => updateValue(e.target.value) }
                        placeholder={value || "Commune ou Code Postal"}
                    />
                </td>
                {/*<td>*/}
                {/*<FormInput*/}
                {/*padd="10"*/}
                {/*size="160"*/}
                {/*id="nom_etablissement"*/}
                {/*name="nom_etablissement"*/}
                {/*placeholder="Nom"*/}
                {/*onSubmit={e => updateFilters({ searchNom: e.target.value })}*/}
                {/*/>*/}
                {/*</td>*/}
                <td>
                    <SearchButton align="center" type="submit" onClick={() => getPostCodeCoordinates(input.value)}>
                        Rechercher
                    </SearchButton>
                </td>
            </tr>
        </Presentation>
    );
}

const Presentation = styled.div`
  background: white;
  padding: 5px;
  width: 100%;
`;

export default FilterMesuresMap;
