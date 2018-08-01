require("./utils");

describe("Admins", () => {
  before(function() {
    cy.exec("npm run cypress:api-reset");
  });

  beforeEach(function() {
    cy.loginByForm("admin", "admin");
  });

  it("should show 2 active users", function() {
    cy.getCellAction().should("have.length", 2);
    cy.get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Adrien");
    cy.get(".ReactTable .rt-tr-group:nth-child(2)")
      .find(".rt-td")
      .first()
      .should("contain", "Julien");
  });
  it("should show 1 inactive users", function() {
    cy.get("[data-cy='En attente de validation']").click();
    cy.getCellAction().should("have.length", 1);
    cy.get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Doug");
  });
  it("should deactivate user", function() {
    cy.getCellAction().should("contain", "Désactiver");
    cy.getCellAction()
      .first()
      .click();
    cy.getCellAction().should("contain", "Activer");
  });
  it("user should be deativated", function() {
    cy.getCellAction().should("have.length", 1);
    cy.get("[data-cy='En attente de validation']").click();
    cy.getCellAction().should("have.length", 2);
    cy.get(".ReactTable .rt-tr-group:nth-child(2)")
      .find(".rt-td")
      .first()
      .should("contain", "Adrien");
  });
  it("should show 1 active users", function() {
    cy.getCellAction().should("have.length", 1);
    cy.get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Julien");
  });
  it("should reactivate user", function() {
    cy.get("[data-cy='En attente de validation']").click();
    cy.getCellAction().should("have.length", 2);
    cy.getCellAction()
      .first()
      .should("contain", "Activer");
    cy.getCellAction()
      .first()
      .click();
    cy.getCellAction().should("contain", "Désactiver");
  });
  it("should show 2 active users", function() {
    cy.getCellAction().should("have.length", 2);
    cy.get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Julien");
    cy.get(".ReactTable .rt-tr-group:nth-child(2)")
      .find(".rt-td")
      .first()
      .should("contain", "Doug");
  });

  describe("full scenario", () => {
    before(function() {
      cy.exec("npm run cypress:api-reset");
    });
    it("should navigate properly", function() {
      cy.getCellAction().should("have.length", 2);

      cy.get(".ReactTable .rt-tr-group:nth-child(1) .rt-td")
        .first()
        .should("contain", "Adrien");
      cy.get(".ReactTable .rt-tr-group:nth-child(2) .rt-td")
        .first()
        .should("contain", "Julien");

      cy.get("[data-cy='En attente de validation']").click();
      cy.get(".ReactTable .rt-tr-group:nth-child(1)")
        .find(".rt-td")
        .first()
        .should("contain", "Doug");

      cy.get("[data-cy='Actifs']").click();
      cy.getCellAction().should("have.length", 2);
      cy.getCellAction("Désactiver").should("have.length", 2);
      cy.getCellAction("Activer").should("have.length", 0);

      cy.getCellAction("Désactiver")
        .first()
        .click();
      cy.getCellAction("Désactiver").should("have.length", 1);
      cy.getCellAction("Activer").should("have.length", 1);

      cy.getCellAction("Désactiver")
        .first()
        .click();
      cy.getCellAction("Désactiver").should("have.length", 0);
      cy.getCellAction("Activer").should("have.length", 2);

      cy.get("[data-cy='En attente de validation']").click();
      cy.getCellAction().should("have.length", 3);
      cy.getCellAction("Activer").should("have.length", 3);
    });
  });
});
