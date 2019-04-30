//

import { Script, runInContext } from "vm";
import NodeEnvironment from "jest-environment-node";
import { Global, Config } from "@jest/types";
import Knex from "knex";
const parseConnection = require("knex/lib/util/parse-connection");
const debug = require("debug")("jest-environment-knex");
const { uid } = require("rand-token");

//

class KnexEnvironment extends NodeEnvironment {
  destroyPromises: Promise<void>[] = [];

  global: Global.Global & { databaseName: string; knex: Knex };
  options: Knex.Config;

  constructor(config: Config.ProjectConfig) {
    super(config);
    debug("super(config)");

    //

    const global = (this.global = runInContext(
      "this",
      Object.assign(this.context, config.testEnvironmentOptions)
    ));
    global.databaseName = `emjpm_test_${uid(16).toLowerCase()}`;

    //

    this.options = config.testEnvironmentOptions;
  }

  lazyDestroy(knex: Knex) {
    this.destroyPromises.push(
      ((knex.destroy() as any) as Promise<void>).then(
        debug.bind(null, "knex.destroyed"),
        console.error
      )
    );
  }

  async setup() {
    debug("setup");
    await super.setup();
    debug("super.setup()");

    //

    debug("new Knex");
    const knex = Knex(this.options);
    debug(`await knex.raw(CREATE DATABASE ${this.global.databaseName});`);
    await knex.raw(`CREATE DATABASE ${this.global.databaseName};`);
    debug("knex.destroy()");
    this.lazyDestroy(knex);

    //

    const connection: Object = typeof this.options.connection === 'string' ?
      parseConnection(this.options.connection) :
      this.options.connection;

    this.global.knex = Knex({
      ...this.options,
      connection: {
        ...connection,
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

    await Promise.all(this.destroyPromises);

    //

    debug("super.teardown()");
    await super.teardown();
    debug("teardown");
  }

  runScript(script: Script) {
    return super.runScript(script);
  }
}

module.exports = KnexEnvironment;
