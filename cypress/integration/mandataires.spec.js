require("./utils");

describe("Mandataires", function() {
  describe("Session mandataire", () => {
    before(function() {
      cy.loginByForm("jeremy", "johnson123");
    });

    beforeEach(function() {
      Cypress.Cookies.preserveOnce("connect.sid");
    });

    context("session mandataire individuel", () => {
      describe("/mandataires", () => {
        it("table should show 2 mesures", () => {
          cy.visit("/mandataires");
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
          // cy.get(".form-group #root_residence").select("A domicile");
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
    context("session mandataire individuel Information", () => {
      describe("/mandataires information", () => {
        it("information should show a nom and prenom", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-nom-prenom]").contains("Adrien");
        });
        it("information should show a email", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-email]").contains("ud@ud.com");
        });
        it("information should show a telehone", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-telephone]").contains("0237100000");
        });
        it("information should show a telephone portable", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-telephone-portable]").contains("0101010101");
        });
        it("information should show a adress", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-adresse]").contains("21 rue de houx");
        });
        it("information should show a code Postal", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-code-postal]").contains("62000");
        });
        it("information should show a Ville", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-ville]").contains("Arras");
        });
        it("information should show a dispo Max", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-dispo-max]").contains("3");
        });
        it("information should show a secretariat", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-secretariat]").contains("Non -");
        });
      });
      describe("/mandataires Update information", () => {
        //ToDo: La confirmation ne marche pas...
        // Errors
        // .prenom should be string
        // .secretariat should be boolean
        // .nb_secretariat should be number

        it("information should show a nom and prenom", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-button-modifier]").click();
          cy.get(".form-group #root_nom").clear();
          cy.get(".form-group #root_nom").type("UDA");
          cy.get("button[type='submit'].btn-success").click();
          cy.get("[data-cy=fiche-manda-nom-prenom]").contains("UDA");
        });
        it("information should show a email", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-button-modifier]").click();
          cy.get(".form-group #root_email").clear();
          cy.get(".form-group #root_email").type("u@u.com");
          cy.get("button[type='submit'].btn-success").click();
          cy.get("[data-cy=fiche-manda-email]").contains("u@u.com");
        });
        it("information should show a telehone", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-button-modifier]").click();
          cy.get(".form-group #root_telephone").clear();
          cy.get(".form-group #root_telephone").type("0237100009");
          cy.get("button[type='submit'].btn-success").click();
          cy.get("[data-cy=fiche-manda-telephone]").contains("0237100009");
        });
        it("information should show a telephone portable", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-button-modifier]").click();
          cy.get(".form-group #root_telephone_portable").clear();
          cy.get(".form-group #root_telephone_portable").type("0101010108");
          cy.get("button[type='submit'].btn-success").click();
          cy.get("[data-cy=fiche-manda-telephone-portable]").contains("0101010108");
        });
        it("information should show a adress", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-button-modifier]").click();
          cy.get(".form-group #root_adresse").clear();
          cy.get(".form-group #root_adresse").type("21 rue de oui");
          cy.get("button[type='submit'].btn-success").click();
          cy.get("[data-cy=fiche-manda-adresse]").contains("21 rue de oui");
        });
        it("information should show a code Postal", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-button-modifier]").click();
          cy.get(".form-group #root_code_postal").clear();
          cy.get(".form-group #root_code_postal").type("62009");
          cy.get("button[type='submit'].btn-success").click();
          cy.get("[data-cy=fiche-manda-code-postal]").contains("62009");
        });
        it("information should show a Ville", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-button-modifier]").click();
          cy.get(".form-group #root_ville").clear();
          cy.get(".form-group #root_ville").type("Avesnes");
          cy.get("button[type='submit'].btn-success").click();
          cy.get("[data-cy=fiche-manda-ville]").contains("Avesnes");
        });
        it("information should show a dispo Max", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-button-modifier]").click();
          cy.get(".form-group #root_dispo_max").clear();
          cy.get(".form-group #root_dispo_max").type("10");
          cy.get("button[type='submit'].btn-success").click();
          cy.get("[data-cy=fiche-manda-dispo-max]").contains("10");
        });
        it("information should show a secretariat", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-information]").click();
          cy.get("[data-cy=fiche-manda-button-modifier]").click();
          cy.get(".form-group #root_secretariat").select("Oui");
          cy.get("button[type='submit'].btn-success").click();
          cy.get("[data-cy=fiche-manda-secretariat]").contains("Oui");
        });
      });
    });
    context("session mandataire individuel Mesure Eteinte", () => {
      describe("/mandataires Mesure Eteinte", () => {
        it("table should have 1 mesure", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-eteinte]").click();
          cy.get(".react-tabs div.container table tbody tr").should("have.length", 1);
        });
        it("table should have 0 mesure", () => {
          cy.visit("/mandataires");
          cy.get("[data-cy=tab-manda-eteinte]").click();
          cy.get("[data-cy=tab-manda-reactiver]").click();
          cy.get(".react-tabs div.container table tbody tr").should("have.length", 0);
        });
      });
    });
  });
});
