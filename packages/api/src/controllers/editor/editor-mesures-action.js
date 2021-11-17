const editorLockMandataire = require("./editor-lock-mandataire");

module.exports = function editorMesuresAction(actionHandler) {
  return async (req, res) => {
    const [actionHandlerResult] = await Promise.all([
      actionHandler(req, res),
      editorLockMandataire(req, res),
    ]);
    return actionHandlerResult;
  };
};
