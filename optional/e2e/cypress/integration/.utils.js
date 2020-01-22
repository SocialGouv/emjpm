Cypress.Commands.add("loginByForm", (username, password) => {
  Cypress.log({
    name: "loginByForm",
    message: username + " | " + password
  });

  cy.visit("/");

  cy.get("#root_username")
    .clear()
    .type(username);
  cy.get("#root_password").type(password);

  cy.get("button.btn-success").click();
});

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:4003/auth/login",
    body: {
      username: "jeremy",
      password: "johnson123"
    }
  }).then(resp => {
    window.localStorage.setItem("id_token", resp.body.token);
  });
});

Cypress.Commands.add("loginTi", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:4003/auth/login",
    body: {
      username: "ti1",
      password: "ti1"
    }
  }).then(resp => {
    window.localStorage.setItem("id_token", resp.body.token);
  });
});
// hack for date inputs and react-jsonschema-form (need on onChange that cypress doesnt trigger)
Cypress.Commands.add("dateInput", (selector, dateString) => {
  cy.get(selector)
    .then(input => input.attr("type", "text"))
    .clear()
    .type(dateString);
});

Cypress.Commands.add("getCellAction", text => {
  cy.get("[data-cy=UserCellAction]").filter(
    (i, el) => (text ? (el.textContent ? el.textContent.indexOf(text) > -1 : true) : true)
  );
});
