const Knex = require('knex');
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

module.exports = { connect, disconnect };
