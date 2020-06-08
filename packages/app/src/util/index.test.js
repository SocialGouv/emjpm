import { parseFloatValue } from ".";

describe("parseFloatValue()", () => {
  test("it should return null", () => {
    expect(parseFloatValue(undefined)).toBe(null);
    expect(parseFloatValue("NaN")).toBe(null);
  });

  test("it should return float value", () => {
    expect(parseFloatValue("10.5")).toEqual(10.5);
    expect(parseFloatValue("10.15.41531")).toBe(10.15);
  });
});
