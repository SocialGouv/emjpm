import styled from "styled-components";

import SearchButton from "./SearchButton";
import FormInput from "./FormInput";

const FilterMesuresMap = ({ props }) => (
    <Presentation>
        <tr className="form-inline">
            <td>
                <FormInput
                    padd="10"
                    size="120"
                    id="code_postal"
                    name="code_postal"
                    placeholder="Code postal"
                />
            </td>
            <td>
                <FormInput padd="10" size="260" id="commune" name="commune" placeholder="Commune" />
            </td>
            <td>
                <FormInput
                    padd="10"
                    size="260"
                    id="nom_etablissement"
                    name="nom_etablissement"
                    placeholder="Nom d'établissement"
                />
            </td>
            <td>
                <SearchButton align="center" type="submit">
                    Rechercher
                </SearchButton>
            </td>
        </tr>
    </Presentation>
);

const Presentation = styled.div`
    background: white;
    padding: 5px;
    width: 812px;
`;

export default FilterMesuresMap;
