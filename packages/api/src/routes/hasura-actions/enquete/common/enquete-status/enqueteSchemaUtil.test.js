const enqueteSchemaUtil = require("./enqueteSchemaUtil");

test("getGlobalStatus should return valid if all sub-status are valid", () => {
  expect(
    enqueteSchemaUtil.getGlobalStatus({
      status1: "valid",
      status2: "valid",
      status3: "valid",
      status4: "valid",
    })
  ).toBe("valid");
});

test("getGlobalStatus should return invalid if at least one sub-status is invalid", () => {
  expect(
    enqueteSchemaUtil.getGlobalStatus({
      status1: "valid",
      status2: "invalid",
      status3: "empty",
      status4: "valid",
    })
  ).toBe("invalid");
});

test("getGlobalStatus should return empty if at least one sub-status is empty (and not invalid)", () => {
  expect(
    enqueteSchemaUtil.getGlobalStatus({
      status1: "valid",
      status2: "valid",
      status3: "empty",
      status4: "valid",
    })
  ).toBe("empty");
});

test("getTopLevelGlobalStatus should return valid if all sub-steps global status are valid", () => {
  expect(
    enqueteSchemaUtil.getTopLevelGlobalStatus({
      step1: { global: "valid" },
      step2: { global: "valid" },
      step3: { global: "valid" },
      step4: { global: "valid" },
    })
  ).toBe("valid");
});

test("getTopLevelGlobalStatus should return invalid if at least one sub-steps global status is invalid", () => {
  expect(
    enqueteSchemaUtil.getTopLevelGlobalStatus({
      step1: { global: "valid" },
      step2: { global: "invalid" },
      step3: { global: "empty" },
      step4: { global: "valid" },
    })
  ).toBe("invalid");
});

test("getTopLevelGlobalStatus should return empty if at least one sub-steps global status is empty (and not invalid)", () => {
  expect(
    enqueteSchemaUtil.getTopLevelGlobalStatus({
      step1: { global: "valid" },
      step2: { global: "valid" },
      step3: { global: "empty" },
      step4: { global: "valid" },
    })
  ).toBe("empty");
});
