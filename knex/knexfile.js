require('dotenv').config({ path: '../.env' });

const connection = {
  database: process.env.NODE_ENV !== 'test' ? process.env.DB : 'ifadtest',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  typeCast(field, next) {
    if (field.type === 'TINY' && field.length === 1) {
      const value = field.string();
      return value ? value === '1' : null;
    }
    return next();
  },
};

const shouldLog = process.env.USE_KNEX_DEBUG && JSON.parse(process.env.USE_KNEX_DEBUG) || false;

const pool = process.env.NODE_ENV === 'test'
  ? {
    min: 1,
    max: 1,
  }
  : {
    min: 2,
    max: 10,
  };

const config = {
  client: 'mysql',
  useNullAsDefault: true,
  debug: shouldLog,
  connection,
  pool,
}

module.exports = config;
