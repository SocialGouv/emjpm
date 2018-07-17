import InscriptionIndividuel from "./InscriptionIndividuel";
import InscriptionPrepose from "./InscriptionPrepose";
import InscriptionService from "./InscriptionService";
import TiSelector from "./TiSelector";
import Resolve from "../Resolve";
import apiFetch from "../communComponents/Api";

const forms = {
  Individuel: <InscriptionIndividuel style={{ width: "80%" }} />,
  Prepose: <InscriptionPrepose style={{ width: "80%" }} />,
  Service: <InscriptionService style={{ width: "80%" }} />
};

const FormSelector = ({ label, value, onChange }) => (
  <td>
    <label>
      <input
        style={{ marginRight: 5 }}
        type="radio"
        name="form_selector"
        value={value}
        onChange={onChange}
      />
      {label || value}
    </label>
  </td>
);

const getTis = () =>
  apiFetch("/inscription/tis", null, {
    forceLogin: false
  });

class Form extends React.Component {
  state = {
    form: null
  };

  setForm = e => {
    this.setState({ form: e.target.value });
  };

  render() {
    const form = forms[this.state.form];

    return (
      <div className="container">
        <div className="col-12 offset-sm-2 col-sm-8 offset-md-2 col-md-8">
          <h1 style={{ margin: 20 }}>Inscription</h1>
          <div style={{ backgroundColor: "white", padding: 5 }}>
            <Resolve
              promises={[getTis()]}
              render={({ status, result }) => (
                <div>
                  {status === "success" && <TiSelector tis={result[0]} />}
                  {status === "error" && <div>Impossible de charger la liste des Tribunaux</div>}
                </div>
              )}
            />
            <form>
              <h2 style={{ margin: 15 }}>Vous êtes un mandataire :</h2>
              <table
                style={{
                  margin: 20,
                  width: "100%",
                  marginTop: 20,
                  marginBottom: 20,
                  fontSize: "1.1em"
                }}
              >
                <tbody>
                  <tr>
                    <FormSelector value="Individuel" onChange={this.setForm} />
                    <FormSelector value="Prepose" label="Préposé" onChange={this.setForm} />
                    <FormSelector value="Service" onChange={this.setForm} />
                  </tr>
                </tbody>
              </table>
              {form}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
