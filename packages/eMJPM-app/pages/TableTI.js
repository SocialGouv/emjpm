import TabeRow from "./TabeRow";

const TableTi = ({
                     rows,
                     updateFilters,
                     openModal,
                 }) => {
    return (
        <div className="row">
            <div
                className="table table-bordered table-striped responsive table-hover "
                style={{tableLayout: "fixed", backgroundColor: "#eaf4f9"}}
            >
                <thead>
                <tr style={{backgroundColor: "white", alignText: "center"}}>
                    <td style={{border: 0, color: "white"}}>
                        <select
                            id="type"
                            class="custom-select mr-sm-2"
                            onChange={e => updateFilters({searchType: e.target.value})}
                        >
                            <option value="">Type MJPM...</option>
                            <option value="preposes">Préposés</option>
                            <option value="prives">Individuels</option>
                            <option value="services">Services</option>
                        </select>
                    </td>

                    <td>
                        <input
                            type={"text"}
                            className="form-control mb-2"
                            style={{textAlign: "center"}}
                            placeholder={"Lieux"}
                            onChange={e => updateFilters({searchVille: e.target.value})}
                        />
                    </td>
                    <td>
                        <input
                            type={"text"}
                            style={{textAlign: "center"}}
                            className="form-control mb-2"
                            placeholder={"Identité"}
                            onChange={e => updateFilters({searchNom: e.target.value})}
                        />
                    </td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                        Disponibilite
                    </td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                        Contact
                    </td>
                    <td>
                    </td>
                </tr>
                </thead>
                <tbody>
                {rows.map(mandataire => (

                    <TabeRow
                        manda={mandataire}
                        updateFilters={this.updateFilters}
                        onClick={() => openModal(mandataire)}
                    />
                ))}
                </tbody>
            </div>
        </div>
    );
};
export default TableTi;
