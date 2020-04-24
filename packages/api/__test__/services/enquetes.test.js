const { convertExcelFileToJson } = require("../../src/services/enquetes");

test("export excel file to json", () => {
  const filepath = __dirname + "/enquete.sample.xls";
  const json = convertExcelFileToJson(filepath);
  console.log(json);
  expect(json).toBe({
    departement: "",
    region: "",
    mandataire: "",
    benevole: false
  });
});
