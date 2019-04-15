import styled from "styled-components";
import * as XLSX from "xlsx";
import { connect } from "react-redux";

import apiFetch from "../communComponents/Api";
import { read } from "../../excel/parse";
import { validate } from "../../excel/validate";

import { mesureCreated } from "./actions/mesures";

// IE11 polyfill
import "../../readAsBinaryString";

const Alert = ({ className, Icon, children }) =>
  (children && (
    <div
      className={`alert ${className || ""}`}
      role="alert"
      style={{ marginTop: 20, marginLeft: 20, fontSize: "1.2em" }}
    >
      {Icon && (
        <Icon
          style={{
            verticalAlign: "middle",
            marginRight: 10
          }}
        />
      )}
      {children}
    </div>
  )) ||
  null;

const postSheetData = sheetData =>
  apiFetch(`/mandataires/mesures/bulk`, {
    method: "POST",
    body: JSON.stringify(sheetData)
  });

const ErrorsGroup = ({ title, errors }) => (
  <div>
    <b>{title}</b>
    <br />
    {errors && errors.map && errors.map(e => <li key={e}>{e}</li>)}
  </div>
);

const Errors = ({ errors }) =>
  (errors && Object.keys(errors).length && (
    <Alert className="alert-danger">
      Des erreurs ont été détectées dans votre fichier. Aucun ligne n&apos;a été importée.
      <br />
      <br />
      <div style={{ fontSize: "0.8em" }}>
        {Object.keys(errors).map(key => (
          <ErrorsGroup key={key} title={key} errors={errors[key]} />
        ))}
      </div>
    </Alert>
  )) ||
  null;

// read the input file, clean input and post to API
const readAndPostExcel = inputFile =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = error => {
      reject({
        fichier: ["Impossible de lire le fichier excel"]
      });
    };

    //convert the imported files into workbook: Use of xlsx React library
    reader.onload = e => {
      const workbook = XLSX.read(e.target.result, {
        type: "binary"
      });
      const sheetData = read(workbook);
      const validation = validate(sheetData);

      if (validation.errors) {
        reject(validation.errors);
      } else {
        postSheetData(sheetData)
          .then(result => {
            if (result.success === false) {
              throw new Error();
            }
            resolve(result);
          })
          .catch(() =>
            reject({
              api: ["Impossible de charger le fichier excel"]
            })
          );
      }
    };
    reader.readAsBinaryString(inputFile);
  });

const _ExcelRequirements = ({ className }) => (
  <table className={className}>
    <tbody>
      <tr>
        <td>date_ouverture</td>
        <td>Date de décision au format DD/MM/YYYY =&gt; 25/11/2010</td>
      </tr>
      <tr>
        <td>type</td>
        <td>Le type de mesure: Tutelle, Curatelle, Sauvegarde de justice, Mesure ad hoc, MAJ</td>
      </tr>
      <tr>
        <td>code_postal</td>
        <td>
          Code postal doit etre valide : par exemple 75000 n&apos;est pas un code postal valide
          =&gt; 75001
        </td>
      </tr>
      <tr>
        <td>ville</td>
        <td>Commune de la mesure</td>
      </tr>
      <tr>
        <td>civilite</td>
        <td>Genre de MP: &quot;F&quot;, &quot;H&quot;, &quot;Femme&quot;, &quot;Homme&quot;</td>
      </tr>
      <tr>
        <td>annee</td>
        <td>Date de naissance au format YYYY =&gt; 1980</td>
      </tr>
      <tr>
        <td>numero_dossier</td>
        <td>
          Le numéro de dossier tel que vous avez l&apos;habitude de le connaitre. Ce champ est libre
          et peu contenir tous types de caractères
        </td>
      </tr>
      <tr>
        <td>residence</td>
        <td>&quot;A domicile&quot; ou &quot;En établissement&quot;</td>
      </tr>
    </tbody>
  </table>
);

const ExcelRequirements = styled(_ExcelRequirements)`
  border: 1px solid silver;
  td {
    padding: 10px;
  }
  tr td:first-child {
    font-weight: bold;
    background: #eee;
  }
  tr:not(:last-child) td:first-child {
    border-bottom: 1px solid #fff;
  }
  tr:not(:last-child) td:last-child {
    border-bottom: 1px solid #eee;
  }
`;

class InputFiles extends React.Component {
  state = {
    status: null,
    message: null,
    errors: [],
    value: ""
  };

  readInputFile = e => {
    const file = e.target.files[0];
    this.setState(
      {
        status: "loading",
        errors: []
      },
      () => {
        readAndPostExcel(file)
          .then(result => {
            // todo: update counter UI
            this.setState(
              {
                status: "success",
                value: "",
                message: result.message,
                errors: []
              },
              () => {
                if (result.added && this.props.onCreateMesure) {
                  Array.from({ length: result.added }).map(() => this.props.onCreateMesure({}));
                }
              }
            );
          })
          .catch(errors => {
            this.setState({
              status: "error",
              value: "",
              errors
            });
          });
      }
    );
  };

  render() {
    return (
      <div style={{ padding: 20 }}>
        <h1>Importation d&apos;un fichier excel (mesures)</h1>
        <p>
          <b style={{ color: "red", fontSize: "1.5em" }}>
            !!!Merci de lire et de bien respecter les instructions suivantes!!!
          </b>
          <br />
          Vous trouverez ci-après le libellé des entêtes de colonnes qui doivent être présentes dans
          votre fichier excel. Aucune n&apos;est obligatoire. Attention à bien respecter la casse :
          tout en minuscule, pas d&apos;espace notamment à la fin des libellés. Les espaces sont
          remplacés par des _ (touche 8 du clavier)
        </p>
        <ExcelRequirements />
        <br />
        <br />
        <b>Cliquez ci-dessous pour importer vos mesures.</b>
        <br />
        <br />
        <input
          value={this.state.value}
          disabled={this.state.status === "loading"}
          type="file"
          style={{ padding: 5 }}
          data-cy="button-upload-excel"
          onChange={this.readInputFile}
        />
        <br />
        {this.state.status === "success" && (
          <Alert className="alert-success">
            Le fichier a bien été importé : {this.state.message}
          </Alert>
        )}
        {this.state.status === "error" && <Errors errors={this.state.errors} />}

        <div style={{ color: "red", fontSize: "1.5em", marginTop: 10 }}>
          Vous n&apos;arrivez pas à importer votre tableau excel? Envoyez-le nous par email à{" "}
          <a href="mailto:contact@emjpm.beta.gouv.fr">contact@emjpm.beta.gouv.fr</a>.
          <br />
          <br />
          Nous le vérifierons, le mettrons en page et vous le renverrons pour que vous puissiez
          l&apos;importer.{" "}
        </div>
      </div>
    );
  }
}

// use redux to update mesures count
const mapDispatchToProps = dispatch => ({
  onCreateMesure: data => dispatch(mesureCreated(data))
});

export default connect(
  null,
  mapDispatchToProps
)(InputFiles);
