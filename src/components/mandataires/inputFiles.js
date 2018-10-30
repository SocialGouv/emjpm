import { CheckCircle, XCircle } from "react-feather";
import * as XLSX from "xlsx";
import apiFetch from "../communComponents/Api";

const rABS = true;

const Alert = ({ className, Icon, message }) =>
  (message && (
    <div
      className={`alert ${className || ""}`}
      role="alert"
      style={{ marginTop: 20, marginLeft: 20, fontSize: "1.2em" }}
    >
      <Icon
        style={{
          verticalAlign: "middle",
          marginRight: 10
        }}
      />{" "}
      {message}
    </div>
  )) ||
  null;

const ErrorBox = ({ message }) => (
  <Alert className="alert-danger" Icon={XCircle} message={message} />
);

const SucessBox = ({ message }) => (
  <Alert className="alert-success" Icon={CheckCircle} message={message} />
);

const defaultColumns = [
  "date_ouverture",
  "type",
  "code_postal",
  "ville",
  "civilite",
  "annee",
  "numero_dossier",
  "residence"
];

class InputFiles extends React.Component {
  state = {
    status: null
  };

  uploadDocumentRequest = files => {
    const f = files[0];
    const reader = new FileReader();

    //convert the imported files into workbook: Use of xlsx React library
    reader.onload = function(e) {
      const data = e.target.result;
      if (!rABS) data = new Uint8Array(data);
      const workbook = XLSX.read(data, {
        type: rABS ? "binary" : "array"
      });

      // convert workbook into Arrays of arrays: Use of xlsx React library
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const dataInput = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

      //convert Arrays of arrays into Object and filters only needed importation keys
      const cols = dataInput[0];
      const splitRow = dataInput.map(datum => datum.reduce((a, c, i) => ({ ...a, [cols[i]]: c })));
      splitRow.map(mesure => {
        const Objet1 = Object.keys(mesure).filter(key => !defaultColumns.includes(key));
        Objet1.map(objet => delete mesure[objet]);
      });

      // convert values before sending by HTTP request
      splitRow.map(
        datum =>
          (datum["date_ouverture"] = new Date((datum.date_ouverture - (25567 + 2)) * 86400 * 1000))
      );

      console.log("splitRow", splitRow);

      apiFetch(`/mandataires/1/files`, {
        method: "POST",
        body: JSON.stringify(splitRow.slice(1))
      }).then(result => {
        this.setState({
          status: result.success
        });
      });
    };
    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
  };

  render() {
    return (
      <div>
        <input type="file" onChange={e => this.uploadDocumentRequest(e.target.files)} />
        {this.state.status &&
          (this.state.status === "noSuccess" ? (
            <ErrorBox message={`Erreur : Importation non réussit`} />
          ) : (
            <SucessBox message={`Importation reussit`} />
          ))}
      </div>
    );
  }
}

export default InputFiles;
