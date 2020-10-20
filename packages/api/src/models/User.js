const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Model } = require("objection");

const knexConnection = require("../db/knex");
const jwtConfig = require("../config/jwt");
const { Mandataire } = require("./Mandataire");
const { Departement } = require("./Departement");
const { Role } = require("./Role");
const { Tis } = require("./Tis");
const { Service } = require("./Service");
const { Direction } = require("./Direction");

Model.knex(knexConnection);

const MAIN_ROLES = [
  "admin",
  "service",
  "individuel",
  "prepose",
  "direction",
  "ti",
];

const redirs = {
  individuel: "/mandataires",
  prepose: "/mandataires",
  service: "/services",
  ti: "/magistrats",
  admin: "/admin",
  direction: "/direction",
  default: "/",
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
            to: "user_role.role_id",
          },
          to: "role.id",
        },
      },
      mandataire: {
        relation: Model.BelongsToOneRelation,
        modelClass: Mandataire,
        join: {
          from: "users.id",
          to: "mandataires.user_id",
        },
      },
      service: {
        relation: Model.HasOneThroughRelation,
        modelClass: Service,
        join: {
          from: "users.id",
          through: {
            from: "service_members.user_id",
            to: "service_members.service_id",
          },
          to: "services.id",
        },
      },
      direction: {
        relation: Model.BelongsToOneRelation,
        modelClass: Direction,
        join: {
          from: "users.id",
          to: "direction.user_id",
        },
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
    return {
      id: this.id,
      username: this.username,
      roles: this.getRoles(),
      token: token,
      // TODO: remove when full graphql auth
      url: redirs[this.type] || redirs.default,
      type: this.type,
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
    const { region_id, department_id } = this.direction;
    const departements = await Departement.query()
      .where({ id_region: region_id })
      .orWhere({ id: department_id });
    return departements.map((d) => d.id);
  }

  async getHasuraClaims() {
    const role = this.getDefaultRole();
    const agrements = await this.getDirectionAgrements();
    return {
      "x-hasura-allowed-roles": this.getRoles(),
      "x-hasura-default-role": role,
      "x-hasura-user-id": `${this.id}`,
      "x-hasura-mandataire-id": `${this.getMandataire()}`,
      "x-hasura-service-id": `${this.getService()}`,
      "x-hasura-agrements": `{${agrements.join(",")}}`,
    };
  }

  async getJwt() {
    const signOptions = {
      subject: this.id.toString(),
      expiresIn: "30d",
      algorithm: "RS256",
    };

    const hasuraClaims = await this.getHasuraClaims();
    const claim = {
      name: this.username,
      id: this.id,
      url: redirs[this.type] || redirs.default,
      role: this.getDefaultRole(),
      "https://hasura.io/jwt/claims": hasuraClaims,
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
        cabinet: { type: "string" },
      },
    };
  }
}

module.exports = { User };
