const now = new Date();
const day = 1000 * 60 * 60 * 24;

import isOlderThanOneMonth from "../src/components/communComponents/checkDate";

const tests = [
  {
    title: "now",
    value: now,
    expected: false
  },
  {
    title: "+15J",
    value: new Date(now.getTime() + day * 15),
    expected: false
  },
  {
    title: "-15J",
    value: new Date(now.getTime() - day * 15),
    expected: false
  },
  {
    title: "+25J",
    value: new Date(now.getTime() - day * 25),
    expected: false
  },
  {
    title: "+35J",
    value: new Date(now.getTime() - day * 35),
    expected: true
  }
];

tests.forEach(t => {
  test(`${t.title} should be ${t.expected}`, () => {
    expect(isOlderThanOneMonth(t.value)).toBe(t.expected);
  });
});
