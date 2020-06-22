const getRegionCode = require("./getRegionCode");

test("it should return common codes", () => {
  expect(getRegionCode("92350")).toBe("92");
});

test("it should return dom-tom codes", () => {
  expect(getRegionCode("97123")).toBe("971");
  expect(getRegionCode("97126")).toBe("971");
});

test("it should return corsica codes", () => {
  expect(getRegionCode("20167")).toBe("2A");
  expect(getRegionCode("20200")).toBe("2B");
  expect(getRegionCode("20290")).toBe("2B");
});
