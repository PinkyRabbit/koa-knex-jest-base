require('dotenv').config();

const app = require('./app');
const knex = require('./app/db');
const logger = require('./app/lib/logger');

const PORT = process.env.PORT || 3000;

const liftUp = async () => {
  await knex.connect();
  logger.info('Connection has been established successfully.');
  await app.listen(PORT);
  logger.fatal(`The app has been started on ${PORT} port.`);
};

const letDown = async () => {
  await knex.disconnect();
  await app.callback();
};

if (process.env.NODE_ENV !== 'test') {
  try {
    liftUp();
  } catch (error) {
    logger.fatal(error);
  }
}

module.exports = { app, liftUp, letDown };
