require("./.utils");

describe("Admins", () => {
  before(function() {
    cy.exec("yarn cypress:api-reset");
  });

  beforeEach(function() {
    cy.loginByForm("admin", "admin");
  });

  it("should show 4 users", function() {
    cy.getCellAction().should("have.length", 4);
    cy.contains("Adrien");
    cy.contains("Julien");
    cy.contains("Mélanie");
    cy.contains("Marcel");
  });

  it("should show 1 inactive users", function() {
    cy.contains("En attente de validation").click();
    cy.getCellAction().should("have.length", 1);
    cy.contains("Doug");
  });

  it("should deactivate Adrien", function() {
    cy.contains("Adrien")
      .parent()
      .contains("Désactiver")
      .as("button");
    cy.get("@button").click();
    cy.get("@button").should("contain", "Activer");
  });

  it("Adrien should be deactivated", function() {
    cy.contains("Adrien").should("not.exist");
    cy.contains("En attente de validation").click();
    cy.contains("Adrien");
  });

  it("should show 3 active users", function() {
    cy.getCellAction().should("have.length", 3);
    cy.contains("Julien");
    cy.contains("Mélanie");
    cy.contains("Marcel");
  });

  it("should activate Doug", function() {
    cy.contains("En attente de validation").click();
    cy.contains("Doug")
      .parent()
      .contains("Activer")
      .as("button");
    cy.get("@button").click();
    cy.get("@button").should("contain", "Désactiver");
  });

  it("should show 4 active users", function() {
    cy.getCellAction().should("have.length", 4);
    cy.contains("Julien");
    cy.contains("Mélanie");
    cy.contains("Doug");
    cy.contains("Marcel");
  });
});
