import { clean } from "../src/excel/parse";
import { isValidCodePostal, validate } from "../src/excel/validate";

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

test("clean normalize input", () => {
  expect(clean(jsonSheet)).toMatchSnapshot();
});

const firstRow = {
  annee: null,
  civilite: null,
  code_postal: null,
  date_ouverture: null,
  numero_dossier: null,
  residence: null,
  type: null,
  ville: null
};

const tests = [
  {
    title: "should accept perfect valid data",
    success: true,
    data: [
      firstRow,
      {
        annee: 1992,
        civilite: "H",
        code_postal: 57100,
        date_ouverture: "2017-11-02",
        numero_dossier: "RG20136Q",
        residence: "A Domicile",
        type: "Tutelle",
        ville: "thionville"
      }
    ]
  },
  {
    title: "should not accept invalid reference data",
    success: false,
    data: [
      firstRow,
      {
        annee: 1992,
        civilite: "H",
        code_postal: 57100,
        date_ouverture: "2017-11-02",
        numero_dossier: "RG20136Q",
        residence: "domicile",
        type: "Tutelle",
        ville: "thionville"
      }
    ]
  }
];

describe("validate", () => {
  tests.forEach(t => {
    test(t.title, () => {
      const result = validate(t.data);
      if (t.success) {
        expect(result.errors).toBeUndefined();
      } else {
        expect(result.errors).not.toBeUndefined();
      }
    });
  });
});
