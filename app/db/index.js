const Knex = require('knex');
const knexCleaner = require('knex-cleaner');
const { Model } = require('objection');

const logger = require('../lib/logger');
const knexConfig = require('../../knex/knexfile');

let knex;

const init = async () => {
  knex = await Knex(knexConfig);
  Model.knex(knex);

  return testConnection(knex);
};

const testConnection = async () => {
  await knex.select().from('knex_migrations')
    .catch(() => {
      throw new Error('Error establishing a database connection');
    });
};

const disconnect = async () => {
  await knex.destroy();
};

const clean = async () => {
  await init();
  if (process.env.NODE_ENV !== 'production') {
    await knexCleaner.clean(knex);
  }
};

module.exports = { init, disconnect, clean };
