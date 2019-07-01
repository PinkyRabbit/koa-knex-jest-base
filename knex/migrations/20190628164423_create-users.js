require('dotenv').config({ path: '../../.env' });

const bcrypt = require('bcrypt');

exports.up = knex => knex.schema.createTable('users', (table) => {
  table.increments('id').primary();
  table.string('email');
  table.string('password');
  table.string('role');
  // table.enu('role', ['super_admin', 'admin', 'manager', 'user']).alter();
  table.string('createdAt');
  table.string('updatedAt');
  table.string('deletedAt');
})
  .then(() => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(process.env.SUPER_ADMIN_PASSWORD, salt);
    const superAdmin = {
      id: 1,
      email: process.env.SUPER_ADMIN_EMAIL,
      password: hash,
      role: 'super_admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return knex('users').insert(superAdmin);
  });

exports.down = knex => knex.schema
  .dropTableIfExists('users');
