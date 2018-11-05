import * as XLSX from "xlsx";
import styled from "styled-components";

import apiFetch from "../communComponents/Api";
import { cleanInputData, validateData } from "../common/AnalyseExcel";

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
  apiFetch(`/mandataires/1/bulk`, {
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
  (errors &&
    Object.keys(errors).length && (
      <Alert className="alert-danger">
        Des erreurs ont été détectées dans votre fichier. Aucun ligne n'a été importée.
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
const readAndPostExcel = target =>
  new Promise((resolve, reject) => {
    // ???????
    const rABS = true;

    const f = target.files[0];
    const reader = new FileReader();

    reader.onerror = error => {
      reject({
        fichier: ["Impossible de lire le fichier excel"]
      });
    };

    //convert the imported files into workbook: Use of xlsx React library
    reader.onload = e => {
      let data = e.target.result;
      if (!rABS) data = new Uint8Array(data);
      const workbook = XLSX.read(data, {
        type: rABS ? "binary" : "array"
      });

      // convert workbook into Arrays of arrays: Use of xlsx React library
      const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
      const dataInput = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });
      console.log("dataInput", dataInput);
      const sheetData = cleanInputData(dataInput);
      console.log("sheetData", sheetData);
      const validate = validateData(sheetData);

      if (validate.errors) {
        reject(validate.errors);
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
    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
  });

const _ExcelRequirements = ({ className }) => (
  <table className={className}>
    <tbody>
      <tr>
        <td>date_ouverture</td>
        <td>Date de décision. Elle doit etre mise au format DD/MM/YYYY => 8/11/2010</td>
      </tr>
      <tr>
        <td>type</td>
        <td>
          Le type de mesure: "Tutelle", "Curatelle", "Sauvegarde de justice", "Mesure ad hoc", "MAJ"
        </td>
      </tr>
      <tr>
        <td>code_postal</td>
        <td>
          Code postal doit etre valide : par exmple 75000 n'est pas un code postal valide => 75001
        </td>
      </tr>
      <tr>
        <td>ville</td>
        <td> Commune de la mesure</td>
      </tr>
      <tr>
        <td>civilite</td>
        <td>Genre de MP: "F","H"</td>
      </tr>
      <tr>
        <td>annee</td>
        <td>Soit date de naissance du type DD/MM/YYYY => 10/08/1980 ou alors juste 1980</td>
      </tr>
      <tr>
        <td>numero_dossier</td>
        <td>Un numéro pour vous retrouver rapidement</td>
      </tr>
      <tr>
        <td>residence</td>
        <td>"A domicile" ou "En établissement"</td>
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
    errors: []
  };

  readInputFile = e => {
    const target = e.target;
    this.setState(
      {
        status: "loading",
        errors: []
      },
      () => {
        readAndPostExcel(target)
          .then(result => {
            this.setState({
              status: "success",
              message: result.message,
              errors: []
            });
          })
          .catch(errors => {
            this.setState({
              status: "error",
              errors
            });
          });
      }
    );
  };

  render() {
    return (
      <div style={{ padding: 10 }}>
        <h1>Importation d'un fichier excel (mesures)</h1>
        <p>
          <b>En-têtes de colonnes obligatoires dans la première feuille de votre fichier XSLX</b>
        </p>
        <ExcelRequirements />
        <p>
          <br />
          <b>Cliquez ci-dessous pour importer vos mesures.</b>
          <br />
          <br />
          <input
            disabled={this.state.status === "loading"}
            type="file"
            style={{ padding: 5 }}
            data-cy="button-upload-excel"
            onChange={this.readInputFile}
          />
        </p>
        {this.state.status === "success" && (
          <Alert className="alert-success">
            Le fichier a bien été importé : {this.state.message}
          </Alert>
        )}
        {this.state.status === "error" && <Errors errors={this.state.errors} />}
      </div>
    );
  }
}

export default InputFiles;
