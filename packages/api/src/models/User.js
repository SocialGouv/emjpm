const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Model } = require("objection");

const { jwtConfig } = require("~/config");

const Models = require(".");

const MAIN_ROLES = [
  "admin",
  "service",
  "individuel",
  "prepose",
  "direction",
  "ti",
  "greffier",
];

const redirs = {
  admin: "/admin",
  default: "/",
  direction: "/direction",
  greffier: "/greffiers",
  individuel: "/mandataires",
  prepose: "/mandataires",
  service: "/services",
  ti: "/magistrats",
};

const TokenExpiration = {
  Access: 24 * 60 * 60,
  Refresh: 14 * 24 * 60 * 60,
  RefreshIfLessThan: 24 * 60 * 60,
};

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      direction: {
        join: {
          from: "users.id",
          to: "direction.user_id",
        },
        modelClass: Models.Direction,
        relation: Model.BelongsToOneRelation,
      },
      mandataire: {
        join: {
          from: "users.id",
          to: "mandataires.user_id",
        },
        modelClass: Models.Mandataire,
        relation: Model.BelongsToOneRelation,
      },
      roles: {
        join: {
          from: "users.id",
          through: {
            from: "user_role.user_id",
            to: "user_role.role_id",
          },
          to: "role.id",
        },
        modelClass: Models.Role,
        relation: Model.ManyToManyRelation,
      },
      service: {
        join: {
          from: "users.id",
          through: {
            from: "service_members.user_id",
            to: "service_members.service_id",
          },
          to: "services.id",
        },
        modelClass: Models.Service,
        relation: Model.HasOneThroughRelation,
      },
    };
  }

  getRoles() {
    return this.roles.map((el) => el.name).concat("user");
  }

  getDefaultRole() {
    const defaultRoleName = (
      this.roles.find((role) => MAIN_ROLES.includes(role.name)) || {}
    ).name;
    if (!defaultRoleName) {
      throw new Error(
        "No default role found in the list : " + JSON.stringify(this.roles)
      );
    }
    return defaultRoleName;
  }

  async getUser() {
    const token = await this.getJwt();
    const refreshToken = await this.getRereshToken();
    return {
      email: this.email,
      id: this.id,
      refreshToken,
      roles: this.getRoles(),
      token: token,
      type: this.type,

      // TODO: remove when full graphql auth
      url: redirs[this.type] || redirs.default,
    };
  }

  getService() {
    return this.service ? this.service.id : null;
  }

  getMandataire() {
    return this.mandataire ? this.mandataire.id : null;
  }

  async getDirectionAgrements() {
    if (!this.direction) {
      return [];
    }
    const { region_id, departement_code } = this.direction;
    const departements = await Models.Departement.query()
      .where({ id_region: region_id })
      .orWhere({ id: departement_code });
    return departements.map((d) => d.id);
  }

  async getHasuraClaims() {
    const role = this.getDefaultRole();
    const agrements = await this.getDirectionAgrements();
    return {
      "x-hasura-agrements": `{${agrements.join(",")}}`,
      "x-hasura-allowed-roles": this.getRoles(),
      "x-hasura-default-role": role,
      "x-hasura-mandataire-id": `${this.getMandataire()}`,
      "x-hasura-service-id": `${this.getService()}`,
      "x-hasura-user-id": `${this.id}`,
    };
  }

  async getJwt() {
    const signOptions = {
      algorithm: "RS256",
      expiresIn: TokenExpiration.Access,
      subject: this.id.toString(),
    };

    const hasuraClaims = await this.getHasuraClaims();
    const claim = {
      "https://hasura.io/jwt/claims": hasuraClaims,
      id: this.id,
      name: this.email,
      role: this.getDefaultRole(),
      url: redirs[this.type] || redirs.default,
    };

    return jwt.sign(claim, jwtConfig.key, signOptions);
  }

  async generateRefreshToken() {
    return jwt.sign({ id: this.id, name: this.email }, jwtConfig.key, {
      algorithm: "RS256",
      expiresIn: TokenExpiration.Refresh,
      subject: this.id.toString(),
    });
  }

  async getRereshToken() {
    const refreshTokenStillValid = await this.isRefreshTokenValid();
    const { isValid } = refreshTokenStillValid;
    if (isValid) {
      return this.refresh_token;
    }
    return this.generateRefreshToken();
  }

  async isRefreshTokenValid() {
    return jwt.verify(
      this.refresh_token,
      jwtConfig.key,
      {
        algorithms: ["RS256"],
      },
      function (err, decoded) {
        if (err) {
          return {
            expired: true,
            expiresSoon: false,
            isValid: false,
          };
        }

        const expiration = new Date(decoded.exp * 1000);
        const now = new Date();
        const secondsUntilExpiration =
          (expiration.getTime() - now.getTime()) / 1000;

        if (secondsUntilExpiration < TokenExpiration.RefreshIfLessThan) {
          return {
            expired: false,
            expiresSoon: true,
            isValid: true,
          };
        }

        return {
          expired: false,
          expiresSoon: false,
          isValid: true,
        };
      }
    );
  }

  async $beforeInsert() {
    const salt = bcrypt.genSaltSync();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async $beforeUpdate() {
    await super.$beforeInsert();
  }

  verifyPassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
  }

  static get jsonSchema() {
    return {
      properties: {
        cabinet: { type: "string" },
        email: { type: "string" },
        genre: { type: "string" },
        id: { type: "integer" },
        nom: { type: "string" },
        prenom: { type: "string" },
      },
      type: "object",
    };
  }
}

module.exports = User;
