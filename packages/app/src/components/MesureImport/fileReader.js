function readFileAsBinaryString(file, cb, err) {
  if (file) {
    const reader = new FileReader();

    const isExcel = file.name.endsWith(".xls") || file.name.endsWith(".xlsx");

    if (isExcel) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUrl = reader.result.substring();
        const base64str = dataUrl.substring(dataUrl.indexOf(",") + 1);
        if (cb) {
          cb({ base64str, file });
        }
      };
    } else {
      reader.readAsText(file);
      reader.onload = () => {
        // note: ici, on envoit directement au format "text"
        const base64str = reader.result.substring();
        if (cb) {
          cb({ base64str, file });
        }
      };
    }

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
