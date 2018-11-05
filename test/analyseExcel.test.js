import { cleanInputData, isValidCodePostal } from "../src/components/common/AnalyseExcel";

const VALID_CPS = ["13000", "89100", /*"97121", "97216",*/ "20000"];

describe("isValidCodePostal", () => {
  test("75000 should be invalid ", () => {
    expect(isValidCodePostal(75000)).toBe(false);
  });
  VALID_CPS.forEach(cp => {
    test(`${cp} should be valid`, () => {
      expect(isValidCodePostal(cp)).toBe(true);
    });
  });
});

// mock XLSX.utils.sheet_to_json
const jsonSheet = [
  [
    "date_ouverture",
    "type",
    null,
    "code_postal",
    "ville",
    "civilite",
    null,
    "annee",
    "numero_dossier",
    "residence",
    null,
    "adad",
    "mandataire_id"
  ],
  [
    43041,
    "tutelle",
    2,
    57100,
    "thionville",
    "n",
    null,
    4150,
    "RG20136Q",
    "à domicile",
    null,
    "q",
    10
  ],
  [
    42707,
    "curatelle",
    12,
    75005,
    "paris",
    "n",
    125,
    4000,
    "1236HPLY",
    "en établissement",
    null,
    "s",
    10
  ],
  [
    40395,
    "sauvegarde de justice ",
    52,
    85000,
    "marseille",
    "n",
    54,
    4500,
    "meourg120",
    "à domicile",
    null,
    "t",
    10
  ]
];

test("cleanInputData", () => {
  expect(cleanInputData(jsonSheet)).toMatchSnapshot();
});
