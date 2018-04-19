import styled from "styled-components";

import CodePostalMandataire from "./CodePostalMandataire";

const CheckBox = ({ value, label, updateFilters }) => (
  <label className="form-check form-check-inline">
    <input
      style={{
        textAlign: "left",
        marginRight: "5px",
        border: "1px solid",
        borderColor: "black"
      }}
      onClick={e =>
        updateFilters({
          searchTypeIn: (e.target.checked && value) || ""
        })}
      type="checkbox"
      value={value}
      className="form-check-input"
    />
    {label}
  </label>
);

const Container = styled.div`
  background-color: #cad4de;
  width: 100%;
`;

const PanelContent = styled.div`
  min-height: 100px;
  margin: 0 auto;
  padding: 1em;
  padding-top: 1.5em;
`;

const StyledInput = styled.input`
  textalign: left;
  width: 100%;
  border: 1px solid silver;
`;

const BootstrapInput = props => <StyledInput className="form-control mb-2" {...props} />;

const PanelFilterMandataires = ({ findPostcode, updateFilters, type }) => (
  <Container>
    <PanelContent className="container">
      <div className="row">
        <div className="col-12 col-sm-4">
          <CodePostalMandataire findPostcode={findPostcode} className="form-control mb-2" />
        </div>
        <div className="col-12 col-sm-4">
          <BootstrapInput
            type={"text"}
            placeholder={"Ville"}
            onChange={e => updateFilters({ searchVille: e.target.value })}
          />
        </div>
        <div className="col-12 col-sm-4">
          <BootstrapInput
            type={"text"}
            placeholder={"Nom d'établissement ou Nom"}
            onChange={e => updateFilters({ searchNom: e.target.value })}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12">
          <CheckBox label="Individuels" value="Individuel" updateFilters={updateFilters} />
          <CheckBox label="Préposés" value="Prepose" updateFilters={updateFilters} />
          <CheckBox label="Services" value="Service" updateFilters={updateFilters} />
        </div>
      </div>
    </PanelContent>
  </Container>
);

export default PanelFilterMandataires;
