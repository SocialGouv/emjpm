const { Editors } = require("../models/Editors");
const { AuthorizationCodes } = require("../models/AuthorizationCodes");
const { AccessToken } = require("../models/AccessToken");

module.exports = {
  getAccessToken: async (token) => {
    const accessTokenResult = await AccessToken.query().findOne({
      access_token: token,
    });

    if (!accessTokenResult) {
      return null;
    }

    return {
      accessToken: accessTokenResult.access_token,
      accessTokenExpiresAt: new Date(accessTokenResult.expired_on),
      client: { id: accessTokenResult.editor_id },
      refreshToken: accessTokenResult.refresh_token,
      refreshTokenExpiresAt: new Date(
        accessTokenResult.refresh_token_expires_on
      ),
      user: { id: accessTokenResult.user_id },
    };
  },
  getAuthorizationCode: async (authorizationCode) => {
    const data = await AuthorizationCodes.query().findOne({
      code: authorizationCode,
    });

    return {
      client: { id: data.client_id },
      code: data.code,
      expiresAt: new Date(data.expires_at),
      redirectUri: data.redirect_uri,
      user: { id: data.user_id },
    };
  },
  getClient: async function (clientId) {
    const editor = await Editors.query().findOne({
      id: clientId,
    });

    if (editor) {
      const client = {
        clientSecret: editor.api_token,
        grants: ["authorization_code"],
        id: editor.id,
        redirectUris: editor.redirect_uris || [],
      };
      return client;
    }
    return null;
  },
  getRefreshToken: async (token) => {
    const accessToken = await AccessToken.query().findOne({
      refresh_token: token,
    });
    if (!accessToken) {
      return null;
    }
    return accessToken;
  },
  revokeAuthorizationCode: async (authorizationCode) => {
    await AuthorizationCodes.query()
      .delete()
      .where({ code: authorizationCode });
    return true;
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
      client_id: client.id,
      code: authorizationCode,
      expires_at: new Date(expiresAt).toISOString(),
      redirect_uri: redirectUri,
      user_id: user.id,
    });
    return code;
  },
  saveToken: async (token, client, user) => {
    await AccessToken.query().delete().where({
      editor_id: client.id,
      user_id: user.id,
    });
    await AccessToken.query().insert({
      access_token: token.accessToken,
      editor_id: client.id,
      editor_url: "",
      expired_on: new Date(token.accessTokenExpiresAt).toISOString(),
      refresh_token: token.refreshToken,
      refresh_token_expires_on: new Date(
        token.refreshTokenExpiresAt
      ).toISOString(),
      user_id: user.id,
    });

    return { ...token, client, user };
  },
  verifyScope: () => true,
};
