const { Soit, Quand, Alors } = require("./_fr");
const { I } = inject();

Soit("un navigateur web sur le site", () => {
  I.amOnPage("/");
});

Quand("je clique sur {string}", (text) => {
  I.click(text);
});

Quand("je tape {string} dans le champ {string}", (text, input) => {
  I.fillField(input, text);
});

Alors("je vois {string}", (text) => {
  I.see(text, "#__next");
});

Alors("je suis redirigé vers la page: {string}", (url) => {
  I.waitInUrl(url, 10);
});
