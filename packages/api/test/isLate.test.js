// const isLate = require("../routes/email").isLate;
// const addDays = require("date-fns/add_days");
//
// const tests = [
//   {
//     title: "date_mesure_update=today, email never sent should return false",
//     mandataire: {
//       date_mesure_update: new Date(),
//       email_send: null
//     },
//     expected: false
//   },
//   {
//     title: "date_mesure_update=today-15J, email never sent should return false",
//     mandataire: {
//       date_mesure_update: addDays(new Date(), -15),
//       email_send: null
//     },
//     expected: false
//   },
//   {
//     title:
//       "date_mesure_update=today-1J, email sent yesterday should return false",
//     mandataire: {
//       date_mesure_update: addDays(new Date(), -1),
//       email_send: addDays(new Date(), -1)
//     },
//     expected: false
//   },
//   {
//     title: "date_mesure_update=today-35J, email never sent should return true",
//     mandataire: {
//       date_mesure_update: addDays(new Date(), -35),
//       email_send: null
//     },
//     expected: true
//   },
//   {
//     title:
//       "date_mesure_update=today-35J, email sent yesterday should return false",
//     mandataire: {
//       date_mesure_update: addDays(new Date(), -35),
//       email_send: addDays(new Date(), -1)
//     },
//     expected: false
//   }
// ];
//
// describe("isLate", () => {
//   tests.forEach(test => {
//     it(test.title, () => {
//       isLate(test.mandataire).should.equal(test.expected);
//     });
//   });
// });
