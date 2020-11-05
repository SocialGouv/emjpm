import { getDepartementCode } from "./departements.service";

test("it should return common codes", () => {
  expect(getDepartementCode("92350")).toBe("92");
});

test("it should return dom-tom codes", () => {
  expect(getDepartementCode("97123")).toBe("971");
  expect(getDepartementCode("97126")).toBe("971");
});

test("it should return corsica codes", () => {
  expect(getDepartementCode("20167")).toBe("2A");
  expect(getDepartementCode("20200")).toBe("2B");
  expect(getDepartementCode("20290")).toBe("2B");
});
