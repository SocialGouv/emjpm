const { float } = require("./enqueteExcelParser");

describe("enqueteExcelParser", () => {
  test("it should return undefined value by default", () => {
    expect(float("")).toEqual(undefined);
    expect(float({})).toEqual(undefined);
    expect(float({ v: "" })).toEqual(undefined);
  });

  test("it should parse float value", () => {
    expect(float({ v: "129569,45" })).toEqual(129569.45);
    expect(float({ v: "129569.45" })).toEqual(129569.45);
    expect(float({ v: "129 569.45" })).toEqual(129569.45);
    expect(float({ v: "129 569, 45" })).toEqual(129569.45);
  });
});
