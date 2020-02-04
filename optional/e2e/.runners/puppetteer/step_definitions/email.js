//
const { I } = inject();
const got = require("got");
const MAILDEV_API_URL = process.env.MAILDEV_API_URL || "http://localhost:1080";
const event = require("codeceptjs").event;
const recorder = require("codeceptjs").recorder;

//

let state = {};

Before(() => {
  state = {};
});

//

Given("an empty inbox", async () => {
  const isDone = await mailDev("DELETE", "/email/all");
  require("chai")
    .expect(isDone)
    .to.eq(true);
});

Given("the last email as the following info", async table => {
  const { expect } = require("chai");
  expect(state.lastUnreadMessage, "No email found").to.exist;
  table.rows.forEach(({ cells: [{ value: path }, { value }] }) => {
    expect(state.lastUnreadMessage).to.nested.include({ [path]: value });
  });
});

//

When("I have one unread message in my indox", async () => {
  const { expect } = require("chai");

  recorder.retry({ retries: 5 });

  recorder.add(async () => {
    const emails = await mailDev("GET", "/email");
    expect(emails).to.have.lengthOf.above(0, "No email received");
    const unreadEmails = emails.filter(email => !email.read);
    expect(unreadEmails).to.have.lengthOf(1, "O_o more then one unread email");
  });
  await recorder.promise();

  recorder.reset();
});

When("I consult the last unread message", async () => {
  const emails = await mailDev("GET", "/email");
  const [{ id }] = emails.filter(email => !email.read).reverse();
  state.lastUnreadMessage = await mailDev("GET", "/email/" + id);
});

When("I click on the {string} link in the last email", regexStr => {
  const { expect } = require("chai");
  expect(state.lastUnreadMessage, "No email found").to.exist;
  const reg = new RegExp(regexStr);
  const [link] = reg.exec(state.lastUnreadMessage.text);
  I.amOnPage(link);
});

//

async function mailDev(method, resource) {
  const { output } = require("codeceptjs");
  try {
    output.log(`MAILDEV | ${method} "${MAILDEV_API_URL}${resource}"`);
    const { body } = await got(`${MAILDEV_API_URL}${resource}`, {
      method,
      responseType: "json"
    });
    return body;
  } catch (e) {
    e.message += `on ${method} "${MAILDEV_API_URL}${resource}"`;
    throw e;
  }
}
