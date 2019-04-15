import path from "path";
import * as XLSX from "xlsx";

import { read, readExcelDate, clean, cleanColNames } from "../src/excel/parse";
import { validate, isValidCodePostal } from "../src/excel/validate";

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

describe("cleanColNames", () => {
  const tests = [
    {
      input: ["col test", " abc   def  "],
      expected: ["col_test", "abc_def"]
    },
    {
      input: [" COL name - test  ", "bc  123    X"],
      expected: ["col_name___test", "bc_123_x"]
    }
  ];
  tests.forEach(t => {
    test(t.input.join(","), () => {
      expect(cleanColNames(t.input)).toEqual(t.expected);
    });
  });
});

describe("readExcelDate", () => {
  const tests = [
    {
      input: "20/12/2005",
      expected: "2005-12-19T23:00:00.000Z"
    },
    {
      input: "20/12/05",
      expected: "2005-12-19T23:00:00.000Z"
    },
    {
      input: "20-2-2005",
      expected: "2005-02-19T23:00:00.000Z"
    },
    {
      input: "20-2-05",
      expected: "2005-02-19T23:00:00.000Z"
    }
  ];
  tests.forEach(t => {
    test(t.input, () => {
      expect(readExcelDate(t.input).toISOString()).toEqual(t.expected);
    });
  });
});

describe("validate: invalid data should fail", () => {
  const files = ["invalid-date.xlsx", "invalid-annee.xlsx"];
  files.forEach(file => {
    test(`${file} should be invalid`, () => {
      expect.assertions(3);
      const workbook = XLSX.readFile(path.join(__dirname, "excel", file));
      const cleaned = read(workbook);
      expect(cleaned).toMatchSnapshot();
      const validations = validate(cleaned);
      expect(validations.errors).not.toBeUndefined();
      expect(validations).toMatchSnapshot();
    });
  });
});

describe("validate: valid data should NOT fail", () => {
  const files = ["valid1.xlsx", "valid2.xlsx"];
  files.forEach(file => {
    test(`${file} should be valid`, () => {
      expect.assertions(3);
      const workbook = XLSX.readFile(path.join(__dirname, "excel", file));
      const cleaned = read(workbook);
      expect(cleaned).toMatchSnapshot();
      const validations = validate(cleaned);
      expect(validations.errors).toBeUndefined();
      expect(validations).toMatchSnapshot();
    });
  });
});

describe("read: rename columns", () => {
  test(`should rename approximative columns`, () => {
    expect.assertions(5);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "valid-cols-names.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    expect(cleaned[0].annee).toEqual(2000);
    expect(cleaned[0].type).toEqual("Curatelle");
    const validations = validate(cleaned);
    expect(validations.errors).toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

describe("valid civilites", () => {
  test(`should normalize civilites`, () => {
    expect.assertions(7);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "valid-civilites.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    expect(cleaned[0].civilite).toEqual("H");
    expect(cleaned[1].civilite).toEqual("H");
    expect(cleaned[2].civilite).toEqual("F");
    expect(cleaned[3].civilite).toEqual("F");
    const validations = validate(cleaned);
    expect(validations.errors).toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

describe("fix various invalid data", () => {
  test(`should fix column names`, () => {
    expect.assertions(3);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "invalid-various.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    const validations = validate(cleaned);
    expect(validations.errors).toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

describe("fix various invalid data 1", () => {
  test(`should import correctly`, () => {
    expect.assertions(3);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "mesures-test.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    const validations = validate(cleaned);
    expect(validations.errors).toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

describe("fix various invalid data 1.2", () => {
  test(`should import correctly`, () => {
    expect.assertions(3);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "mesures-test2.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    const validations = validate(cleaned);
    expect(validations.errors).toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

describe("fix various invalid data 1.3", () => {
  test(`should import correctly`, () => {
    expect.assertions(3);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "mesures-test3.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    const validations = validate(cleaned);
    expect(validations.errors).toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

describe("fix various invalid data 1.4", () => {
  test(`should import correctly`, () => {
    expect.assertions(3);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "mesures-test4.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    const validations = validate(cleaned);
    expect(validations.errors).toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

describe("fix various invalid data 1.5", () => {
  test(`should import correctly`, () => {
    expect.assertions(3);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "mesures-test5.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    const validations = validate(cleaned);
    expect(validations.errors).toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

describe("empty dates naissance", () => {
  test(`should set empty dates naissance to null`, () => {
    expect.assertions(3);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "mesures-empty-ddn.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    const validations = validate(cleaned);
    expect(validations.errors).toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

describe("no column headers", () => {
  test(`should reject when no header`, () => {
    expect.assertions(3);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "no-headers.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    const validations = validate(cleaned);
    expect(validations.errors).not.toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

describe("annee as full date", () => {
  test(`should import annee correctly`, () => {
    expect.assertions(3);
    const workbook = XLSX.readFile(path.join(__dirname, "excel", "dates_naissance.xlsx"));
    const cleaned = read(workbook);
    expect(cleaned).toMatchSnapshot();
    const validations = validate(cleaned);
    expect(validations.errors).toBeUndefined();
    expect(validations).toMatchSnapshot();
  });
});

