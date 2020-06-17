import { parseFormFloat } from ".";

describe("parseFormFloat()", () => {
  test("it should return null", () => {
    expect(parseFormFloat(undefined)).toBe(null);
    expect(parseFormFloat("NaN")).toBe(null);
  });

  test("it should return float value", () => {
    expect(parseFormFloat("10.5")).toEqual(10.5);
    expect(parseFormFloat("10.15.41531")).toBe(10.15);
  });
});
