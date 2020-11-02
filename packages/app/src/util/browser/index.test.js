import { isUnsupportedBrowser } from ".";

const testBrowserObject = {
  name: "safari",
  version: "11.0.3",
};

test("Does not exclude browsers not declared in exclusion list", () => {
  const testExclusionObject = [{ name: "chrome" }];
  expect(isUnsupportedBrowser(testBrowserObject, testExclusionObject)).toBe(
    false
  );
});

test("Excludes browser when specifying just name", () => {
  const testExclusionObject = [{ name: "safari" }];
  expect(isUnsupportedBrowser(testBrowserObject, testExclusionObject)).toBe(
    true
  );
});

test("Excludes browser when current version is lower than required", () => {
  const testExclusionObject = [{ name: "safari", version: "12" }];
  expect(isUnsupportedBrowser(testBrowserObject, testExclusionObject)).toBe(
    true
  );
});

test("Does not exclude browser when current version is higher than required", () => {
  const testExclusionObject = [{ name: "safari", version: "9" }];
  expect(isUnsupportedBrowser(testBrowserObject, testExclusionObject)).toBe(
    false
  );
});

test("Does not exclude browser when current version is equal to required", () => {
  const testExclusionObject = [{ name: "safari", version: "11" }];
  expect(isUnsupportedBrowser(testBrowserObject, testExclusionObject)).toBe(
    false
  );
});

test("Handles granular version arguments", () => {
  const testExclusionObject = [{ name: "safari", version: "11.0.4" }];
  expect(isUnsupportedBrowser(testBrowserObject, testExclusionObject)).toBe(
    true
  );
});

test("Handles multiple browsers", () => {
  const testExclusionObject = [
    { name: "chrome", version: "30" },
    { name: "safari", version: "12" },
  ];
  expect(isUnsupportedBrowser(testBrowserObject, testExclusionObject)).toBe(
    true
  );
});
