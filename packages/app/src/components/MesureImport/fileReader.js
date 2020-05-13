function readFileAsBinaryString(file, cb, err) {
  if (file) {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      const base64str = btoa(reader.result);
      if (cb) {
        cb({ base64str, file });
      }
    };
    reader.onerror = () => {
      console.error("unable to parse file");
      if (err) {
        err(new Error("Unable to parse file"));
      }
    };
  }
}

export const fileReader = {
  readFileAsBinaryString
};
