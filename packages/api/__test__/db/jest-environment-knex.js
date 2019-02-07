const NodeEnvironment = require("jest-environment-node");
const Knex = require("knex");
const { uid } = require("rand-token");

class KnexEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.options = config.testEnvironmentOptions;
  }

  async setup() {
    await super.setup();
    this.global.databaseName = `emjpm_test_${uid(16).toLowerCase()}`;

    //

    const knex = Knex(this.options);
    await knex.raw(`CREATE DATABASE ${this.global.databaseName};`);
    await knex.destroy();

    //

    this.global.knex = Knex({
      ...this.options,
      connection: {
        ...this.options.connection,
        database: this.global.databaseName
      }
    });
  }

  async teardown() {
    await this.global.knex.destroy();

    //

    const knex = Knex(this.options);
    await knex.raw(`DROP DATABASE ${this.global.databaseName};`);
    await knex.destroy();

    //

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = KnexEnvironment;
