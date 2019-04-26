const NodeEnvironment = require("jest-environment-node");
const debug = require("debug")("jest-environment-knex");
const Knex = require("knex");
const { uid } = require("rand-token");

class KnexEnvironment extends NodeEnvironment {
  constructor(config) {
    debug("constructor");
    super(config);
    debug("super(config)");
    this.options = config.testEnvironmentOptions;
    this.destroyPromises = [];
  }

  lazyDestroy(knex) {
    this.destroyPromises.push(
      knex.destroy().then(debug.bind(null, "knex.destroyed"), console.error)
    );
  }

  async setup() {
    debug("setup");
    await super.setup();
    debug("super.setup()");

    this.global.databaseName = `emjpm_test_${uid(16).toLowerCase()}`;

    //

    debug("new Knex");
    const knex = Knex(this.options);
    debug(`await knex.raw(CREATE DATABASE ${this.global.databaseName});`);
    await knex.raw(`CREATE DATABASE ${this.global.databaseName};`);
    debug("knex.destroy()");
    this.lazyDestroy(knex);

    //

    this.global.knex = Knex({
      ...this.options,
      connection: {
        ...this.options.connection,
        database: this.global.databaseName
      }
    });
    debug("setup");
  }

  async teardown() {
    debug("teardown");
    this.lazyDestroy(this.global.knex);

    //

    debug("new Knex");
    const knex = Knex(this.options);
    debug(`await knex.raw(DROP DATABASE ${this.global.databaseName});`);
    await knex.raw(`DROP DATABASE ${this.global.databaseName};`);
    debug("knex.destroy()");
    this.lazyDestroy(knex);

    //

    await Promise.all(this.destroyPromises)

    //

    debug("super.teardown()");
    await super.teardown();
    debug("teardown");
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = KnexEnvironment;
