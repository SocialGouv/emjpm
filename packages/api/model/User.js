const knexConnection = require("../db/knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const { Model } = require("objection");

const { Role } = require("./Role");
const { Tis } = require("./Tis");
const { ServiceAntenne } = require("./ServiceAntenne");

Model.knex(knexConnection);

const MAIN_ROLES = [
  "admin",
  "service",
  "individuel",
  "prepose",
  "direction",
  "ti"
];

const redirs = {
  individuel: "/mandataires",
  prepose: "/mandataires",
  service: "/services",
  ti: "/magistrats",
  admin: "/admin",
  direction: "/direction/mandataires",
  default: "/"
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
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: "users.id",
          through: {
            from: "user_role.user_id",
            to: "user_role.role_id"
          },
          to: "role.id"
        }
      },
      antennes: {
        relation: Model.ManyToManyRelation,
        modelClass: ServiceAntenne,
        join: {
          from: "users.id",
          through: {
            from: "user_antenne.user_id",
            to: "user_antenne.antenne_id"
          },
          to: "service_antenne.id"
        }
      },
      tis: {
        relation: Model.ManyToManyRelation,
        modelClass: Tis,
        join: {
          from: "users.id",
          through: {
            from: "user_tis.user_id",
            to: "user_tis.ti_id"
          },
          to: "tis.id"
        }
      }
    };
  }

  getRoles() {
    return this.roles.map(el => el.name).concat("user");
  }

  getDefaultRole() {
    const defaultRoleName = (
      this.roles.find(role => MAIN_ROLES.includes(role.name)) || {}
    ).name;
    if (!defaultRoleName) {
      throw new Error(
        "No default role found in the list : " + JSON.stringify(this.roles)
      );
    }
    return defaultRoleName;
  }

  getUser() {
    return {
      id: this.id,
      username: this.username,
      roles: this.getRoles(),
      token: this.getJwt(),
      // TODO: remove when full graphql auth
      url: redirs[this.type] || redirs.default,
      type: this.type
    };
  }

  getAntennes() {
    return this.antennes.map(el => el.id);
  }

  getHasuraClaims() {
    return {
      "x-hasura-allowed-roles": this.getRoles(),
      "x-hasura-default-role": this.getDefaultRole(),
      "x-hasura-user-id": `${this.id}`,
      "x-hasura-service-id": `${this.service_id}`,
      "x-hasura-antenne-id": `${this.getAntennes()}`
    };
  }

  getJwt() {
    const signOptions = {
      subject: this.id.toString(),
      expiresIn: "30d",
      algorithm: "RS256"
    };
    const claim = {
      name: this.username,
      id: this.id,
      "https://hasura.io/jwt/claims": this.getHasuraClaims()
    };
    return jwt.sign(claim, jwtConfig.key, signOptions);
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
      type: "object",
      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 255 },
        nom: { type: "string" },
        prenom: { type: "string" },
        email: { type: "string" },
        cabinet: { type: "string" }
      }
    };
  }
}

module.exports = { User };
