import React from "react";

import apiFetch from "../communComponents/Api";

class ImportCV extends React.Component {
  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    if (this.file) {
      this.fileUpload(this.file.files[0]);
    }
  };

  fileUpload = file => {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch(`/mandataires/upload`, {
      method: "POST",
      body: formData
    }).catch(e => {
      alert("Impossible de uploader le Curriculum Vitae");
      throw e;
    });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input ref={node => (this.file = node)} type="file" onChange={this.onChange} />
        <button type="submit" onClick={this.onFormSubmit}>
          Upload
        </button>
      </form>
    );
  }
}

export default ImportCV;
