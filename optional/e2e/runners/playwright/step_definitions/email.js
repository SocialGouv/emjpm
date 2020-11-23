//

const { I } = inject();

const { Alors, Quand, Soit } = require("./_fr");

const MAILDEV_API_URL = process.env.MAILDEV_API_URL || "http://localhost:1080";
/*
const event = require("codeceptjs").event;
*/

//

let state = {};

Before(() => {
  state = {};
});

//
Soit("une boite mail vide", async () => {
  const isDone = await mailDev("DELETE", "/email/all");
  require("chai")
    .expect(isDone)
    .to.eq(true);
});

Alors("je vois dans le mail", async table => {
  const { expect } = require("chai");
  expect(state.lastUnreadMessage, "No email found").to.exist;
  table.rows.forEach(({ cells: [{ value: path }, { value }] }) => {
    expect(state.lastUnreadMessage).to.nested.include({ [path]: value });
  });
});

//

Alors("j'ai un message non lu dans ma boite mail", async () => {
  const recorder = require("codeceptjs").recorder;
  const { expect } = require("chai");

  recorder.retry({ retries: 15 });

  recorder.add(async () => {
    const emails = await mailDev("GET", "/email");
    expect(emails).to.have.lengthOf.above(0, "No email received");
    const unreadEmails = emails.filter(email => !email.read);
    expect(unreadEmails).to.have.lengthOf(1, "O_o more then one unread email");
  });
  await recorder.promise();

  recorder.reset();
});

Quand("j'ouvre le dernier mail non lu", async () => {
  const emails = await mailDev("GET", "/email");
  const [{ id }] = emails.filter(email => !email.read).reverse();
  state.lastUnreadMessage = await mailDev("GET", "/email/" + id);
});

Quand("dans le mail, je clique sur le lien {string}", regexStr => {
  const { expect } = require("chai");
  expect(state.lastUnreadMessage, "No email found").to.exist;
  const reg = new RegExp(regexStr);
  const [link] = reg.exec(state.lastUnreadMessage.text);
  I.amOnPage(link);
});

//

async function mailDev(method, resource) {
  const { output } = require("codeceptjs");
  const got = require("got");
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
