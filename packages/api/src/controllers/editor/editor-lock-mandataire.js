const knex = require("~/db/knex");

module.exports = async function editorLockMandataire(req, res) {
  const { serviceOrMandataire, type } = req;
  const isService = type === "service";
  const { id } = serviceOrMandataire;
  const editorId = res.locals.oauth.token.client.id;
  if (isService) {
    await knex.raw(
      `UPDATE "services" SET "editor_id" = ?, "editor_locked_mesures" = TRUE WHERE id = ?`,
      [editorId, id]
    );
  } else {
    await knex.raw(
      `UPDATE "mandataires" SET "editor_id" = ?, "editor_locked_mesures" = TRUE WHERE id = ?`,
      [editorId, id]
    );
  }
};
