require("./utils");

describe("Tis", function() {
    describe("Session Tis", () => {
        before(function() {
            cy.loginByForm("jeremy", "johnson123");
        });

        beforeEach(function() {
            Cypress.Cookies.preserveOnce("connect.sid");
        });

        context("session Tis", () => {
            describe("/tis", () => {
                it("table should show 2 mesures", () => {
                    cy.visit("/tis");
                    cy.get(".react-tabs div.container table tbody tr").should("have.length", 2);
                });
                it("counter should show 2/3", () => {
                    cy.visit("/mandataires");
                    cy.get(".react-tabs .react-tabs__tab-list li p").should("contain", "2 / 3");
                });
                it("can add new mesure", () => {
                    cy.visit("/mandataires");
                    cy.get("button.mesure_button").click();
                    cy.dateInput(".form-group #root_ouverture", "2019-06-22");

                    cy.get(".form-group #root_type").select("Sauvegarde de justice");
                    cy.get(".form-group #root_residence").select("A domicile");
                    cy.get(".form-group #root_codePostal").type("93200");
                    cy.get(".form-group #root_commune").type("Saint-Denis");
                    cy.get(".form-group #root_civilite").select("F");
                    cy.get(".form-group #root_annee").type("1977");

                    cy.get("button[type='submit'].btn-success").click();

                    cy.get("div.alert-success").should("contain", "La mesure a été créée");

                    cy.get(".react-tabs div.container table tbody tr").should("have.length", 3);
                });
                it("should have new added mesure", () => {
                    cy.visit("/mandataires");
                    cy.get(".react-tabs div.container table tbody tr").should("have.length", 3);
                    cy
                        .get(".react-tabs div.container table tbody tr:last-child td:nth-child(3)")
                        .should("contain", "Sauvegarde de justice");
                    cy
                        .get(".react-tabs div.container table tbody tr:last-child td:nth-child(4)")
                        .should("contain", "F");
                    cy
                        .get(".react-tabs div.container table tbody tr:last-child td:nth-child(5)")
                        .should("contain", "1977");
                });
                it("counter should now show 3/3", () => {
                    cy.visit("/mandataires");
                    cy.get(".react-tabs .react-tabs__tab-list li p").should("contain", "3 / 3");
                    cy.get(".react-tabs div.container table tbody tr").should("have.length", 3);
                });
                it("can close mandat", () => {
                    cy.visit("/mandataires");
                    cy.get(".react-tabs div.container table tbody tr:nth-child(2) button.btn-dark").click();
                    cy.dateInput(".ReactModal__Content #root_extinction", "2019-07-22");
                    cy.get(".ReactModal__Content button.btn-success").click();
                    cy.get(".react-tabs .react-tabs__tab-list li p").should("contain", "2 / 3");
                    cy.get(".react-tabs div.container table tbody tr").should("have.length", 2);
                });
                it("counter should now show 2/3", () => {
                    cy.visit("/mandataires");
                    cy.get(".react-tabs .react-tabs__tab-list li p").should("contain", "2 / 3");
                    cy.get(".react-tabs div.container table tbody tr").should("have.length", 2);
                });
            });
        });
    });
});
