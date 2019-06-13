// extend FileReader for IE11
// https://stackoverflow.com/questions/31391207/javascript-readasbinarystring-function-on-e11
//
if (typeof window !== "undefined" && !FileReader.prototype.readAsBinaryString) {
  FileReader.prototype.readAsBinaryString = function(fileData) {
    let binary = "";
    const pt = this;
    const reader = new FileReader();
    reader.onload = function(e) {
      const bytes = new Uint8Array(reader.result);
      const length = bytes.byteLength;
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      pt.content = binary;
      pt.onload({
        target: {
          result: binary
        }
      });
    };
    reader.readAsArrayBuffer(fileData);
  };
}
