import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import apiFetch from "../communComponents/Api";

import styled from "styled-components";

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function Dropzone() {
  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    return apiFetch(`/mandataires/upload`, {
      method: "POST",
      body: formData
    }).catch(e => {
      alert("Impossible d'envoyer le Curriculum Vitae");
      throw e;
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: ".jpeg,.png,.pdf,.jpg,.doc,.docx,.rtf"
  });

  const file = acceptedFiles && acceptedFiles.map(file => <li key={file.name}>{file.name}</li>);

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p> Déposez votre CV ici, ou cliquez ici pour télécharger votre CV</p>
      <aside>
        <ul>{file}</ul>
      </aside>
    </Container>
  );
}
export default Dropzone;
