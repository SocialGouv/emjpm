//

import { Config, Global } from '@jest/types';
import NodeEnvironment from 'jest-environment-node';
import { runInContext, Script } from 'vm';

import * as Debug from 'debug';
const debug = Debug('jest-environment-knex');
import Knex from 'knex';
import parseConnection from 'knex/lib/util/parse-connection';
import { uid } from 'rand-token';

//

class KnexEnvironment extends NodeEnvironment {
  public global: Global.Global & { databaseName: string; knex: Knex };
  private destroyPromises: Promise<void>[] = [];
  private options: Knex.Config;

  constructor(config: Config.ProjectConfig) {
    super(config);
    debug('super(config)');

    //

    const global = (this.global = runInContext('this', {
      ...this.context,
      ...config.testEnvironmentOptions,
    }));
    global.databaseName = `emjpm_test_${uid(16).toLowerCase()}`;

    //

    this.options = config.testEnvironmentOptions;
  }

  public async setup() {
    debug('setup');
    await super.setup();
    debug('super.setup()');

    //

    debug('new Knex');
    const knex = Knex(this.options);
    debug(`await knex.raw(CREATE DATABASE ${this.global.databaseName});`);
    await knex.raw(`CREATE DATABASE ${this.global.databaseName};`);
    debug('knex.destroy()');
    this.lazyDestroy(knex);

    //

    const connection: {} =
      typeof this.options.connection === 'string'
        ? parseConnection(this.options.connection)
        : this.options.connection;

    this.global.knex = Knex({
      ...this.options,
      connection: {
        ...connection,
        database: this.global.databaseName,
      },
    });
    debug('setup');
  }
  public async teardown() {
    debug('teardown');
    this.lazyDestroy(this.global.knex);

    //

    debug('new Knex');
    const knex = Knex(this.options);
    debug(`await knex.raw(DROP DATABASE ${this.global.databaseName});`);
    await knex.raw(`DROP DATABASE ${this.global.databaseName};`);
    debug('knex.destroy()');
    this.lazyDestroy(knex);

    //

    await Promise.all(this.destroyPromises);

    //

    debug('super.teardown()');
    await super.teardown();
    debug('teardown');
  }

  public runScript(script: Script) {
    return super.runScript(script);
  }

  private lazyDestroy(knex: Knex) {
    this.destroyPromises.push(
      ((knex.destroy() as any) as Promise<void>).then(
        debug.bind(null, 'knex.destroyed'),
        /* tslint:disable:no-console */
        console.error,
      ),
    );
  }
}

module.exports = KnexEnvironment;
