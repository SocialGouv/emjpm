import { Home, Map, User, UserMinus } from "react-feather";
import InscriptionIndividuel from "./InscriptionIndividuel";
import InscriptionPrepose from "./InscriptionPrepose";
import InscriptionService from "./InscriptionService";
import TiSelector from "./TiSelector";

const regions = [
  { id: 1, nom: "Auvergne-Rhône-Alpes" },
  { id: 2, nom: "Bourgogne-Franche-Comté" },
  { id: 3, nom: "Bretagne" }
];

const tis_exemple = [
  { id: 1, nom: "ti 1", id_region: 1 },
  { id: 2, nom: "ti 2", id_region: 1 },
  { id: 3, nom: "ti 3", id_region: 1 },
  { id: 4, nom: "ti 4", id_region: 2 },
  { id: 5, nom: "ti 5", id_region: 2 },
  { id: 6, nom: "ti 6", id_region: 3 },
  { id: 7, nom: "ti 7", id_region: 3 },
  { id: 8, nom: "ti 8", id_region: 3 }
];

class Form extends React.Component {
  state = {
    form: null
  };

  getForm = () => {
    if (this.state.form === "Individuel") {
      return <InscriptionIndividuel style={{ width: "80%" }} />;
    } else if (this.state.form === "Prepose") {
      return <InscriptionPrepose style={{ width: "80%" }} />;
    } else if (this.state.form === "Service") {
      return <InscriptionService style={{ width: "80%" }} />;
    }
  };

  setForm = e => {
    this.setState({ form: e.target.value });
  };

  render() {
    const form = this.getForm();

    return (
      <div className="container">
        <div className="col-12 offset-sm-2 col-sm-8 offset-md-2 col-md-8">
          <h1 style={{ margin: 20 }}>Inscription</h1>
          <div style={{ backgroundColor: "white", padding: 5 }}>
            <TiSelector tis={tis_exemple} regions={regions} />

            <form>
              <div>
                <h2 style={{ margin: 15 }}>Vous êtes un mandataire :</h2>
                <table
                  style={{
                    margin: 20,
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "20px",
                    fontSize: 14
                  }}
                >
                  <tr>
                    <td>
                      <label>
                        <input
                          style={{ marginRight: 5 }}
                          type="radio"
                          name="form_selector"
                          value="Individuel"
                          onChange={this.setForm}
                        />
                        Individuel
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          style={{ marginRight: 5 }}
                          type="radio"
                          name="form_selector"
                          value="Prepose"
                          onChange={this.setForm}
                        />
                        Préposé
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          style={{ marginRight: 5 }}
                          type="radio"
                          name="form_selector"
                          value="Service"
                          onChange={this.setForm}
                        />
                        Service
                      </label>
                    </td>
                  </tr>
                </table>
                {form}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
