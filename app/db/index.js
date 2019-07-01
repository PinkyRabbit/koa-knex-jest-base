const Knex = require('knex');
const knexCleaner = require('knex-cleaner');
const { Model } = require('objection');

const knexConfig = require('../../knex/knexfile');

let knex;

const connect = async () => {
  knex = Knex(knexConfig);
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
  if (process.env.NODE_ENV !== 'production') {
    await knexCleaner.clean(knex);
  }
};

module.exports = { connect, disconnect, clean };
