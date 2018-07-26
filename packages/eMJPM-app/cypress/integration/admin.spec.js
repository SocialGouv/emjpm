require("./utils");

describe.only("Admins", () => {
  beforeEach(function() {
    cy.loginByForm("admin", "admin");
  });

  it("should show 2 active users", function() {
    cy.get("[data-cy=UserCellAction]").should("have.length", 2);
    cy
      .get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Adrien");
    cy
      .get(".ReactTable .rt-tr-group:nth-child(2)")
      .find(".rt-td")
      .first()
      .should("contain", "Julien");
  });
  it("should show 1 inactive users", function() {
    cy.get("[data-cy=TabIdleUsers]").click();
    cy.get("[data-cy=UserCellAction]").should("have.length", 1);
    cy
      .get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Doug");
  });
  it.only("should deactivate user", function() {
    cy.get("[data-cy=UserCellAction]").should("contain", "Désactiver");
    cy
      .get("[data-cy=UserCellAction]")
      .first()
      .click();
    cy.get("[data-cy=UserCellAction]").should("contain", "Activer");
  });
  it("user should be deativated", function() {
    cy.get("[data-cy=UserCellAction]").should("have.length", 1);
    cy.get("[data-cy=TabIdleUsers]").click();
    cy.get("[data-cy=UserCellAction]").should("have.length", 2);
    cy
      .get(".ReactTable .rt-tr-group:nth-child(2)")
      .find(".rt-td")
      .first()
      .should("contain", "Adrien");
  });
  it("should show 1 active users", function() {
    cy.get("[data-cy=UserCellAction]").should("have.length", 1);
    cy
      .get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Julien");
  });
  it.only("should reactivate user", function() {
    cy.get("[data-cy=TabIdleUsers]").click();
    cy.get("[data-cy=UserCellAction]").should("have.length", 2);
    cy
      .get("[data-cy=UserCellAction]")
      .first()
      .should("contain", "Activer");
    cy
      .get("[data-cy=UserCellAction]")
      .first()
      .click();
    cy.get("[data-cy=UserCellAction]").should("contain", "Désactiver");
  });
  it("should show 2 active users", function() {
    cy.get("[data-cy=UserCellAction]").should("have.length", 2);
    cy
      .get(".ReactTable .rt-tr-group:nth-child(1)")
      .find(".rt-td")
      .first()
      .should("contain", "Julien");
    cy
      .get(".ReactTable .rt-tr-group:nth-child(2)")
      .find(".rt-td")
      .first()
      .should("contain", "Doug");
  });
});
