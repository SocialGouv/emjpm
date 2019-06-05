require("./.utils");

describe("Login", () => {
  before(function() {
    cy.exec("npm run cypress:api-reset");
  });

  it("Login with zzz account should show error message", function() {
    cy.visit("/");
    cy.get("#root_username").type("zzz");
    cy.get("#root_password").type("xxx");
    cy.get("button.btn-success").click();
    cy.get("div.alert-danger").should("contain", "Impossible de se connecter");
    cy.location("pathname").should("equal", "/");
  });

  it("Reset password process", function() {
    cy.visit("/reset-password?token=LpWpzK4Jla9I87Aq");
    cy.get("#root_newPassword").type("adad");
    cy.get("#root_verifyPassword").type("adad");
    cy.get("button.btn-success").click();

    cy.location("pathname").should("eq", "/login/");
  });

  it("Login with invalid account should show error message", function() {
    cy.visit("/");
    cy.get("#root_username").type("ad");
    cy.get("#root_password").type("ad123");
    cy.get("button.btn-success").click();
    cy.get("div.alert-danger").should(
      "contain",
      "votre adresse email ou votre mot de passe sont invalides."
    );
    cy.location("pathname").should("equal", "/");
  });

  it("Login with valid account should redirect to /mandataires/", function() {
    cy.visit("/");
    cy.get("#root_username").type("ad");
    cy.get("#root_password").type("adad");
    cy.get("button.btn-success").click();
    cy.location("pathname").should("eq", "/mandataires/");
  });

  it("Forgot password process", function() {
    cy.visit("/forgot-password");
    cy.get("#root_email").type("ud@ud.com");
    cy.get("button.btn-success").click();
    cy.location("pathname").should("eq", "/login/");
  });

  it("'jeremy' should redirect to /mandataires/", function() {
    cy.visit("/");
    cy.get("#root_username").type("jeremy");
    cy.get("#root_password").type("johnson123");
    cy.get("button.btn-success").click();
    cy.location("pathname").should("eq", "/mandataires/");
  });

  it("'ti1' should redirect to /tis/", function() {
    cy.visit("/");
    cy.get("#root_username").type("ti1");
    cy.get("#root_password").type("ti1");
    cy.get("button.btn-success").click();
    cy.location("pathname").should("eq", "/tis/");
  });
});
