import InscriptionIndividuel from "./InscriptionIndividuel";
import InscriptionPrepose from "./InscriptionPrepose";
import InscriptionService from "./InscriptionService";
import InscriptionTi from "./InscriptionTi";
import TiSelector from "./TiSelector";
import Resolve from "../common/Resolve";
import apiFetch from "../communComponents/Api";
import Router from "next/router";

const formsMandataires = {
  individuel: props => <InscriptionIndividuel {...props} />,
  prepose: props => <InscriptionPrepose {...props} />,
  service: props => <InscriptionService {...props} />,
  ti: props => <InscriptionTi {...props} />
};

const FormSelector = ({ label, value, onChange }) => (
  <td>
    <label>
      <input
        style={{ marginRight: 10 }}
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
  // only fetch client-side
  (typeof window !== "undefined" &&
    apiFetch("/inscription/tis", null, {
      forceLogin: false
    })) ||
  Promise.resolve();

class Form extends React.Component {
  state = {
    typeMandataire: null,
    tis: [],
    formData: {},
    status: "idle",
    message: ""
  };

  setTypeMandataire = e => {
    this.setState({ typeMandataire: e.target.value });
  };
  setTis = tis => {
    this.setState({ tis });
  };
  setFormData = formData => {
    this.setState({ formData });
  };

  submitUser = formData => {
    const usernameData = formData.email.toLowerCase().trim();
    const url =
      this.state.typeMandataire === "ti" ? "/inscription/tis" : "/inscription/mandataires";
    apiFetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        etablissement: formData.etablissement || "",
        tis: this.state.tis,
        type: this.state.typeMandataire,
        username: usernameData,
        mesures_en_cours: formData.mesures_en_cours || 0,
        cabinet: formData.cabinet || null
      })
    })
      .then(json => {
        if (json.success === false) {
          this.setState({ status: "error", message: json.message });
          throw new Error("Deprecated success === false response !");
        }
        Router.push("/inscription-done");
      })
      .catch(e => {
        this.setState({ status: "error", message: e && e.message });
      });
  };

  onSubmit = ({ formData }) => {
    const hasNoTi = this.state.tis.length === 0;
    const hasSingleTi = this.state.tis.length === 1;
    const hasMultipleTi = this.state.tis.length > 1;
    const isTi = this.state.typeMandataire === "ti";

    if (hasNoTi) {
      return alert("Saisissez au moins un TI de référence");
    } else if (isTi && hasMultipleTi) {
      return alert("Saisissez un seul TI de référence");
    } else {
      if ((isTi && hasSingleTi) || (!hasNoTi)) {
        this.setState({ status: "loading", formData }, () => {
          this.submitUser(formData);
        });
      }
    }
  };

  render() {
    const FormMandataire = formsMandataires[this.state.typeMandataire];
    return (
      <div className="container Inscription" data-cy="form-inscription">
        <div className="col-12 offset-sm-2 col-sm-8 offset-md-2 col-md-8">
          <h1 style={{ margin: 20 }}>Inscription</h1>
          <div style={{ backgroundColor: "white", padding: 25 }}>
            <Resolve
              promises={[() => getTis()]}
              render={({ status, result }) => (
                <div style={{ margin: "20px 0" }}>
                  <div style={{ fontSize: "1.2em", fontWeight: "bold", margin: "20px 0" }}>
                    Choisissez les tribunaux sur lesquels vous exercez :
                  </div>
                  {status === "success" && <TiSelector onChange={this.setTis} tis={result[0]} />}
                  {status === "error" && <div>Impossible de charger la liste des Tribunaux</div>}
                  {status === "loading" && <div>Chargement de la liste des Tribunaux...</div>}
                </div>
              )}
            />
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>Vous êtes :</div>
            <table
              style={{
                margin: "20px 0",
                width: "100%",
                fontSize: "1.1em"
              }}
            >
              <tbody>
                <tr>
                  <FormSelector
                    value="individuel"
                    label="Individuel"
                    onChange={this.setTypeMandataire}
                  />
                  <FormSelector value="prepose" label="Préposé" onChange={this.setTypeMandataire} />
                  <FormSelector value="service" label="Service" onChange={this.setTypeMandataire} />
                  <FormSelector
                    value="ti"
                    label="Tribunal Instance"
                    onChange={this.setTypeMandataire}
                  />
                </tr>
              </tbody>
            </table>
            {FormMandataire && (
              <FormMandataire
                typeMandataire={this.state.typeMandataire}
                onSubmit={this.onSubmit}
                formData={this.state.formData}
              />
            )}
            {this.state.status === "error" && (
              <div style={{ textAlign: "center", color: "red", fontSize: "1.1em" }}>
                {this.state.message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
