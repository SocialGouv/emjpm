const now = new Date();
const day = 1000 * 60 * 60 * 24;

import isOlderThanOneMonth from "../src/components/communComponents/checkDate";

test("now: !isOlderThanOneMonth", () => {
  expect(isOlderThanOneMonth(now)).toBe(false);
});

test("now-15J: !isOlderThanOneMonth", () => {
  expect(isOlderThanOneMonth(new Date(now.getTime() - day * 15))).toBe(false);
});

test("now-35J: isOlderThanOneMonth", () => {
  expect(isOlderThanOneMonth(new Date(now.getTime() - day * 35))).toBe(true);
});
