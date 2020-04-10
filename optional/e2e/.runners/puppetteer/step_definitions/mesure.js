const { I } = inject();

When("je sélectionne un mandataire individuel dans la liste", () => {
  I.click("individuel");
  pause()
});
