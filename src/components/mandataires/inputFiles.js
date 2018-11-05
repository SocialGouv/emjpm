import * as XLSX from "xlsx";
import apiFetch from "../communComponents/Api";
import { cleanInputData, validateData } from "../common/AnalyseExcel";

// ???????
const rABS = true;

const Alert = ({ className, Icon, message }) =>
  (message && (
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
      {message}
    </div>
  )) ||
  null;

const postSheetData = sheetData =>
  apiFetch(`/mandataires/1/bulk`, {
    method: "POST",
    body: JSON.stringify(sheetData.slice(1))
  });

const errorsToHtml = (title, errors) => (
  <div>
    <b>{title}</b>
    <br />
    {errors.map(e => (
      <li key={e}>{e}</li>
    ))}
  </div>
);

const Errors = ({ errors }) =>
  Object.keys(errors).map(key => (
    <Alert key={key} className="alert-danger" message={errorsToHtml(key, errors[key])} />
  ));

const readExcel = target =>
  new Promise((resolve, reject) => {
    const f = target.files[0];
    const reader = new FileReader();

    reader.onerror = error => {
      reject({
        fichier: "Impossible de lire le fichier excel"
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

      const sheetData = cleanInputData(dataInput);

      const errors = validateData(sheetData);

      if (Object.keys(errors).length) {
        reject(errors);
      } else {
        postSheetData(sheetData)
          .then(result => {
            resolve(result);
          })
          .catch(_ =>
            reject({
              api: "Impossible de charger le fichier excel"
            })
          );
      }
    };
    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
  });

class InputFiles extends React.Component {
  state = {
    status: null,
    errors: []
  };

  readInputFile = e => {
    const target = e.target;
    this.setState(
      {
        status: null,
        errors: []
      },
      () => {
        readExcel(target)
          .then(() => {
            this.setState({
              status: "success",
              errors: []
            });
            //window.location.reload();
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
        <h1>Importation d'un fichier excel (format XLSX)</h1>
        <p>
          <br />
          <br />- Changer les entêtes de colonnes avec les entêtes obligatoire: "date_ouverture",
          "type", "code_postal", "ville", "civilite", "annee", "numero_dossier", "residence"
          <br />- "date_ouverture" : est la date de décision. Elle doit etre mise sous forme
          DD/MM/YYYY => 8/11/2010
          <br />- "type": Le type de mesure: "Tutelle", "Curatelle", "Sauvegarde de justice",
          "Mesure ad hoc", "MAJ"
          <br />
          -"code_postal": Code postal doit etre valide : par exmple 75000 n'est pas un code postal
          valide => 75001
          <br />- "ville" : Commune de la mesure
          <br />
          -"civilite": Genre de MP: "F","H"
          <br />- "annee": Soit date de naissance du type DD/MM/YYYY => 10/08/1980 ou alors juste
          1980
          <br />
          -"numero_dossier": Un numéro pour vous retrouver rapidement
          <br />
          -"residence" : "A domicile" ou "En établissement"
          <br />
          <br />
          Vous pouvez laisser les autres entêtes de colonnes ...
          <br />
          <br />
          Appuyez sur le boutton importer.
        </p>
        <input type="file" onChange={this.readInputFile} />
        {this.state.status === "success" && <div>Le fichier a bien été importé</div>}
        {this.state.status === "error" && <Errors errors={this.state.errors} />}
      </div>
    );
  }
}

export default InputFiles;
