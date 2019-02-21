import React from "react";
import apiFetch from "../communComponents/Api";
class ImportCV extends React.Component {
  state = {
    file: null
  };

  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(response => {
      console.log(response.data);
    });
  };
  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };
  fileUpload = file => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);

    console.log("formData", formData);

    return apiFetch(`/mandataires/upload`, {
      method: "POST",
      body: file,
      headers: {
        "content-type": "multipart/form-data"
      }
    }).catch(e => {
      alert("Impossible de uploader le Curriculum Vitae");
      throw e;
    });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default ImportCV;
// import React from "react";
// import classNames from "classnames";
// import Dropzone from "react-dropzone";
//
// class ImportCV extends React.Component {
//   onDrop = (acceptedFiles, rejectedFiles) => {
//     // Do something with files
//   };
//
//   render() {
//     return (
//       <Dropzone onDrop={this.onDrop}>
//         {({ getRootProps, getInputProps, isDragActive }) => {
//           return (
//             <div
//               {...getRootProps()}
//               className={classNames("dropzone", { "dropzone--isActive": isDragActive })}
//             >
//               <input {...getInputProps()} />
//               {isDragActive ? (
//                 <p>Drop files here...</p>
//               ) : (
//                 <p>Try dropping some files here, or click to select files to upload.</p>
//               )}
//             </div>
//           );
//         }}
//       </Dropzone>
//     );
//   }
// }
// import React from "react";
//
// import apiFetch from "../communComponents/Api";
// import Form from "react-jsonschema-form";
// import { format } from "date-fns";
//
// const schema = {
//   title: "Files",
//   type: "object",
//   properties: {
//     file: {
//       type: "string",
//       format: "data-url",
//       title: "Single file"
//     }
//   }
// };
//
// const uiSchema = {
//   "ui:options": {
//     label: false
//   }
// };
//
// class ImportCV extends React.Component {
//   onSubmitted = ({ formData }) => {
//     //const data = new FormData();
//     //data.append("file", formData.files[0]);
//     console.log("formData", formData);
//
//     //console.log("fData", data);
//
//
//
//     apiFetch(`/mandataires/upload`, {
//       method: "POST",
//       body: formData,
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     }).catch(e => {
//       alert("Impossible de uploader le Curriculum Vitae");
//       throw e;
//     });
//   };
//
//   render() {
//     return (
//       <Form schema={schema} onSubmit={this.onSubmitted}>
//         <div style={{ margin: "20px 0", textAlign: "center" }}>
//           <button type="submit" className="btn btn-success" style={{ padding: "10px 30px" }}>
//             Upload
//           </button>
//         </div>
//       </Form>
//     );
//   }
// }
//
// export default ImportCV;
