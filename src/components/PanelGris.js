import CodePostalMandataire from "./CodePostalMandataire";

const PanelGris = ({ findPostcode, updateFilters, type }) => {
  return (
    <div
      style={{
        textAlign: "left",
        heigth: "100px !important"
      }}
    >
      <div className="panel__container">
        <div className="container" style={{ paddingRight: "27px", paddingLeft: "27px" }}>
          <div className="row">
            <div className="col-3">
              <CodePostalMandataire findPostcode={findPostcode} />
            </div>
            <div className="col-3">
              <input
                type={"text"}
                style={{
                  textAlign: "left",
                  width: "100%",
                  border: "1px solid"
                }}
                className="form-control mb-2"
                placeholder={"Ville"}
                onChange={e => updateFilters({ searchVille: e.target.value })}
              />
            </div>
            <div className="col-3">
              <input
                type={"text"}
                style={{
                  textAlign: "left",
                  width: "100%",
                  border: "1px solid"
                }}
                className="form-control mb-2"
                placeholder={"Nom d'établissement ou Nom"}
                onChange={e => updateFilters({ searchNom: e.target.value })}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-9">
              <div className="form-check form-check-inline">
                <input
                  style={{
                    textAlign: "left",
                    marginRight: "5px",
                    border: "1px solid",
                    borderColor: "black"
                  }}
                  onClick={e =>
                    updateFilters({
                      searchTypeIn: (e.target.checked && e.target.value) || ""
                    })}
                  type="checkbox"
                  value="Individuel"
                  className="form-check-input"
                  id="inlineCheckbox1"
                />
                <label
                  className="form-check-label"
                  style={{ color: "black", paddingRight: "5px" }}
                  htmlFor="inlineCheckbox1"
                >
                  Individuels
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  style={{
                    marginLeft: "10px",
                    textAlign: "left",
                    marginRight: "5px",
                    border: "1px solid"
                  }}
                  onChange={e =>
                    updateFilters({
                      searchTypePr: (e.target.checked && e.target.value) || ""
                    })}
                  type="checkbox"
                  value="Prepose"
                  className="form-check-input"
                  id="inlineCheckbox2"
                />
                <label
                  className="form-check-label"
                  style={{ color: "black", paddingRight: "5px" }}
                  htmlFor="inlineCheckbox2"
                >
                  Préposés
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  style={{
                    marginLeft: "10px",
                    marginRight: "5px",
                    textAlign: "left"
                  }}
                  onChange={e =>
                    updateFilters({
                      searchTypeSe: (e.target.checked && e.target.value) || ""
                    })}
                  type="checkbox"
                  value="Service"
                  className="form-check-input"
                  id="inlineCheckbox3"
                />
                <label
                  className="form-check-label"
                  style={{ color: "black", paddingRight: "5px" }}
                  htmlFor="inlineCheckbox3"
                >
                  Services
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelGris;
