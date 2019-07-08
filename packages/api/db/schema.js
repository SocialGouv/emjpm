const knexConnection = require("./knex");
const { Model } = require("objection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const redirs = {
  individuel: "/mandataires",
  prepose: "/mandataires",
  service: "/services",
  ti: "/tis",
  admin: "/admin",
  default: "/"
};

Model.knex(knexConnection);

class Role extends Model {
  static get tableName() {
    return "role";
  }

  static get idColumn() {
    return "id";
  }
}

class Tis extends Model {
  static get tableName() {
    return "tis";
  }

  static get idColumn() {
    return "id";
  }
}

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
      tis: {
        relation: Model.ManyToManyRelation,
        modelClass: UserTi,
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

  getHasuraClaims() {
    return {
      "x-hasura-allowed-roles": this.getRoles(),
      "x-hasura-default-role": "user",
      "x-hasura-user-id": `${this.id}`
      // 'x-hasura-org-id': '123',
      // 'x-hasura-custom': 'custom-value'
    };
  }

  getJwt() {
    const signOptions = {
      subject: this.id.toString(),
      expiresIn: "30d", // 30 days validity
      algorithm: "RS256"
    };
    const claim = {
      name: this.username,
      id: this.id,
      // iat: Math.floor(Date.now() / 1000),
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
      required: ["username"],
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

class Mandataire extends Model {
  static get tableName() {
    return "mandataires";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],
      properties: {
        etablissement: { type: "string" },
        id: { type: "integer" },
        genre: {
          type: "string"
        },
        telephone: { type: "string" },
        telephone_portable: {
          type: "string"
        },
        adresse: { type: "string" },
        code_postal: { type: "string" },
        ville: { type: "string" },
        dispo_max: {
          type: "integer"
        },
        secretariat: {
          type: "boolean"
        },
        zip: {
          type: "string"
        }
      }
    };
  }
  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "mandataires.user_id",
          to: "users.id"
        }
      }
    };
  }
}

class Service extends Model {
  static get tableName() {
    return "services";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],
      properties: {
        id: { type: "integer" },
        etablissement: { type: "string" },
        telephone: { type: "string" },
        adresse: { type: "string" },
        code_postal: { type: "string" },
        ville: { type: "string" },
        dispo_max: {
          type: "integer"
        },
        zip: {
          type: "string"
        }
      }
    };
  }
}

class UserTi extends Model {
  static get tableName() {
    return "user_tis";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "ti_id"],
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        ti_id: { type: "integer" }
      }
    };
  }
}

module.exports = { User, Role, Mandataire, Service, UserTi, Tis };
