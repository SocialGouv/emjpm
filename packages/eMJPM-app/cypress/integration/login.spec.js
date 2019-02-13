require("./utils");

describe("Login", () => {
  it("Login with invalid account should show error message", function() {
    cy.visit("/");
    cy.get("#root_username").type("individuel");
    cy.get("#root_password").type("xxx");
    cy.get("button.btn-success").click();
    cy.get("div.alert-danger").should("contain", "Impossible de se connecter");
    cy.location("pathname").should("equal", "/");
  });

  it("Forgot password process", function() {
    cy.visit("/reset-password?token=LpWpzK4Jla9I87Aq");
    cy.get("#root_newPassword").type("adad");
    cy.get("#root_verifyPassword").type("adad");
    cy.get("button.btn-success").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
  });
  it("Login with invalid account should show error message", function() {
    cy.visit("/");
    cy.get("#root_username").type("ad");
    cy.get("#root_password").type("ad123");
    cy.get("button.btn-success").click();
    cy.get("div.alert-danger").should("contain", "Impossible de se connecter");
    cy.location("pathname").should("equal", "/");
  });

  it("Login with valid account should redirect to /mandataires", function() {
    cy.visit("/");
    cy.get("#root_username").type("ad");
    cy.get("#root_password").type("adad");
    cy.get("button.btn-success").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/mandataires");
  });

  it("Forgot password process", function() {
    cy.visit("/forgot-password");
    cy.get("#root_email").type("ud@ud.com");
    cy.get("button.btn-success").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
  });

  it("Login with valid account should redirect to /mandataires", function() {
    cy.visit("/");
    cy.get("#root_username").type("jeremy");
    cy.get("#root_password").type("johnson123");
    cy.get("button.btn-success").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/mandataires");
  });

  it("Login with valid account should redirect to /tis", function() {
    cy.visit("/");
    cy.get("#root_username").type("ti1");
    cy.get("#root_password").type("ti1");
    cy.get("button.btn-success").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/tis");
  });
});
