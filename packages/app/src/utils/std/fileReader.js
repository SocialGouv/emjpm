function readTextFile(file, cb, err) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    const content = reader.result.substring();
    if (cb) {
      // format "text"
      cb({ content, file });
    }
  };
  reader.onerror = () => {
    console.error("unable to parse file");
    if (err) {
      err(new Error("Unable to parse file"));
    }
  };
}

function readBinaryFileAsBase64(file, cb, err) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const dataUrl = reader.result.substring();
    const content = dataUrl.substring(dataUrl.indexOf(",") + 1);
    if (cb) {
      // encodé en "base64"
      cb({ content, file });
    }
  };
  reader.onerror = () => {
    console.error("unable to parse file");
    if (err) {
      err(new Error("Unable to parse file"));
    }
  };
}

export const fileReader = {
  readBinaryFileAsBase64,
  readTextFile,
};
