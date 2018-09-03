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
        it("table should show 1 mandataires", () => {
          cy.visit("/tis");
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
        });
        it("counter should show 1 professionnels", () => {
          cy.visit("/tis");
          cy.get("[data-cy=Mandataires]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
        });
        it("can add a comments for a specific Mandataire", () => {
          cy.visit("/tis");
          cy.get(".react-tabs .rt-tr-group:nth-child(1)").click();
          cy.get(".form-group #root_comment").type("Hello i send you a comments");
          cy.get("[data-cy=button-enregistrer-comment]").click();
          cy.get("[data-cy=tab-comment] div:nth-child(2) div").contains(
            "Hello i send you a comments"
          );
        });
        it("add reservation mesure", () => {
          cy.visit("/tis");
          // hack to prevent weird initial scroll
            //$$('.ReactTable')[0].parentNode.scrollTop=0
          cy.get(
            ".react-tabs .rt-tr-group:nth-child(1) [data-cy=button-reservation-mesure]"
          ).click();
           // cy.get('.ReactTable:first-child').parent().scrollTo('top')
          cy.get(".form-group #root_type").select("Tutelle");
          cy.get(".form-group #root_civilite").select("F");
          cy.get(".form-group #root_annee").type("1987");
          cy.get("[data-cy=button-submit-mesure]").click();
          cy.get("[data-cy=button-validation]").click();
          cy.get(".react-tabs .rt-tr-group:nth-child(1) [data-cy=attente]").contains(1);
        });

        it("check display of the mandataire Identity", () => {
          cy.visit("/tis");
          cy.get(".react-tabs .rt-tr-group:nth-child(1)").click();
          cy.get("[data-cy=fiche-manda-telephone]").contains("0101010108");
        });

        it("table should show 0 mandataires on individuel filter", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-Individuel]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 0);
        });

        it("table should show 1 mandataires on prepose filter", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-Prepose]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
        });

        it("table should show 0 mandataires on service filter", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-Service]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 0);
        });
        it("table should show 1 mandataires on Lille Geolocalisation ", () => {
          cy.visit("/tis");
          cy.get("[data-cy=tab-code-postal]").type("59000");
          cy.get("[data-cy=tab-recherche]").click();
          cy.get(".react-tabs .rt-tr-group").should("have.length", 1);
        });
      });
    });
  });
});
