import CodePostalMandataire from "./CodePostalMandataire";

const PanelGris = ({ findPostcode, updateFilters, type }) => {
    return (
        <div
            className="panel"
            style={{
                textAlign: "left",
                backgroundSize: "cover",
                heigth: "100px !important",
                backgroundColor: "#cccccc"
            }}
        >
            <div className="panel__container">
                <div
                    className="container"
                    style={{ paddingRight: "27px", paddingLeft: "27px" }}
                >
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
                        <div className="col-3">
                            <select
                                id="type"
                                className=" custom-select mr-sm-2"
                                style={{
                                    marginLeft: 0,
                                    textAlign: "left",
                                    border: "1px solid"
                                }}
                                onChange={e => updateFilters({ specialite: e.target.value })}
                            >
                                <option value="">Spécialités</option>
                                <option value="Langage des signes">Langage des signes</option>
                                <option value="Langues étrangères">Langues étrangères</option>
                                <option value="Gros patrimoine">Gros patrimoine</option>
                                <option value="Droit de filiation">Droit de filiation</option>
                                <option value="Personnes âgées">Personnes âgées</option>
                                <option value="Handicap">Handicap</option>
                                <option value="Psychopathologie">Psychopathologie</option>
                                <option value="Comportements violents">
                                    Comportements violents
                                </option>
                                <option value="Radicalisation">Radicalisation</option>
                            </select>
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
                                        })
                                    }
                                    type="checkbox"
                                    value="Individuels"
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
                                        })
                                    }
                                    type="checkbox"
                                    value="Preposes"
                                    className="form-check-input"
                                    id="inlineCheckbox2"
                                />
                                <label
                                    className="form-check-label"
                                    style={{ color: "black", paddingRight: "5px" }}
                                    htmlFor="inlineCheckbox2"
                                >
                                    Préposés d'établissements
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
                                        })
                                    }
                                    type="checkbox"
                                    value="Services"
                                    className="form-check-input"
                                    id="inlineCheckbox3"
                                />
                                <label
                                    className="form-check-label"
                                    style={{ color: "black", paddingRight: "5px" }}
                                    htmlFor="inlineCheckbox3"
                                >
                                    Mandataire de Service
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
