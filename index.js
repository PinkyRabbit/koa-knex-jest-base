require('dotenv').config();

const Promise = require('bluebird');

const app = require('./app');
const knex = require('./app/db');
const logger = require('./app/lib/logger');

global.Promise = Promise;

const PORT = process.env.PORT || 3000;

// Define start method
app.start = async () => {
  logger.info('Starting server ...');
  await knex.init();
  await Promise.fromCallback(done => app.listen(PORT, done));
  logger.info(`==> 🌎 Server running on port ${PORT}.`);
};

// Start app
if (require.main === module) {
  app.start();
}

module.exports = app;
