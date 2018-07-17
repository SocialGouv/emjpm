import InscriptionIndividuel from "./InscriptionIndividuel";
import InscriptionPrepose from "./InscriptionPrepose";
import InscriptionService from "./InscriptionService";
import TiSelector from "./TiSelector";
import Resolve from "../Resolve";
import apiFetch from "../communComponents/Api";

const formsMandataires = {
  individuel: props => <InscriptionIndividuel style={{ width: "80%" }} {...props} />,
  preposes: props => <InscriptionPrepose style={{ width: "80%" }} {...props} />,
  service: props => <InscriptionService style={{ width: "80%" }} {...props} />
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

const onSubmit = formData => {
  console.log({ formData });
  return Promise.resolve();
  /*apiFetch(`/mandataires/1`, {
      method: "POST",
      body: JSON.stringify({
      username:
      pass1:
      pass2:
      nom:
      prenom:
      telephone:
      telephone_portable:
      email:
      adresse:
      code_postal:
      ville:

      })
    }).then(json => {
     piwik.push(["trackEvent", "Inscription", "Individuel"]);
     // this.props.updateMadataire(json);
    });*/
};

const getTis = () =>
  apiFetch("/inscription/tis", null, {
    forceLogin: false
  });

class Form extends React.Component {
  state = {
    typeMandataire: null,
    tis: [],
    formData: {},
    status: "idle"
  };

  setTypeMandataire = e => {
    this.setState({ typeMandataire: e.target.value });
  };
  setTis = tis => {
    this.setState({ tis });
  };
  onSubmit = ({ formData }) => {
    this.setState({ status: "loading", formData }, () => {
      onSubmit({
        ...formData,
        tis: this.state.tis.join(","),
        type: this.state.typeMandataire
      })
        .then(() => {
          this.setState({ status: "success" });
        })
        .catch(() => {
          this.setState({ status: "error" });
        });
    });
  };

  render() {
    const FormMandataire = formsMandataires[this.state.typeMandataire];
    return (
      <div className="container">
        <div className="col-12 offset-sm-2 col-sm-8 offset-md-2 col-md-8">
          <h1 style={{ margin: 20 }}>Inscription</h1>
          <div style={{ backgroundColor: "white", padding: 5 }}>
            <Resolve
              promises={[getTis()]}
              render={({ status, result }) => (
                <div>
                  {status === "success" && <TiSelector onChange={this.setTis} tis={result[0]} />}
                  {status === "error" && <div>Impossible de charger la liste des Tribunaux</div>}
                </div>
              )}
            />
            <div style={{ fontSize: "1.2em", fontWeight: "bold", margin: 20 }}>
              Vous êtes un mandataire :
            </div>
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
                  <FormSelector value="individuel" onChange={this.setTypeMandataire} />
                  <FormSelector
                    value="preposes"
                    label="Préposé"
                    onChange={this.setTypeMandataire}
                  />
                  <FormSelector value="service" onChange={this.setTypeMandataire} />
                </tr>
              </tbody>
            </table>
            {(FormMandataire && (
              <FormMandataire onSubmit={this.onSubmit} formData={this.state.formData} />
            )) ||
              null}
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
