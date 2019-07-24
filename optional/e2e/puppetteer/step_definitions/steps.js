const { I } = inject();
const { output, recorder } = require("codeceptjs");

const MAILDEV_API_URL = process.env.MAILDEV_API_URL || "http://localhost:1080";

//

let state = {};

Before(() => {
  state = {};
});

//

Given("a clean test database", async () => {
  // From "features/login.feature" {"line":8,"column":5}
  const { stdout } = await require("execa")(
    "pg_restore",
    [
      "--clean",
      "--host",
      "localhost",
      "--port",
      "5434",
      "--username",
      "postgres",
      "--dbname",
      "emjpm_test",
      require("path").join(process.cwd(), "../test-seed.dump")
    ],
    {
      env: {
        PGPASSWORD: "test"
      }
    }
  );
  stdout && output.log("  #[" + stdout + "]");
});

Given("a web browser is on EMJJM", () => {
  // From "features/login.feature" {"line":8,"column":5}
  I.amOnPage("/");
});

When("I enter {string} as {string}", (value, placeholder) => {
  // From "features/login.feature" {"line":14,"column":5}
  I.fillField(placeholder, value);
});

Then("I should redirected to {string} page", url => {
  // From "features/login.feature" {"line":16,"column":5}
  I.waitInUrl(url, 5);
});

When("I click on {string}", text => {
  // From "features/login.feature" {"line":16,"column":5}
  I.click(text);
});

When("I pause", () => {
  // From "features/login.feature" {"line":16,"column":5}
  pause();
});

When("I see {string}", text => {
  // From "features/login.feature" {"line":16,"column":5}
  I.see(text);
});

When("I fill in the following", table => {
  // From "features/inscription.feature" {"line":18,"column":5}
  table.rows.forEach(({ cells: [{ value: label }, { value }] }) => {
    I.fillField(label, value);
  });
});

When("I am accepting popups", () => {
  I.amAcceptingPopups();
});

When("I accept the popup", () => {
  I.acceptPopup();
});

When("I have one unread message in my indox", async () => {
  const { expect } = require("chai");

  recorder.retry({ retries: 5 });

  recorder.add(async () => {
    const emails = await mailDev("GET", "/email").then(JSON.parse);
    expect(emails).to.have.lengthOf.above(0, "No email received");

    const unreadEmails = emails.filter(email => !email.read);
    expect(unreadEmails).to.have.lengthOf(1, "O_o more then one unread email");
  });
  await recorder.promise();

  recorder.reset();
});
When("I consult the last unread message", async () => {
  const emails = await mailDev("GET", "/email").then(JSON.parse);
  const [{ id }] = emails.filter(email => !email.read).reverse();
  state.lastUnreadMessage = await mailDev("GET", "/email/" + id).then(
    JSON.parse
  );
});

Given("the last email as the following info", async table => {
  const { expect } = require("chai");

  expect(state.lastUnreadMessage, "No email found").to.exist;
  output.log(JSON.stringify(state.lastUnreadMessage, null, 2));
  table.rows.forEach(({ cells: [{ value: path }, { value }] }) => {
    expect(state.lastUnreadMessage).to.nested.include({ [path]: value });
  });
});

Given("an empty inbox", async () => {
  const isDone = await mailDev("DELETE", "/email/all");
  require("chai")
    .expect(isDone)
    .to.eq("true");
});

When("I click on the {string} link in the last email", regexStr => {
  const { expect } = require("chai");

  expect(state.lastUnreadMessage, "No email found").to.exist;
  const reg = new RegExp(regexStr);
  const [link] = reg.exec(state.lastUnreadMessage.text);

  I.amOnPage(link);
});

if (process.env.DEBUG) {
  Fail((test, err) => {
    // test didn't
    output.log("Fail", test);
    output.log("Failed with", err);
    pause();
  });
}

//

async function mailDev(method, resource) {
  const output = require("codeceptjs").output;

  try {
    output.log(`MAILDEV | ${method} "${MAILDEV_API_URL}${resource}"`);

    const { body } = await require("got")(resource, {
      baseUrl: MAILDEV_API_URL,
      method,
      responseType: "json"
    });

    return body;
  } catch (e) {
    e.message += `on ${method} "${MAILDEV_API_URL}${resource}"`;
    throw e;
  }
}
