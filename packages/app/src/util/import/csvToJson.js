export const findSeparator = line => {
  const tabulation = "\t";
  const semilicon = ";";
  let separatorChar = tabulation;

  if (line.split(semilicon).length > 1) {
    separatorChar = semilicon;
  }

  return separatorChar;
};

export default csv => {
  var lines = csv.split("\n");
  const separatorChar = findSeparator(lines[0]);

  var dataArray = [];
  const headerCells = lines[0].split(separatorChar);
  var headers = headerCells.map(header => header.trim());

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(separatorChar);

    for (var j = 0; j < headers.length; j++) {
      const val = currentline[j];
      obj[headers[j]] = val ? val.trim() : undefined;
    }

    dataArray.push(obj);
  }

  return dataArray;
};
