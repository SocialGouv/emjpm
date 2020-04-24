import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { Box, Button } from "rebass";

import { withAuthSync } from "../../src/util/auth";

const UploadExcelFile = gql`
  mutation fileUpload($name: String!, $type: String!, $base64str: String!) {
    fileUpload(name: $name, type: $type, base64str: $base64str) {
      data
    }
  }
`;

const UploadTestPage = () => {
  const [file, setFile] = useState(null);
  const [base64Str, setBase64Str] = useState(null);
  const [uploadFile, { loading, data }] = useMutation(UploadExcelFile);

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }

  if (data) {
    const { fileUpload } = data;
    return (
      <Box p={4}>
        <Box fontWeight="bold">Fichier traité : </Box>
        <Box>{fileUpload.data}</Box>
      </Box>
    );
  }

  return (
    <Box
      p={4}
      as="form"
      onSubmit={e => {
        e.preventDefault();
        const { name, type } = file;
        uploadFile({
          variables: {
            base64str: base64Str,
            name,
            type
          }
        });
      }}
    >
      <input
        onChange={e => {
          setFile(e.target.files[0]);
          const reader = new FileReader();
          if (e.target.files[0]) {
            reader.readAsBinaryString(e.target.files[0]);
          }
          reader.onload = () => {
            const base64str = btoa(reader.result);
            setBase64Str(base64str);
          };
          reader.onerror = () => {
            console.error("unable to parse file");
          };
        }}
        type="file"
        name="file"
      />
      <Button type="submit">Valider</Button>
    </Box>
  );
};

export default withAuthSync(UploadTestPage);
