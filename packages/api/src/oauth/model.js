const { Editors } = require("../models/Editors");
const { AuthorizationCodes } = require("../models/AuthorizationCodes");
const { AccessToken } = require("../models/AccessToken");

module.exports = {
  getClient: async function (clientId) {
    const editor = await Editors.query().findOne({
      id: clientId,
    });

    if (editor) {
      const client = {
        id: editor.id,
        clientSecret: editor.api_token,
        grants: ["authorization_code"],
        redirectUris: editor.redirect_uris || [],
      };
      return client;
    }
    return null;
  },
  saveToken: async (token, client, user) => {
    await AccessToken.query().insert({
      access_token: token.accessToken,
      expired_on: new Date(token.accessTokenExpiresAt).toISOString(),
      user_id: user.id,
      editor_id: client.id,
      editor_url: "",
      refresh_token: token.refreshToken,
      refresh_token_expires_on: new Date(
        token.refreshTokenExpiresAt
      ).toISOString(),
    });

    return { ...token, client, user };
  },
  getAccessToken: async (token) => {
    const accessTokenResult = await AccessToken.query().findOne({
      access_token: token,
    });

    return {
      accessToken: accessTokenResult.access_token,
      accessTokenExpiresAt: accessTokenResult.expired_on,
      refreshTokenExpiresAt: accessTokenResult.refresh_token_expires_on,
      refreshToken: accessTokenResult.refresh_token,
      user: { id: accessTokenResult.user_id },
      client: { id: accessTokenResult.editor_id },
    };
  },
  getRefreshToken: async (token) => {
    const accessToken = await AccessToken.query().findOne({
      refresh_token: token,
    });
    return accessToken;
  },
  revokeToken: async (token) => {
    try {
      await AccessToken.query().delete().where({
        access_token: token,
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  saveAuthorizationCode: async (code, client, user) => {
    const { authorizationCode, expiresAt, redirectUri } = code;
    await AuthorizationCodes.query().insert({
      code: authorizationCode,
      redirect_uri: redirectUri,
      client_id: client.id,
      user_id: user.id,
      expires_at: new Date(expiresAt).toISOString(),
    });
    return code;
  },
  getAuthorizationCode: async (authorizationCode) => {
    const data = await AuthorizationCodes.query().findOne({
      code: authorizationCode,
    });

    return {
      code: data.code,
      client: { id: data.client_id },
      user: { id: data.user_id },
      redirectUri: data.redirect_uri,
      expiresAt: data.expires_at,
    };
  },
  revokeAuthorizationCode: async (authorizationCode) => {
    await AuthorizationCodes.query()
      .delete()
      .where({ code: authorizationCode });
    return true;
  },
  verifyScope: () => true,
};
