require("./utils");

describe("Tis", function() {
  describe("Session Tis", () => {
    before(function() {
      cy.loginByForm("ti1", "ti1");
    });

    beforeEach(function() {
      Cypress.Cookies.preserveOnce("connect.sid");
    });

    context("session Tis", () => {
      describe("/tis", () => {
        it("table should show 2 mandataires", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-mesure] tr").should("have.length", 2);
        });
        it("counter should show 2 professionnels", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-mandataire]").click();
          cy.get("[data-cy=tab-mesure] tr").should("have.length", 2);
        });
        it("can add a comments for a specific Mandataire", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-mesure] tr:nth-child(1)").click();
          cy.get(".form-group #root_co_comment").type("Hello i send you a comments");
          cy.get("button[type='submit'].btn").click();
          cy
            .get("[data-cy=tab-comment] div:nth-child(2) div")
            .contains("Hello i send you a comments");
        });

        it("check display of the mandataire Identity", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-mesure] tr:nth-child(1)").click();
          cy.get("[data-cy=tab-telephone]").contains("0237100000");
        });

        it("table should show 0 mandataires on individuel filter", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-individuel]").click();
          cy.get("[data-cy=tab-mesure] tr").should("have.length", 0);
        });

        it("table should show 2 mandataires on prepose filter", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-prepose]").click();
          cy.get("[data-cy=tab-mesure] tr").should("have.length", 2);
        });

        it("table should show 2 mandataires on service filter", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-service]").click();
          cy.get("[data-cy=tab-mesure] tr").should("have.length", 0);
        });
        it("table should show 0 mandataires on Lille Geolocalisation ", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-code-postal]").type("Lille");
          cy.get("[data-cy=tab-recherche]").click();
          cy.get("[data-cy=tab-mesure] tr").should("have.length", 0);
        });

        it("table should show 2 mandataires on Bethune Geolocalisation", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-code-postal]").type("bethune");
          cy.get("[data-cy=tab-recherche]").click();
          cy.get("[data-cy=tab-mesure] tr").should("have.length", 2);
        });
      });
    });
  });
});
